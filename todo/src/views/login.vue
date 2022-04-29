<template>
  <el-container class="login" direction="vertical">
    <el-header class="login-header" height="auto">
      <h1>Welcome!</h1>
    </el-header>
    <el-main class="login-main">
      <div class="login-box" style="max-width: 400px;">
        <h2>Todo</h2>
        <el-row class="icon">
          <el-icon><Sugar /></el-icon>
        </el-row>
        <el-form
          :model="userInputs"
          :rules="rules"
        >

          <el-form-item
            class="form"
            v-for="(config, key) in formConfig"
            :key="key"
            :prop="key"
            size="large"
          >
            <el-input
              v-model="userInputs[key]"
              :maxlength="config.maxLength"
              :minLength="config.minLength"
              :type="config.type"
              :placeholder="config.placeholder"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-row style="justify-content: flex-end; width: 100%;">
              <el-button
                size="default"
                class="login-btn"
              >
                登录
              </el-button>
            </el-row>
          </el-form-item>

        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { login, getCredentials } from '../api/user'
import { defineComponent, ref, onMounted } from 'vue'
import { SUCCESS_CODE } from '../config/requestCode'

export default defineComponent({
  name: 'LoginView',
  setup() {
    const formConfig = ref({
      user: {
        maxLength: 20,
        minLength: 6,
        placeholder: 'email / phone',
        type: 'text',
      },
      pwd: {
        maxLength: 20,
        minLength: 6,
        placeholder: '请输入密码',
        type: 'password'
      },
    })
    const rules = {
      user: {
        required: true,
        message: '账号不能为空'
      },
      pwd: {
        required: true,
        message: '密码不能为空'
      },
    }
    const userInputs = ref({
      user: '',
      pwd: '',
      token: ''
    })

    onMounted(() => {
      getCredentials().then(resp => {
        // if (resp && resp.code == SUCCESS_CODE) {
          
        // }
      }, (err: Error) => {
        console.log(err)
      })
    })

    return {
      userInputs,
      formConfig,
      rules
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
$bgcolor: linear-gradient(-45deg, rgb(120, 140, 222), rgb(101, 121, 200));
$main-body-bg: #323542;
$text-color: #fff;

.login {
  height: 100%;
  background: $bgcolor;
  color: $text-color;

  &-header {
    font-size: 2.5rem;
    padding: 2rem 0;
    h1 { margin: 0; }
  }

  &-main {
    text-align: center;
    padding: 0 0 50px 0;

    .login-box {
      width: 50%;
      border-radius: $border-radius;
      background: $main-body-bg;
      height: 100%;
      margin: 0 auto;
      padding: 2rem;
      box-sizing: border-box;
      h2 {
        font-size: 1.5rem;
        margin-top: 0;
        margin-bottom: 1rem;
      }
      .icon {
        justify-content: center;
        font-size: 5rem;
        ::v-deep(.el-icon) {
          transform: rotate(45deg);
        }
      }
      .form {
        .login-btn {
          width: 100%;
          font-size: 1rem;
        }
      }
    }
  }
}
</style>