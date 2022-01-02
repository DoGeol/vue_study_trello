<template>
  <article class="trello-list">
    <slot name="header" />
    <t-draggable :list="taskList" class="trello-list__tasks" ghost-class="trello-list__tasks-item__ghost" group="tasks" tag="ul" filter=".ignore">
      <template v-if="taskList.length > 0">
        <!-- item -->
        <slot name="tasks" :task="taskList" />
      </template>
      <template v-else>
        <li class="trello-list__tasks-item empty ignore">테스크를 생성해주세요.</li>
      </template>
    </t-draggable>
  </article>
</template>

<script>
import TDraggable from '@/components/draggable'

export default {
  name: 'TTrelloList',
  components: { TDraggable },
  props: {
    taskList: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
