import Vue from 'vue'

Vue.filter('statusFilter', (status) => {
  let statusName = '-'
  switch (status) {
    case 'open':
      statusName = '열림'
      break
    case 'progress':
      statusName = '진행중'
      break
    case 'close':
      statusName = '닫힘'
      break
  }
  return statusName
})
