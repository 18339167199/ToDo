<template>
  <el-container class="home">
    <el-aside class="aside" width="350px">
      <user-info height="60px"></user-info>
      <group-capsule
        height="calc(100% - 60px)"
        :currentSelectedGroup="currentSelectedGroup"
        :change="changeGroup">
      </group-capsule>
    </el-aside>
    <el-main class="main">
      <todo-list :currentSelectedGroup="currentSelectedGroup"></todo-list>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import UserInfo from '../components/userInfo.vue'
import GroupCapsule from '../components/groupCapsule.vue'
import TodoList from '../components/todoList.vue'
import { defineComponent, ref } from 'vue'
import { Group } from '../types/types'

export default defineComponent({
  name: 'HomeView',
  components: {
    GroupCapsule,
    UserInfo,
    TodoList
  },
  setup() {
    let currentSelectedGroup = ref<Group>({
      id: -1,
      name: '',
      type: 0,
      icon: '',
      count: -1,
      folderId: -1
    })

    const changeGroup = (group: Group): void => {
      currentSelectedGroup.value = group
    }

    return {
      currentSelectedGroup,
      changeGroup
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
    padding: 0;
    overflow: hidden;
    border-radius: 10px 0 0 10px;
  }
}
</style>
