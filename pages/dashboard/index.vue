<script lang="ts" setup>
import { defineVaDataTableColumns } from 'vuestic-ui'
import { generateUsers } from '~/utils'
import Table from '~/components/dashboard/Table.vue'
import DataSection from '@/components/dashboard/DataSection.vue'

const listUser = ref(generateUsers(5))
const columns = ref(
  defineVaDataTableColumns([
    { label: 'Email', key: 'email' },
    { label: 'IP', key: 'ip' },
    { label: 'Device', key: 'device' },
    { label: 'Login Time', key: 'time' },
  ]),
)
</script>

<template>
  <h1
    class="page-title text-[32px] md:text-5xl font-bold leading-9 md:leading-[56px] max-sm:mt-6 mb-6 md:mb-4"
  >
    Dashboard
  </h1>
  <section class="flex flex-col gap-4">
    <div class="flex flex-col sm:flex-row gap-4">
      <DataSection />
    </div>
    <div class="flex flex-col md:flex-row gap-4">
      <VaCard class="w-full">
        <VaCardTitle class="flex items-start justify-between">
          <h2 class="card-title text-secondary font-bold uppercase text-xl">
            List of Users Inactive in the Last 7 Days
          </h2>
          <VaButton preset="primary" size="small" to="/login_history"
            >View all</VaButton
          >
        </VaCardTitle>
        <VaCardContent>
          <Table
            class="w-full"
            sort-by="email"
            sorting-order="asc"
            :users="listUser"
            :columns="columns"
            :loading="false"
          />
        </VaCardContent>
      </VaCard>
    </div>
  </section>
</template>
