<template>
  <t-dialog :visible.sync="visible" width="600px" :before-close="handleClose">
    <div class="dialog-header pd-x-12 pd-y-12 width-full height-64 flex y-center x-center">
      <h2 class="dialog-header__title">테스크 추가</h2>
    </div>
    <div class="dialog-contents pd-x-12 pd-y-12 width-full text-center">
      <t-row class="form">
        <t-col cols="6">
          <label>테스크 이름</label>
        </t-col>
        <t-col cols="18">
          <div class="input">
            <input class="width-full" v-model="title" />
          </div>
        </t-col>
      </t-row>
    </div>
    <div class="dialog-footer">
      <t-row class="pd-x-12 pd-y-12">
        <t-col cols="12" class="pd-r-8">
          <t-button @click="handleClose">취소</t-button>
        </t-col>
        <t-col cols="12" class="pd-l-8">
          <t-button @click="handleAddTask">추가</t-button>
        </t-col>
      </t-row>
    </div>
  </t-dialog>
</template>

<script>
import { postTrelloTask } from '@/apis/api/trello'

export default {
  name: 'PagesComponentTrelloListAddTaskDialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      title: '',
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.resetData()
      }
    },
  },
  methods: {
    resetData() {
      this.title = ''
    },
    handleClose(reset) {
      this.$emit('handleClose', reset === true)
    },
    handleAddTask() {
      const defaultTask = {
        listId: this.list.id,
        title: this.title,
        status: '',
        deleteYN: 'N',
      }
      postTrelloTask(defaultTask)
        .then(() => {
          this.handleClose(true)
        })
        .catch(() => {
          alert('테스크 생성이 취소되었습니다.')
        })
    },
  },
}
</script>
