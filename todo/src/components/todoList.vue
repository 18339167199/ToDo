<template>
  <el-container
    class="todo"
    direction="vertical"
    :style="{
      background: theme.background
        ? theme.background
        : theme.image
    }"
  >
    <el-header class="todo-header">
      <el-row>
        <el-col class="todo-header-title" :span="12">
          <el-icon class="icon"><home-filled /></el-icon>
          <span>未命名标题</span>
        </el-col>
        <el-col class="todo-header-options" :span="12">
          <el-tooltip
            placement="left"
            effect="light"
            content="分享"
            raw-content
          >
            <el-button>
              <el-icon><share /></el-icon>
            </el-button>
          </el-tooltip>

          <el-popover
            popper-class="omit-popover"
            placement="bottom-end"
            width="360px"
            :show-arrow="false"
            trigger="click"
            @hide="closeSortMenu"
          >
            <template #reference>
              <el-button>
                <el-icon><more-filled /></el-icon>
              </el-button>
            </template>
            <template #default>
              <el-container class="omit-container" direction="vertical">
                <el-row class="sort" height="auto">
                  <el-menu
                    class="sort-menu"
                    ref="sortMenuRef"
                    backgroudn-color="transparent"
                  >
                    <el-sub-menu index="1">
                      <template #title>
                        <el-row style="width: 100%;">
                          <el-col class="omit-left" :span="20">
                            <el-icon class="omit-icon"><Sort /></el-icon>
                            <span>排序依据</span>
                          </el-col>
                          <el-col class="omit-right" :span="4" style="text-align: right;">
                            <el-icon><arrow-right /></el-icon>
                          </el-col>
                        </el-row>
                      </template>
                      <el-menu-item
                        v-for="(sort, index) in sortList"
                        :key="index"
                        :index="`1-${index}`"
                      >{{ sort.label }}</el-menu-item>
                    </el-sub-menu>
                  </el-menu>
                </el-row>
                <el-container direction="vertical" class="theme-picker">
                  <el-row style="margin-bottom: 5px;">主题</el-row>
                  <el-row class="theme-wrapper">
                    <el-col
                      :span="6"
                      v-for="(bg, index) in bgList"
                      :key="index"
                    >
                      <div
                        class="color-block"
                        @click="selectBg(bg)"
                        :style="{
                          'background': bg.background
                            ? bg.background
                            : bg.image
                        }"
                      ></div>
                    </el-col>
                  </el-row>
                </el-container>
              </el-container>
            </template>
          </el-popover>
          
        </el-col>
      </el-row>
    </el-header>
    <el-main class="todo-main">

      <!-- 未完成 -->
      <task-item
        v-for="(task, index) in unDoneTasks"
        :key="index"
        :data="task"
        @onStar="handleClickStar"
      ></task-item>

      <!-- 已完成 -->

      <el-row class="add-todo">
        <el-input
          class="add-todo-input"
          size="large"
          placeholder="添加任务"
          v-model="addTaskInput"
        >
          <template #prefix>
            <el-icon class="el-input__icon">
              <el-icon><plus /></el-icon>
            </el-icon>
          </template>
        </el-input>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, onMounted, computed, } from 'vue'
import { getTasksApi } from '../api/data'
import { SUCCESS_CODE } from '../config/requestCode'
import { BG, Sort, Task } from '../types/types'
import TaskItem from '../components/taskItem.vue'

enum sortEnum {
  Important,
  DueDate,
  MyDay,
  Letter,
  CreateDate
}

export default defineComponent({
  name: 'TodoList',
  props: {
    currentSelectedGroup: {
      type: Object,
      required: true
    }
  },
  components: {
    TaskItem
  },
  setup() {
    const bgList: BG[] = [
      {
        background: 'linear-gradient(-45deg, #788CDE, #6579C8)',
        image: ''
      }, {
        background: 'linear-gradient(-45deg, #A05FA1, #B978BA)',
        image: ''
      }, {
        background: 'linear-gradient(-45deg, #C44F6F, #E16989)',
        image: ''
      }, {
        background: 'linear-gradient(-45deg, #C5524D, #E26965)',
        image: ''
      }, {
        background: 'linear-gradient(-45deg, #2D8660, #489E77)',
        image: ''
      }, {
        background: 'linear-gradient(-45deg, #28837E, #449B95)',
        image: ''
      }, {
        background: 'linear-gradient(-45deg, #6A7883, #84929D)',
        image: ''
      }, {
        background: '#DFEDF9',
        image: ''
      }, {
        background: '#F2E7F9',
        image: ''
      }, {
        background: '#FFE4E9',
        image: ''
      }, {
        background: '#F9E8DE',
        image: ''
      }, {
        background: '#D5F1E5',
        image: ''
      }, {
        background: '#D4F1EF',
        image: ''
      }, {
        background: '#E7ECF0',
        image: ''
      }
    ]
    const sortList: Sort[] = [
      {
        label: '重要性',
        value: sortEnum.Important
      }, {
        label: '到期日期',
        value: sortEnum.DueDate
      }, {
        label: '以添加到"我的一天"',
        value: sortEnum.MyDay
      }, {
        label: '字母排序',
        value: sortEnum.Letter
      }, {
        label: '创建日期',
        value: sortEnum.CreateDate
      }
    ]

    const sortMenuRef: Ref = ref(null)
    let theme = ref<BG>(bgList[4])
    let tasks = ref<Task[]>([])
    let addTaskInput = ref<string>('')

    const closeSortMenu = () => {
      sortMenuRef.value.close('1')
    }
    const selectBg = (bg: BG) => {
      theme.value = bg
    }

    onMounted(() => {
      getTasksApi().then(resp => {
        if (resp && resp.status == SUCCESS_CODE) {
          tasks.value = resp.data
        }
      })
    })

    const handleClickStar = (task: Task) => {
      const id = task.id
      let operatorTask: Task | undefined = tasks.value.find(task => task.id === id)
      if (operatorTask) {
        operatorTask.star = !operatorTask.star
      }
     
    }

    let unDoneTasks = computed(() => {
      let list = tasks.value.filter(task => !task.done)
      list.sort((a: Task, b: Task): number => {
        if (!a.star && b.star) {
          return 1
        }
        return 0
      })
      console.log('computed unDoneTasks', list)
      return list
    })
    let doneTasks = computed(() => tasks.value.filter(task => task.done))

    return {
      bgList,
      sortList,
      theme,
      sortMenuRef,
      addTaskInput,
      tasks,
      unDoneTasks,
      doneTasks,
      handleClickStar,
      closeSortMenu,
      selectBg
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.omit-popover {
  $padding: 10px 5px;

  .omit-container {
    margin: -12px;
    font-size: 16px;
  }
  .sort {
    border-radius: $border-radius $border-radius 0 0;
    @include transition('background-color', $default-transition-duration);
    &:hover {
      background-color: $hover-color;
    }
    .omit-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .omit-icon {
        margin-right: 15px;
      }
    }
    .omit-right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    ::v-deep(.el-menu) {
      width: 100%;
      border-right: none;
      .el-sub-menu {
        position: relative;
        .el-sub-menu__title {
          height: 40px;
          line-height: 20px;
          padding: $padding !important;
          cursor: pointer;
          &:hover {
            background-color: $hover-color !important;
          }
          .el-sub-menu__icon-arrow { display: none; }
        }
        .el-menu.el-menu--inline {
          position: absolute;
          top: -1px;
          left: -4px;
          transform: translate(-100%, 0);
          width: 50%;
          border-radius: $border-radius;
          overflow: hidden;
          .el-menu-item {
            min-width: auto;
            height: 40px;
            line-height: 40px;
          }
        }
      }
    }
  }
  .theme-picker {
    padding: $padding;
    .theme-wrapper {
      .color-block {
        padding: calc(50% - 2px);
        margin: 2px;
        background-position: center;
        background-size: cover;
        cursor: pointer;
      }
    }
  }
}

.todo {
  padding: 2%;
  height: 100%;
  width: 100%;
  @include transition('backrground', 1s);

  &-header {
    padding: 0;
    font-size: 30px;
    color: #fff;

    &-title {
      text-align: left;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .icon {
        font-size: 35px;
        margin-right: 20px;
      }
    }

    &-options {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      $btn-size: 35px;
      ::v-deep(.el-button) {
        background-color: transparent;
        padding: 0;
        width: $btn-size;
        height: $btn-size;
        border: none;
        &:hover {
          background-color: rgba(255, 255, 255, .6);
        }
        .el-icon {
          color: #fff;
          font-size: 20px;
        }
      }
    }
  }

  &-main {
    padding: 0;
    position: relative;

    .add-todo {
      width: 100%;
      height: 40px;
      position: absolute;
      bottom: 20px;

      &-input {
        opacity: .8;
        ::v-deep(.el-input__inner) {
          padding-left: 45px;
        }
      }
    }
  }
}
</style>