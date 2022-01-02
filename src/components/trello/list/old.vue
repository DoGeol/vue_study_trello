<template>
  <t-row class="trello">
    <!-- TODO. draggable 기능만 하는 컴포넌트를 만들어서 wrapper로 사용   -->
    <draggable :list="list" group="lists" ghost-class="trello-list__wrap__ghost" filter=".button">
      <t-col v-for="item in list" :key="item.id" class="trello-list__wrap" cols="24" lg="6" md="12" xs="24">
        <article class="trello-list">
          <t-row class="mg-b-16">
            <t-col cols="16">
              <slot name="header-title" :title="item.title" />
            </t-col>
            <t-col cols="8">
              <div class="flex x-end y-center">
                <t-button size="small" @click="handleOpenAddTaskDialog(item)">Task 추가</t-button>
                <t-button class="mg-l-8" size="small" @click="handleRemoveList(item)">삭제</t-button>
              </div>
            </t-col>
          </t-row>
          <draggable :list="item.tasks" class="trello-list__tasks" ghost-class="trello-list__tasks-item__ghost" group="tasks" tag="ul" filter=".ignore">
            <template v-if="item.tasks.length > 0">
              <!-- item -->
              <slot name="tasks" :task="item.tasks" />
            </template>
            <template v-else>
              <li class="trello-list__tasks-item empty ignore">테스크를 생성해주세요.</li>
            </template>
          </draggable>
        </article>
      </t-col>
    </draggable>
    <t-trello-add-task-dialog :visible="addTaskDialog.visible" :list="addTaskDialog.list" @handleClose="handleCloseAddTaskDialog" />
  </t-row>
</template>

<script>
import draggable from 'vuedraggable'
import { deleteTrelloList } from '@/apis/api/trello'
import TTrelloAddTaskDialog from '@/components/trello/addTaskDialog'

export default {
  name: 'TTrello',
  components: {
    TTrelloAddTaskDialog,
    draggable,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      addTaskDialog: {
        visible: false,
        list: {},
      },
    }
  },
  methods: {
    handleOpenAddTaskDialog(list) {
      this.addTaskDialog.list = list
      this.addTaskDialog.visible = true
    },
    handleCloseAddTaskDialog(reset) {
      this.addTaskDialog.visible = false
      if (reset) {
        this.$emit('actionCallback')
      }
    },
    handleRemoveList(item) {
      console.log('handleRemoveList ::: ', item)
      if (confirm('정말 삭제하시겠습니까?')) {
        deleteTrelloList(item.id)
          .then(() => {
            alert('리스트 삭제가 완료되었습니다.')
            this.$emit('actionCallback')
          })
          .catch(() => {
            alert('리스트 삭제가 취소되었습니다.')
          })
      }
    },
  },
}
</script>
