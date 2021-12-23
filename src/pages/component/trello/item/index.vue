<template>
  <li class="trello-list__tasks-item">
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
}
</script>
