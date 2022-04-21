<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { request } from './utils/request'

export default defineComponent({
  name: 'App',
  setup() {
    request(
      'http://127.0.0.1:9000/HttpServletGroup/httpServlet01',
      'post',
      {
        name: 'Lee',
        age: 12
      }
    )
  }
})
</script>
