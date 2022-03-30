<template>
  <el-container class="group-capsule">
    <el-input
      class="search-input"
      placeholder="Search"
      size="large"
      v-model="searchStr">
      <template #suffix>
        <el-icon class="el-input__icon" @click="search">
          <search />
        </el-icon>
      </template>
    </el-input>
  </el-container>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'GroupCapsule',
  setup() {
    const searchStr = ref('')

    const search = () => {
      console.log(searchStr.value)
    }

    return {
      searchStr,
      search
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.group-capsule {
  .search-input {
    ::v-deep(.el-input__inner) {
      border-radius: 8px;
      border-bottom: 2px solid $green;
    }
  }
}
</style>
