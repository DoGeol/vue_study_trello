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
    <t-trello :list="trelloLists" @actionCallback="getList">
      <template #header-title="data">
        <h2 class="trello-list__title">{{ data.title }}</h2>
      </template>
      <template #tasks="tasks">
        <template v-for="task in tasks.task">
          <t-trello-item-default :task="task" :key="task.id" @click="handleOpenTaskDetailDialog(task)" />
        </template>
      </template>
    </t-trello>
    <pages-component-add-list-dialog :visible="addListDialog.visible" @handleClose="handleCloseAddListDialog"></pages-component-add-list-dialog>
    <pages-component-task-detail-dialog :visible="taskDetailDialog.visible" :task="taskDetailDialog.task" @handleClose="handleCloseTaskDetailDialog" />
  </section>
</template>
<script>
import { getTrelloList } from '@/apis/api/trello'
import PagesComponentAddListDialog from '@/pages/component/addListDialog'
import PagesComponentTaskDetailDialog from '@/pages/component/taskDetailDialog'
import TTrello from '@/pages/component/trello/list'
import TTrelloItemDefault from '@/pages/component/trello/item'

export default {
  name: 'MainContainer',
  components: { PagesComponentTaskDetailDialog, PagesComponentAddListDialog, TTrello, TTrelloItemDefault },
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
      taskDetailDialog: {
        visible: false,
        task: {},
      },
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getList()
    },
    getList() {
      getTrelloList({ deleteYN: 'N' })
        .then((response) => {
          this.trelloLists = [...response]
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
    handleOpenTaskDetailDialog(task) {
      this.taskDetailDialog.task = task
      this.taskDetailDialog.visible = true
    },
    handleCloseTaskDetailDialog(reset) {
      this.taskDetailDialog.visible = false
      if (reset) {
        this.getList()
      }
    },
  },
}
</script>
