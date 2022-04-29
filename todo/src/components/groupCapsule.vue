<template>
  <el-container class="group-capsule" direction="vertical" :style="{ 'height': height }">
    <el-scrollbar class="scrollbar" height="100%">
      <el-row class="search-input">
        <el-input
          placeholder="Search"
          size="large"
          v-model="searchStr">
          <template #suffix>
            <el-icon class="el-input__icon" @click="search">
              <search />
            </el-icon>
          </template>
        </el-input>
      </el-row>
      
      <el-row class="groups">
        <!-- 固定分组 -->
        <el-col
          :span="24"
          :class="{ 'groups-item': true, 'active': group.id === currentSelectedGroup.id }"
          v-for="group in fixedGroups"
          :key="group.id"
          @click="change(group.id)">
          <el-icon class="icon"><apple /></el-icon>
          <span>{{ group.name }}</span>
          <span class="badge">{{ group.count }}</span>
        </el-col>

        <el-divider style="margin: 5px 15px;"></el-divider>

        <!-- 用户分组 -->
        <el-col
          :span="24"
          :class="{ 'groups-item': true, 'active': group.id === currentSelectedGroup.id }"
          v-for="group in customGroups"
          :key="group.id"
          @click="change(group.id)">
          <el-icon class="icon"><apple /></el-icon>
          <span>{{ group.name }}</span>
          <span class="badge">{{ group.count }}</span>
        </el-col>
      </el-row>

      <el-divider style="margin: 5px 15px;"></el-divider>

      <!-- 用户文件夹 -->
      <el-row class="folders">
        <el-menu
          background-color="transparent"
          v-for="(folder, name, index) in folds"
          :key="folder.id">
          <el-sub-menu :index="`${index++}`">
            <template #title>
              <el-icon><Menu /></el-icon>
              <span>{{ name }}</span>
            </template>
            <el-menu-item
              v-for="(group, ind) in folder"
              :key="group.id"
              :class="{ 'active': group.id === currentSelectedGroup.id }"
              :index="`${ind}`"
              @click="change(group.id)"
            >
              <el-icon class="icon"><apple /></el-icon>
              {{ group.name }}
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-row>
      
    </el-scrollbar>
  
    <el-row class="bottom-bar">
      <el-button class="addGroup-btn">
        <el-icon><plus /></el-icon>
        新建列表
      </el-button>
      <el-popover
        popper-class="btn-popper"
        placement="top-end"
        width="auto"
        trigger="hover"
        content="新建分组">
        <template #reference>
          <el-button class="addFolder-btn">
            <el-icon><edit /></el-icon>
          </el-button>
        </template>
      </el-popover>
    </el-row>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, computed } from 'vue'
import { getGroupsApi, getFolderApi } from '../api/data'
import { SUCCESS_CODE } from '../config/requestCode'
import { Group, Folder } from '../types/types'

export default defineComponent({
  name: 'GroupCapsule',
  props: {
    height: {
      type: String,
      default: '60px'
    },
    currentSelectedGroup: {
      type: Object,
      required: true
    },
    change: {
      type: Function,
      reuqired: true
    }
  },
  setup() {
    const searchStr = ref<string>('')
    const data = reactive<{
      groups: Group[],
      folders: Folder[]
    }>({
      groups: [],
      folders: []
    })

    // methods
    const search = (): void => {
      console.log(searchStr.value)
    }
    const getGroups = (): Promise<boolean> => new Promise<boolean>((resolve, reject) => {
      getGroupsApi().then(resp => {
        if (resp) {
          data.groups = (resp as any)
          resolve(true)
        } else {
          reject(new Error())
        }
      }, err => {
        reject(err)
      })
    })
    const getFolder = (): Promise<boolean> => new Promise<boolean>((resolve, reject) => {
      getFolderApi().then(resp => {
        if (resp) {
          data.folders = (resp as any)
          resolve(true)
        } else {
          reject(new Error(resp))
        }
      }, err => {
        reject(err)
      })
    })

    // computed
    let fixedGroups = computed((): Group[] => data.groups.filter((group: Group): boolean => group.type == 0))
    let customGroups = computed((): Group[] => data.groups.filter((group: Group): boolean => group.type == 1 && !group.folderId))
    let folds = computed(() => {
      let foldsGroups: any = {}
      data.folders.forEach((folder: Folder): void => {
        foldsGroups[folder.name] = data.groups.filter(group =>
          group.type == 1 && group.folderId === folder.id)
      })
      return foldsGroups
    })

    onMounted(() => {
      getFolder()
      getGroups()
    })

    return {
      searchStr,
      search,
      fixedGroups,
      customGroups,
      folds
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

@mixin basic-group-item {
  padding: 10px 5px 10px 10px !important;
  cursor: pointer;
  border-radius: $border-radius;
  &:hover {
    background-color: $hover-color !important;
  }
  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 40%;
    border-radius: 4px;
    background-color: #5D71BF;
    opacity: 0;
    @include transition('opacity', $default-transition-duration);
  }
  &.active {
    background-color: $hover-color;
    &:after { opacity: 1; }
  }
}

.group-capsule {
  position: relative;
  padding-top: 15px;
  .scrollbar {
    padding-right: 10px;
    ::v-deep(.el-scrollbar__bar.is-horizontal) {
      display: none !important;
    }
  }

  .search-input {
    padding: 0 10px;
    margin-bottom: 10px;
    ::v-deep(.el-input__inner) {
      border-radius: 8px;
      border-bottom: 2px solid $green;
    }
  }

  .groups {
    text-align: left;
    .groups-item {
      position: relative;
      @include basic-group-item();

      .icon {
        position: relative;
        top: 1px;
        margin-right: 15px;
      }

      .badge {
        position: absolute;
        text-align: right;
        width: 20px;
        height: 20px;
        padding: 0;
        text-align: center;
        line-height: 20px;
        border-radius: 50%;
        background-color: #DEDEDE;
        font-size: 12px;
        right: 15px;
        top: 50%;
        margin-top: -10px;
      }
    }
  }

  .folders {
    margin-bottom: 20vh;
    ::v-deep(.el-menu) {
      width: 100%;
      border-right: none;
      border-radius: $border-radius $border-radius 0 0;
      .el-sub-menu__title {
        height: 40px;
        @include basic-group-item();
      }
      .el-menu-item {
        height: 40px;
        line-height: 40px;
        @include basic-group-item();
        padding-left: 38px !important;
      }
    }
  }

  .bottom-bar {
    $btn-height: 45px;

    & {
      display: flex;
      justify-content: space-between;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      height: $btn-height;
      background-color: $background;
      padding-bottom: 5px;
    }

    .btn-popper{
      min-width: auto !important;
      text-align: center;
    }

    @mixin basic-btn {
      @include transition('background-color', $default-transition-duration);
      background-color: transparent;
      border: none;
      border-radius: 8px;
      &:hover {
        background-color: $hover-color;
      }
    }
    
    .addGroup-btn {
      flex-grow: 1;
      height: 100%;
      justify-content: flex-start;
      font-size: $text-font-size;
      @include basic-btn();
      ::v-deep(.el-icon) {
        margin-right: 20px;
      }
    }
    .addFolder-btn {
      flex-grow: 0;
      height: 100%;
      width: $btn-height;
      margin-left: 0;
      font-size: $text-font-size;
      @include basic-btn();
    }
  }
}
</style>
