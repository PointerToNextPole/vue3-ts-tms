<template>
  <div class="page-search">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick">
            <el-icon><Refresh /></el-icon>重置
          </el-button>
          <el-button type="primary" @click="handleQueryClick">
            <el-icon><Search /></el-icon>搜索
          </el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Search, Refresh } from '@element-plus/icons'
import HyForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    HyForm,
    Refresh,
    Search
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性由配置文件中的field来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    // 用户点击重置
    const handleResetClick = () => {
      /** 使用双向绑定的写法，注意这里是依次置空；而不是直接赋为formOriginData */
      /*
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
      }
      */
      /** 未使用双向绑定的写法 */
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped lang="less">
.header {
  color: red;
}

.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
