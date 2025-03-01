<script setup lang="ts">
import type { DataTableColumnSource } from 'vuestic-ui'
import { type PropType, toRef } from 'vue'
import { useVModel } from '@vueuse/core'
import type { User } from '@/types'

export type Pagination = {
  page: number
  perPage: number
  total: number
}

export type Sorting = {
  sortBy: keyof User | undefined
  sortingOrder: 'asc' | 'desc' | null
}

const props = defineProps({
  users: {
    type: Array as PropType<User[]>,
    required: true,
  },
  columns: {
    type: Array as PropType<DataTableColumnSource<string>[]>,
    required: true,
  },
  loading: { type: Boolean, default: false },
  pagination: {
    type: Object as PropType<Pagination>,
    required: false,
    default: () => ({ page: 1, perPage: 10, total: 0 }),
  },
  sortBy: { type: String as PropType<Sorting['sortBy']>, required: true },
  sortingOrder: {
    type: String as PropType<Sorting['sortingOrder']>,
    default: null,
  },
})

const emit = defineEmits<{
  (event: 'update:sortBy', sortBy: Sorting['sortBy']): void
  (event: 'update:sortingOrder', sortingOrder: Sorting['sortingOrder']): void
}>()

const users = toRef(props, 'users')
const sortByVModel = useVModel(props, 'sortBy', emit)
const sortingOrderVModel = useVModel(props, 'sortingOrder', emit)

const formatDate = (date: string) => new Date(date).toLocaleString()
</script>

<template>
  <VaDataTable
    v-model:sort-by="sortByVModel"
    v-model:sorting-order="sortingOrderVModel"
    :columns="columns"
    :items="users"
    :loading="$props.loading"
  >
    <template #cell(email)="{ rowData }">
      <div class="flex items-center gap-2 max-w-[230px] ellipsis">
        {{ rowData.email }}
      </div>
    </template>

    <template #cell(ip)="{ rowData }">
      <div class="max-w-[120px] ellipsis">
        {{ rowData.ip }}
      </div>
    </template>

    <template #cell(device)="{ rowData }">
      <div class="ellipsis max-w-[230px]">
        {{ rowData.device }}
      </div>
    </template>

    <template #cell(time)="{ rowData }">
      <div class="ellipsis max-w-[230px]">
        {{ formatDate(rowData.time) }}
      </div>
    </template>
  </VaDataTable>
</template>

<style lang="css" scoped>
::v-deep(.va-data-table__table-tr) {
  border-bottom: 1px solid var(--va-background-border);
}

::v-deep(.va-data-table__table-th-wrapper) {
  font-weight: 500;
  font-size: 1rem;
  text-align: center;
}
</style>
