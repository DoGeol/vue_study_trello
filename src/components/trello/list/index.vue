<template>
  <t-row class="trello">
    <draggable :list="list" group="lists" ghost-class="trello-list__wrap__ghost">
      <t-col v-for="item in list" :key="item.id" class="trello-list__wrap" cols="24" lg="6" md="12" xs="24">
        <article class="trello-list">
          <t-row class="mg-b-16">
            <t-col cols="16">
              <slot name="header" :title="item.title" />
            </t-col>
            <t-col cols="8">
              <div class="flex x-end y-center">
                <t-button class="width-30" size="small" @click="handleAddList(item)">추가</t-button>
                <t-button class="width-30 mg-l-8" size="small" @click="handleRemoveList(item)">삭제</t-button>
              </div>
            </t-col>
          </t-row>
          <draggable :list="item.tasks" class="trello-list__tasks" ghost-class="trello-list__tasks-item__ghost" group="tasks" tag="ul" filter=".ignore-task">
            <template v-if="item.tasks.length > 0">
              <!-- item -->
              <slot name="tasks" :task="item.tasks" />
            </template>
            <template v-else>
              <li class="trello-list__tasks-item empty ignore-task">아이템을 생성해주세요.</li>
            </template>
          </draggable>
        </article>
      </t-col>
    </draggable>
  </t-row>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'TTrello',
  components: {
    draggable,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleAddList(item) {
      console.log('handleAddList ::: ', item)
    },
    handleRemoveList(item) {
      console.log('handleRemoveList ::: ', item)
    },
  },
}
</script>
