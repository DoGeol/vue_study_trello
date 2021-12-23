<template>
  <li class="trello-list__tasks-item" @click="handleClick">
    {{ task.title }}
  </li>
</template>

<script>
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
  },
}
</script>
