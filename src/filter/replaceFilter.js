import Vue from 'vue'

Vue.filter('replaceStatusFilter', (status) => {
  let statusName = '-'
  switch (status) {
    case 'open':
      statusName = '열림'
      break
    case 'progress':
      statusName = '진행중'
      break
    case 'close':
      statusName = '완료'
      break
  }
  return statusName
})

Vue.filter('replaceBrFilter', (text) => {
  return text ? text.split('\n').join('<br/>') : '-'
})
