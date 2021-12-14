<template>
  <section class="container">
    <t-row>
      <t-col cols="12">
        <t-row :style="{ backgroundColor: 'red' }">
          <t-col cols="6" :style="{ backgroundColor: 'gray' }">
            <div>test1</div>
          </t-col>
          <t-col cols="6" :style="{ backgroundColor: 'blue' }">
            <div>test2</div>
          </t-col>
          <t-col cols="6" :style="{ backgroundColor: 'yellow' }">
            <div>test3</div>
          </t-col>
          <t-col cols="6" :style="{ backgroundColor: 'green' }">
            <div>test4</div>
          </t-col>
        </t-row>
      </t-col>
      <t-col cols="6">
        <div>test</div>
      </t-col>
      <t-col cols="4">
        <div>test</div>
      </t-col>
    </t-row>
  </section>
</template>

<script>
import { getTrelloList } from '../apis/api/trello'

export default {
  name: 'MainContainer',
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
