import TCol from '@/components/layout/t-col'

const modules_files = require.context('@/components', true, /\.vue$/)

const modules = modules_files.keys().reduce((modules, modulePath) => {
  console.log('??? :: ', modules, modulePath)
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modules_files(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

console.log(TCol)
console.log(modules)
// components.forEach((component) => {
//   Vue.component(component.name, component)
// })
