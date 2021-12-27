<template>
  <t-dialog :visible.sync="visible" width="400px" :before-close="handleClose">
    <div class="dialog-header pd-x-12 pd-y-12 width-full height-64 flex y-center x-center">
      <h2 class="dialog-header__title">리스트 추가</h2>
    </div>
    <div class="dialog-contents pd-x-12 pd-y-12 width-full text-center">
      <t-row class="form">
        <t-col cols="4" class="mg-t-4">
          <label>제목</label>
        </t-col>
        <t-col cols="20">
          <div class="input">
            <input class="width-full" v-model="title" />
          </div>
        </t-col>
      </t-row>
    </div>
    <div class="dialog-footer">
      <t-row class="pd-x-24 pd-y-12">
        <t-col cols="12" class="pd-r-8">
          <t-button class="white" @click="handleClose">취소</t-button>
        </t-col>
        <t-col cols="12" class="pd-l-8">
          <t-button @click="handleSave">저장</t-button>
        </t-col>
      </t-row>
    </div>
  </t-dialog>
</template>

<script>
import { postTrelloList } from '@/apis/api/trello'

export default {
  name: 'PagesComponentAddListDialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
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
    handleSave() {
      console.log('save')
      const defaultTrelloListItem = {
        title: this.title,
        deleteYN: 'N',
      }
      postTrelloList(defaultTrelloListItem)
        .then(() => {
          this.handleClose(true)
        })
        .catch((error) => {
          console.log('error ::: ', error)
        })
    },
  },
}
</script>
