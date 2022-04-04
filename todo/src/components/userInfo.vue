<template>
  <el-container class="user" :style="{ height: height }">
    <el-avatar
      class="avatar"
      :style="{ height: height, width: height }">
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
  props: {
    height: {
      type: String,
      default: '60px'
    }
  }
})
</script>

<style lang="scss" scoped>
.user {
  .avatar {
    padding: 10px;
    flex-grow: 0;
  }
  .info {
    text-align: left;
    padding-left: 15px;
    flex-grow: 1;
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
