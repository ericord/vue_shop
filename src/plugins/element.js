import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
} from 'element-ui'

const elements = [Button, Form, FormItem, Input, Container, Header, Aside, Main]
elements.forEach((e) => Vue.use(e))
Vue.prototype.$message = Message
