<template>
  <el-card
    v-loading="tableLoading"
    style="height: 100%"
    body-style="display: flex; flex-direction: column; height: 100%;box-sizing: border-box;"
  >
    <div style="padding-bottom: 20px">
      <el-button type="primary" @click="openDialog">添加代理</el-button>
    </div>

    <el-table :data="proxyList" style="flex: 1">
      <el-table-column prop="id" label="ID" width="40px" />
      <el-table-column prop="full_name" label="名称" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="invite_code" label="邀请码" />
    </el-table>

    <el-row justify="end" align="middle" style="margin-top: 8px">
      <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="totalPagination"
        :page-size="pageSize"
        @current-change="getAgentList"
      />
    </el-row>
  </el-card>
  <add ref="DialogAddRef" @success="getAgentList(page)"></add>
</template>

<script setup>
import add from "./components/add.vue";
import { agentList } from "../../api/agent";
import { ref } from "vue";

// 表格
const page = ref(1);
const pageSize = ref(10);
const totalPagination = ref(0);
const proxyList = ref([]);
const tableLoading = ref(false);
function getAgentList(page = 1) {
  tableLoading.value = true;
  agentList({ page, pageSize: pageSize.value })
    .then((res) => {
      const { data, total } = res.data;
      totalPagination.value = total;
      proxyList.value = data;
    })
    .finally(() => {
      tableLoading.value = false;
    });
}
getAgentList();

// 新增
const DialogAddRef = ref();
function openDialog() {
  DialogAddRef.value.open();
}
</script>
