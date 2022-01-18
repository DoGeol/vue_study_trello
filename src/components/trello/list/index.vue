<template>
  <article class="trello-list" @contextmenu.prevent @click.right="handleOpenContextMenu">
    <slot name="header" />
    <t-draggable :list="taskList" class="trello-list__tasks" ghost-class="trello-list__tasks-item__ghost" group-name="tasks" tag="ul" filter-class=".ignore" :move-func="handleCheckMove">
      <template v-if="taskList.length > 0">
        <!-- item -->
        <slot name="tasks" :task="taskList" />
      </template>
      <li class="trello-list__tasks-item empty ignore">
        <slot name="empty_tasks">
          <div class="flex x-center y-center">테스크를 생성해주세요</div>
        </slot>
      </li>
    </t-draggable>

    <t-context-menu :visible="contextMenu.visible" :position="contextMenu.position" @handleClose="handleCloseContextMenu" @click.native="handleCloseContextMenu">
      <slot name="context-menu"></slot>
    </t-context-menu>
  </article>
</template>

<script>
export default {
  name: 'TTrelloList',
  props: {
    taskList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      contextMenu: {
        visible: false,
        position: {
          x: 0,
          y: 0,
        },
      },
    }
  },
  methods: {
    handleOpenContextMenu(e) {
      console.log(e)
      this.contextMenu.position.x = e.pageX
      this.contextMenu.position.y = e.pageY
      this.contextMenu.visible = true
    },
    handleCloseContextMenu() {
      this.contextMenu.visible = false
      this.contextMenu.position.x = 0
      this.contextMenu.position.y = 0
    },
    handleCheckMove(evt) {
      return !evt.related.classList.contains('ignore')
    },
  },
}
</script>
