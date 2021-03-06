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
            <t-button class="width-120 mg-l-auto" @click="handleOpenListDialog">리스트 추가</t-button>
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
                  <t-col cols="14">
                    <h2 class="trello-list__title">{{ list.title }}</h2>
                  </t-col>
                  <t-col cols="10">
                    <div class="flex x-end y-center">
                      <div class="width-50 mg-x-0">
                        <t-button size="small" @click="handleOpenListDialog('update', list)">수정</t-button>
                      </div>
                      <div class="width-50">
                        <t-button class="mg-l-8" size="small" @click="handleRemoveList(list)">삭제</t-button>
                      </div>
                    </div>
                  </t-col>
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
                  <li @click="handleOpenAddTaskDialog(list)">Task 추가</li>
                  <li @click="handleRemoveList(list)">리스트 삭제</li>
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
              <t-col class="height-110">
                <div class="flex x-center y-center height-full">
                  <span class="plus big width-70 height-70" @click="handleOpenListDialog" />
                </div>
              </t-col>
            </t-row>
          </article>
        </t-col>
      </template>
    </t-row>

    <t-trello-list-dialog :visible="listDialog.visible" :is-edit="listDialog.isEdit" :list="listDialog.list" @handleClose="handleCloseListDialog" />
    <t-trello-add-task-dialog :visible="addTaskDialog.visible" :list="addTaskDialog.list" @handleClose="handleCloseAddTaskDialog" />
    <t-trello-task-detail-dialog :visible="taskDetailDialog.visible" :task="taskDetailDialog.task" @handleClose="handleCloseTaskDetailDialog" />
  </section>
</template>
<script>
import { deleteTrelloList, getTrelloList } from '@/apis/api/trello'
import TTrelloListDialog from '@/components/trello/listDialog'
import TTrelloAddTaskDialog from '@/components/trello/addTaskDialog'
import TTrelloTaskDetailDialog from '@/components/trello/taskDetailDialog'
import TTrelloList from '@/components/trello/list'
import TTrelloItemDefault from '@/components/trello/item'

export default {
  name: 'MainContainer',
  components: {
    TTrelloAddTaskDialog,
    TTrelloListDialog,
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
      listDialog: {
        visible: false,
        isEdit: false,
        list: {},
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
    handleOpenListDialog(type = 'insert', list = {}) {
      if (type === 'update') {
        this.listDialog.isEdit = true
        this.listDialog.list = list
      }
      this.listDialog.visible = true
    },
    handleCloseListDialog(reset) {
      this.listDialog.visible = false
      this.listDialog.isEdit = false
      this.listDialog.list = {}
      if (reset) {
        this.getList()
      }
    },
    handleUpdateListDialog() {
      this.listDialog.visible = true
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
