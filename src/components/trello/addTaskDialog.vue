<template>
  <t-dialog :visible.sync="visible" width="600px" :before-close="handleClose">
    <div class="dialog-header pd-x-12 pd-y-12 width-full height-64 flex y-center x-center">
      <h2 class="dialog-header__title">테스크 추가</h2>
    </div>
    <div class="dialog-contents pd-x-12 pd-y-12 width-full text-center">
      <t-row class="form">
        <t-row>
          <t-col cols="4" class="mg-t-4">
            <label>제목</label>
          </t-col>
          <t-col cols="20">
            <div class="input">
              <input class="width-full" v-model="form.title" />
            </div>
          </t-col>
        </t-row>
        <t-row class="mg-t-8">
          <t-col cols="4" class="mg-t-4">
            <label>내용</label>
          </t-col>
          <t-col cols="20">
            <div class="textarea">
              <textarea class="width-full" v-model="form.description" />
            </div>
          </t-col>
        </t-row>
      </t-row>
    </div>
    <div class="dialog-footer">
      <t-row class="pd-x-24 pd-y-12">
        <t-col cols="12" class="pd-r-8">
          <t-button class="white" @click="handleClose">취소</t-button>
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
  name: 'TTrelloAddTaskDialog',
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
      form: {
        listId: '',
        title: '',
        description: '',
        status: 'open',
      },
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
      this.form = {
        listId: '',
        title: '',
        description: '',
        status: 'open',
      }
    },
    handleClose(reset) {
      this.$emit('handleClose', reset === true)
    },
    handleAddTask() {
      this.form.listId = this.list.id
      postTrelloTask(this.form)
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
