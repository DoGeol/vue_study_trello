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
    <t-row class="trello">
      <t-draggable :list="trelloLists" group="lists" ghost-class="trello-list__wrap__ghost" filter=".button">
        <t-col v-for="list in trelloLists" :key="list.id" class="trello-list__wrap" cols="24" lg="6" md="12" xs="24">
          <t-trello-list :task-list="list.tasks">
            <template #header>
              <t-row class="mg-b-16">
                <t-col cols="16">
                  <h2 class="trello-list__title">{{ list.title }}</h2>
                </t-col>
                <t-col cols="8">
                  <div class="flex x-end y-center">
                    <t-button size="small" @click="handleOpenAddTaskDialog(list)">Task 추가</t-button>
                    <t-button class="mg-l-8" size="small" @click="handleRemoveList(list)">삭제</t-button>
                  </div>
                </t-col>
              </t-row>
            </template>
            <template #tasks="tasks">
              <template v-for="task in tasks.task">
                <t-trello-item-default :task="task" :key="task.id" @click="handleOpenTaskDetailDialog(task)" @handleDelete="getList" />
              </template>
            </template>
          </t-trello-list>
        </t-col>
      </t-draggable>
    </t-row>

    <t-trello-add-list-dialog :visible="addListDialog.visible" @handleClose="handleCloseAddListDialog"></t-trello-add-list-dialog>
    <t-trello-add-task-dialog :visible="addTaskDialog.visible" :list="addTaskDialog.list" @handleClose="handleCloseAddTaskDialog" />
    <t-trello-task-detail-dialog :visible="taskDetailDialog.visible" :task="taskDetailDialog.task" @handleClose="handleCloseTaskDetailDialog" />
  </section>
</template>
<script>
import { deleteTrelloList, getTrelloList } from '@/apis/api/trello'
import TTrelloAddListDialog from '@/components/trello/addListDialog'
import TTrelloAddTaskDialog from '@/components/trello/addTaskDialog'
import TTrelloTaskDetailDialog from '@/components/trello/taskDetailDialog'
import TTrelloList from '@/components/trello/list'
import TTrelloItemDefault from '@/components/trello/item'

export default {
  name: 'MainContainer',
  components: {
    TTrelloAddTaskDialog,
    TTrelloAddListDialog,
    TTrelloTaskDetailDialog,
    TTrelloList,
    TTrelloItemDefault,
  },
  data() {
    return {
      dragOptions: {
        animation: 10,
        group: '',
        disabled: '',
        ghostClass: 'trello-list__tasks-item__ghost',
      },
      trelloLists: [],
      addListDialog: {
        visible: false,
      },
      taskDetailDialog: {
        visible: false,
        task: {},
      },
      addTaskDialog: {
        visible: false,
        list: {},
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
      getTrelloList({})
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
    handleOpenAddTaskDialog(list) {
      this.addTaskDialog.list = list
      this.addTaskDialog.visible = true
    },
    handleCloseAddTaskDialog(reset) {
      this.addTaskDialog.visible = false
      if (reset) {
        this.getList()
      }
    },
    handleRemoveList(item) {
      console.log('handleRemoveList ::: ', item)
      if (confirm('정말 삭제하시겠습니까?')) {
        deleteTrelloList(item.id)
          .then(() => {
            alert('리스트 삭제가 완료되었습니다.')
            this.getList()
          })
          .catch(() => {
            alert('리스트 삭제가 취소되었습니다.')
          })
      }
    },
  },
}
</script>
