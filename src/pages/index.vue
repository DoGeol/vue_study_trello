<template>
  <section class="container">
    <t-row tagName="span">
      <t-col tagName="span" col="12" :style="{ backgroundColor: 'red' }">
        <t-row>
          <t-col tagName="span" col="18" :style="{ backgroundColor: 'red' }">1</t-col>
          <t-col tagName="span" col="6" :style="{ backgroundColor: 'red' }">1</t-col>
        </t-row>
        <t-row>
          <t-col tagName="span" col="4" :style="{ backgroundColor: 'blue' }">2</t-col>
          <t-col tagName="span" col="6" :style="{ backgroundColor: 'red' }">3</t-col>
          <t-col tagName="span" col="6" :style="{ backgroundColor: 'blue' }">4</t-col>
          <t-col tagName="span" col="4" :style="{ backgroundColor: 'red' }">5</t-col>
          <t-col tagName="span" col="4" :style="{ backgroundColor: 'blue' }">6</t-col>
        </t-row>
      </t-col>
      <t-col tagName="span" col="12" :style="{ backgroundColor: 'gray' }"> 1234 </t-col>
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
