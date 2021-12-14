<template>
  <section class="container">
    <t-row tagName="span">
      <t-col tagName="span" col="12"> 1234 </t-col>
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
