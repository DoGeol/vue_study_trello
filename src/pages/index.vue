<template>
  <section class="container">
    <t-header>
      <template v-slot:leftArea>
        <t-row>
          <t-col>
            <h1>PDG Trello</h1>
          </t-col>
        </t-row>
      </template>
      <template v-slot:rightArea>
        <t-row>
          <t-col>
            <t-button class="width-120 mg-l-auto"><span>리스트 추가</span></t-button>
          </t-col>
        </t-row>
      </template>
    </t-header>
    <t-row class="trello">
      <draggable :list="trelloLists" group="lists" ghost-class="trello-list__wrap__ghost">
        <t-col v-for="tList in trelloLists" :key="tList.id" class="trello-list__wrap" cols="24" lg="6" md="12" xs="24">
          <article class="trello-list">
            <t-row class="mg-b-16">
              <t-col cols="16">
                <h2 class="trello-list__title">{{ tList.title }}</h2>
              </t-col>
              <t-col cols="8">
                <t-button class="width-30 mg-l-auto" size="small">+</t-button>
              </t-col>
            </t-row>
            <draggable :list="tList.tasks" class="trello-list__tasks" ghost-class="trello-list__tasks-item__ghost" group="tasks" tag="ul">
              <template v-if="tList.tasks.length > 0">
                <li v-for="item in tList.tasks" :key="item.id" class="trello-list__tasks-item">
                  {{ item.id }}
                </li>
              </template>
              <template v-else>
                <li class="trello-list__tasks-item empty">아이템을 생성해주세요.</li>
              </template>
            </draggable>
          </article>
        </t-col>
      </draggable>
    </t-row>
  </section>
</template>

<script>
import draggable from 'vuedraggable'
import { getTrelloList } from '../apis/api/trello'

export default {
  name: 'MainContainer',
  components: {
    draggable,
  },
  data() {
    return {
      dragOptions: {
        animation: 10,
        group: '',
        disabled: '',
        ghostClass: 'trello-list__tasks-item__ghost',
      },
      trelloLists: [
        {
          id: 1,
          title: '트랠로 1',
          tasks: [
            {
              id: 1,
              title: 'task1',
              date: '1234.12.12',
              type: 'done',
            },
          ],
        },
        {
          title: '트랠로 2',
          tasks: [
            {
              id: 1,
              title: 'task1',
              date: '1234.12.12',
              type: 'done',
            },
            {
              id: 2,
              title: 'task1',
              date: '1234.12.12',
              type: 'done',
            },
            {
              id: 3,
              title: 'task1',
              date: '1234.12.12',
              type: 'done',
            },
            {
              id: 4,
              title: 'task1',
              date: '1234.12.12',
              type: 'done',
            },
          ],
        },
        {
          title: '트랠로 3',
          tasks: [
            {
              id: 1,
              title: 'task1',
              date: '1234.12.12',
              type: 'done',
            },
          ],
        },
        {
          title: '트랠로 4',
          tasks: [
            {
              id: 1,
              title: 'task1',
              date: '1234.12.12',
              type: 'done',
            },
          ],
        },
        {
          title: '트랠로 5',
          tasks: [
            {
              id: 1,
              title: 'task1',
              date: '1234.12.12',
              type: 'done',
            },
          ],
        },
      ],
    }
  },
  created() {
    console.log('main_container created')
    getTrelloList({ deleteYN: 'N' })
      .then((response) => {
        console.log('getTrelloList response :: ', response)
      })
      .catch((error) => {
        console.log('getTrelloList error :: ', error)
      })
  },
}
</script>
