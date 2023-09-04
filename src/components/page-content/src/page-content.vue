<template>
  <div class="page-content">
    <hy-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- header中的插槽 -->
      <template #headerHandler>
        <el-button
          type="primary"
          size="medium"
          v-if="isCreate"
          @click="handleNewClick"
        >
          新建用户
        </el-button>
      </template>
      <!-- 表中的插槽 -->
      <template #status="scope">
        <el-button
          size="mini"
          plain
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handler-btns">
          <el-button
            size="mini"
            type="text"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
          >
            <el-icon><edit /></el-icon>编辑
          </el-button>
          <el-button
            size="mini"
            type="text"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
          >
            <el-icon><delete /></el-icon>删除
          </el-button>
        </div>
      </template>
      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import HyTable from '@/base-ui/table/'
import { Edit, Delete } from '@element-plus/icons'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'

export default defineComponent({
  components: {
    HyTable,
    Edit,
    Delete
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 获取操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 双向绑定pageInfo
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 10
    })
    watch(pageInfo, () => {
      console.log('watch')
    })

    // 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 从vuex中获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    // 获取其他的动态插槽名称
    const filteredArr = ['status', 'createAt', 'updateAt', 'handler']
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (filteredArr.includes(item.slotName)) return false
        return true
      }
    )

    // 删除操作
    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id,
        offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
        size: pageInfo.value.pageSize
      })
    }
    // 新增
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    // 编辑
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    return {
      dataList,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      getPageData,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
