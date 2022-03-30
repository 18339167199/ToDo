<template>
  <el-container class="home">
    <el-aside class="aside" width="350px">
      <user-info />
      <group-capsule />
    </el-aside>
    <el-main class="main">

    </el-main>
  </el-container>
</template>

<script lang="ts">
import UserInfo from '../components/userInfo.vue'
import GroupCapsule from '../components/groupCapsule.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    GroupCapsule,
    UserInfo
  },
  props: {

  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.home {
  height: 100%;
  .aside {
    padding: 10px 20px;
  }
}
</style>
