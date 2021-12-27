<template>
  <t-dialog :visible.sync="visible" width="600px" :before-close="handleClose" class="task-detail-dialog">
    <div class="dialog-header pd-x-12 pd-y-12 width-full height-64 flex y-center x-center">
      <h2 v-if="!isEdit" class="dialog-header__title">{{ task.title }}</h2>
      <div v-else class="input width-400">
        <input class="width-full" v-model="form.title" />
      </div>
    </div>
    <div class="dialog-contents pd-x-48 pd-y-12 width-full text-center">
      <t-row class="form">
        <t-row class="form-item">
          <t-col cols="24" class="label text-left">
            <label>내용</label>
          </t-col>
          <t-col cols="24" class="mg-t-8 text-left">
            <div v-if="!isEdit" class="detail-info-area" v-html="$options.filters.replaceBrFilter(task.description)"></div>
            <div class="textarea" v-else>
              <textarea class="width-full height-100" v-model="form.description" />
            </div>
          </t-col>
        </t-row>
        <t-row class="form-item mg-t-8">
          <t-col cols="24" class="label text-left">
            <label>상태</label>
          </t-col>
          <t-col cols="24" class="mg-t-8 text-left">
            <div v-if="!isEdit" class="detail-info-area">{{ task.status | replaceStatusFilter }}</div>
            <select v-else class="select width-full" v-model="form.status">
              <option value="open">열림</option>
              <option value="progress">진행중</option>
              <option value="close">완료</option>
            </select>
          </t-col>
        </t-row>
      </t-row>
    </div>
    <div class="dialog-footer">
      <t-row class="pd-x-48 pd-y-12" v-if="!isEdit">
        <t-col cols="12" class="pd-r-8">
          <t-button class="white" @click="handleClose">취소</t-button>
        </t-col>
        <t-col cols="12" class="pd-l-8">
          <t-button @click="handleToggleIsEdit">수정</t-button>
        </t-col>
      </t-row>
      <t-row class="pd-x-48 pd-y-12" v-else>
        <t-col cols="12" class="pd-r-8">
          <t-button class="white" @click="handleToggleIsEdit(true)">취소</t-button>
        </t-col>
        <t-col cols="12" class="pd-l-8">
          <t-button @click="handleUpdateTask">저장</t-button>
        </t-col>
      </t-row>
    </div>
  </t-dialog>
</template>

<script>
import { putTrelloTask } from '@/apis/api/trello'

export default {
  name: 'PagesComponentTrelloListTaskDetailDialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    task: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isEdit: false,
      form: {
        title: '',
        description: '',
        status: '',
      },
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.resetData()
        this.init()
      }
    },
  },
  methods: {
    resetData() {
      this.title = ''
    },
    init() {
      this.form = this.$merge({}, this.task)
    },
    handleClose(reset) {
      this.$emit('handleClose', reset === true)
    },
    handleToggleIsEdit(isCancel) {
      if (isCancel) {
        this.form = this.$merge({}, this.task)
      }
      this.isEdit = !this.isEdit
    },
    handleUpdateTask() {
      console.log(this.form)
      console.log(this.task.id)
      putTrelloTask(this.task.id, this.form)
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
