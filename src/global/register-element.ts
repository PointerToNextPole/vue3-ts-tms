import { App } from 'vue'
import { DefineComponent } from '@vue/runtime-core'
import { ElButton } from 'element-plus'

const components: DefineComponent[] = [ElButton]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
