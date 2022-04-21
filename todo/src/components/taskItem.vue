<template>
  <el-row class="task-item">

    <div class="check">
      <span class="circle">
        <el-icon><Select /></el-icon>
      </span>
    </div>

    <div class="content">
      {{ data.content }}
    </div>

    <div class="star">
      <el-icon class="star-filled" @click="onStar" v-if="data.star">
        <Star-Filled />
      </el-icon>
      <el-icon class="star-empty" @click="onStar" v-else>
        <Star />
      </el-icon>
    </div>

  </el-row>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'TaskItem',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const onStar = (): void => {
      emit('onStar', props.data)
    }

    return {
      onStar
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
$height: 40px;

.task-item {
  height: $height;
  margin-bottom: 2px;
  background: #fff;
  border-radius: $border-radius;

  .check {
    position: relative;
    height: 100%;
    width: 40px;
    text-align: center;
    line-height: $height;
    flex-grow: 0;
    
    .circle {
      position: absolute;
      display: block;
      width: 20px;
      height: 20px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      border: 2px solid #5E5F60;
      cursor: pointer;
      @include transition('background-color', $default-transition-duration);
      background: #fff;

      ::v-deep(.el-icon) {
        font-size: 14px;
        position: relative;
        top: 1px;
        opacity: 0;
        @include transition('opacity', $default-transition-duration);
      }

      &:hover {
        ::v-deep(.el-icon) {
          opacity: 1;
        }
      }

      &:active {
        background-color: #5E5F60;
        ::v-deep(.el-icon) {
          color: #fff;
          font-weight: bolder;
          opacity: 1;
        }
      }
    }
  }

  .content {
    flex-grow: 1;
    line-height: $height;
    text-align: left;
    padding: 0 2%;
    font-size: 14px;
  }

  .star {
    flex-grow: 0;
    width: 40px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    ::v-deep(.el-icon) {
      cursor: pointer;
    }
    .star-filled {
      font-size: 19px;
    }
  }
}
</style>
