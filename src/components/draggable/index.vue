<template>
  <draggable :list="list" :group="groupName" :ghost-class="ghostClass" :filter="filterClass" :tag="tag" :move="moveFunc">
    <slot />
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'TDraggable',
  components: {
    draggable,
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
    groupName: {
      type: String,
      default: 'draggable',
    },
    ghostClass: {
      type: String,
      default: '',
    },
    filterClass: {
      type: String,
      default: '',
    },
    tag: {
      type: String,
      default: '',
    },
    moveFunc: {
      type: Function,
      default: () => {},
    },
  },
}
</script>
