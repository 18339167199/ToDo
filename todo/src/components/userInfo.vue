<template>
  <el-container class="user" :style="{ height: `${height}px` }">
    <el-avatar
      class="avatar"
      :size="height">
      <avatar />
    </el-avatar>
    <el-row class="info">
      <el-col class="info-name" :span="24">
        <span>李茂斌</span>
      </el-col>
      <el-col class="info-email" :span="24">
        <span>18339167199@163.com</span>
      </el-col>
    </el-row>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserInfo',
  setup() {
    const height = 60
    return {
      height
    }
  }
})
</script>

<style lang="scss" scoped>
.user {
  margin-bottom: 15px;
  .avatar {
    padding: 10px;
  }
  .info {
    text-align: left;
    padding-left: 15px;
    &-name {
      flex-grow: 1;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      padding-bottom: 2px;
    }
    &-email {
      flex-grow: 1;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      padding-top: 2px;
    }
  }
}
</style>
