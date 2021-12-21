<template>
  <section class="container">
    <t-header>
      <template v-slot:leftArea>
        <t-row>
          <t-col>
            <h1>PDG Trello</h1>
          </t-col>
        </t-row>
      </template>
      <template v-slot:rightArea>
        <t-row>
          <t-col>
            <t-button class="width-120 mg-l-auto" @click="handleOpenAddListDialog">리스트 추가</t-button>
          </t-col>
        </t-row>
      </template>
    </t-header>
    <t-trello :list="trelloLists">
      <template #header="data">
        <h2 class="trello-list__title">{{ data.title }}</h2>
      </template>
      <template #tasks="tasks">
        <template v-for="task in tasks.task">
          <t-trello-item-default :task="task" :key="task.id" />
        </template>
      </template>
    </t-trello>
    <pages-component-add-list-dialog :visible="addListDialog.visible" @handleClose="handleCloseAddListDialog"></pages-component-add-list-dialog>
  </section>
</template>
<script>
import { getTrelloList } from '@/apis/api/trello'
import PagesComponentAddListDialog from '@/pages/component/addListDialog'

export default {
  name: 'MainContainer',
  components: { PagesComponentAddListDialog },
  data() {
    return {
      addListDialog: {
        visible: false,
      },
      dragOptions: {
        animation: 10,
        group: '',
        disabled: '',
        ghostClass: 'trello-list__tasks-item__ghost',
      },
      trelloLists: [],
    }
  },
  created() {
    console.log('main_container created')
    this.init()
  },
  methods: {
    init() {
      this.getList()
    },
    getList() {
      getTrelloList({ deleteYN: 'N' })
        .then((response) => {
          this.trelloLists = response
        })
        .catch((error) => {
          console.log('getTrelloList error :: ', error)
          this.trelloLists = []
        })
    },
    handleOpenAddListDialog() {
      this.addListDialog.visible = true
    },
    handleCloseAddListDialog(reset) {
      this.addListDialog.visible = false
      if (reset) {
        this.getList()
      }
    },
  },
}
</script>
