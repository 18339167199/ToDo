import * as icons from '@element-plus/icons-vue'
import { App } from 'vue'

const registerIcon= (app: App<Element>): App<Element> => {
  let name: string
  for(name in icons) {
    app.component(name, (<any>icons)[name])
  }

  return app
}

export default registerIcon