<template>
  <li class="trello-list__tasks-item" @click="handleClick">
    <t-row>
      <t-col cols="21" class="height-24">
        <div class="flex x-start y-center height-full">
          <s v-if="task.status === 'close'">{{ task.title }}</s>
          <template v-else>{{ task.title }}</template>
        </div>
      </t-col>
      <t-col cols="3" class="height-24">
        <div class="flex x-center y-center height-full">
          <span class="ignore close" @click.stop="handleDeleteTask" />
        </div>
      </t-col>
    </t-row>
  </li>
</template>

<script>
import { deleteTrelloTask } from '@/apis/api/trello'

export default {
  name: 'TTrelloItemDefault',
  props: {
    task: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    handleClick() {
      this.$emit('click')
    },
    handleDeleteTask() {
      if (confirm('선택한 테스크를 삭제하시겠습니까?')) {
        deleteTrelloTask(this.task.id)
          .then(() => {
            alert('테스크 삭제 완료')
            this.$emit('handleDelete')
          })
          .catch(() => {
            alert('테스크 삭제 실패')
          })
      }
    },
  },
}
</script>
