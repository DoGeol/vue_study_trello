import Vue from 'vue'

const componentFiles = require.context('@/components', true, /\.vue$/)

const componentList = componentFiles.keys().reduce((components, path) => {
  const component = componentFiles(path)
  components.push(component.default)
  return components
}, [])

componentList.forEach((component) => {
  Vue.component(component.name, component)
})
