import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'

const elements = [Button, Form, FormItem, Input]
elements.forEach((e) => Vue.use(e))
Vue.prototype.$message = Message
