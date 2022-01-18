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
      <template v-if="trelloLists.length > 0">
        <t-draggable :list="trelloLists" group-name="lists" ghost-class="trello-list__wrap__ghost" filter-class=".button">
          <t-col v-for="list in trelloLists" :key="list.id" class="trello-list__wrap" cols="24" lg="6" md="12" xs="24">
            <t-trello-list :task-list="list.tasks">
              <template #header>
                <t-row class="mg-b-16">
                  <t-col>
                    <div class="flex x-between y-center">
                      <h2 class="trello-list__title">{{ list.title }}</h2>
                      <div class="flex x-end y-center">
                        <t-button size="small" @click="handleOpenAddTaskDialog(list)">Task 추가</t-button>
                        <t-button class="mg-l-8" size="small" @click="handleRemoveList(list)">삭제</t-button>
                      </div>
                    </div>
                  </t-col>
                  <t-col cols="8"> </t-col>
                </t-row>
              </template>
              <template #tasks="tasks">
                <template v-for="task in tasks.task">
                  <t-trello-item-default :task="task" :key="task.id" @click="handleOpenTaskDetailDialog(task)" @handleDelete="getList" />
                </template>
              </template>
              <template #empty_tasks>
                <div class="flex x-center y-center" @click="handleOpenAddTaskDialog(list)">
                  <span class="plus width-24 height-24" />
                </div>
              </template>
              <template #context-menu>
                <ul>
                  <li @click="handleContextOpenAddTaskDialog(list)">Task 추가</li>
                  <li @click="handleContextRemoveList(list)">리스트 삭제</li>
                </ul>
              </template>
            </t-trello-list>
          </t-col>
        </t-draggable>
      </template>
      <template v-else>
        <t-col class="trello-list__wrap" cols="24" lg="6" md="12" xs="24">
          <article class="trello-list">
            <t-row>
              <t-col class="height-300">
                <div class="flex x-center y-center height-full">
                  <span class="plus big width-100 height-100" @click="handleOpenAddListDialog" />
                </div>
              </t-col>
            </t-row>
          </article>
        </t-col>
      </template>
    </t-row>

    <t-trello-add-list-dialog :visible="addListDialog.visible" @handleClose="handleCloseAddListDialog" />
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
