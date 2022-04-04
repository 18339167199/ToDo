<template>
  <el-container class="home">
    <el-aside class="aside" width="350px">
      <user-info height="60px"></user-info>
      <group-capsule
        height="calc(100% - 60px)"
        :currentSelectedId="currentSelectedId"
        :change="changeId">
      </group-capsule>
    </el-aside>
    <el-main class="main" >

    </el-main>
  </el-container>
</template>

<script lang="ts">
import UserInfo from '../components/userInfo.vue'
import GroupCapsule from '../components/groupCapsule.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    GroupCapsule,
    UserInfo
  },
  setup() {
    let currentSelectedId = ref<number>(0)

    const changeId = (id: number): void => {
      currentSelectedId.value = id
    }

    return {
      currentSelectedId,
      changeId
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.home {
  height: 100%;
  .aside {
    padding: 10px 20px 0 20px;
  }
  .main {
    background: linear-gradient(-45deg, #788CDE, #6579C8);
    border-radius: 10px 0 0 10px;
  }
}
</style>
