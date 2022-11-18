<template>
  <el-card
    v-loading="tableLoading"
    style="height: 100%"
    body-style="display: flex; flex-direction: column; height: 100%;box-sizing: border-box;"
  >
    <div style="padding-bottom: 20px">
      <el-button type="primary" @click="openDialog">添加用户</el-button>
    </div>

    <el-table :data="proxyList" style="flex: 1">
      <el-table-column prop="id" label="ID" width="40px" />
      <el-table-column prop="nick_name" label="微信昵称" align="center" />
      <el-table-column
        prop="guid"
        label="微信实例ID"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column prop="phone" label="手机号" align="center" />
      <el-table-column prop="full_name" label="代理人" align="center" />
      <el-table-column
        prop="wechat_status_text"
        label="微信状态"
        align="center"
      />
      <el-table-column prop="status_text" label="状态" align="center" />
      <el-table-column
        prop="updated_at"
        width="80px"
        label="更新时间"
        align="center"
      />
      <el-table-column
        prop="created_at"
        width="80px"
        label="创建时间"
        align="center"
      />
      <el-table-column label="操作" align="right" fixed="right">
        <template #default="{ row }">
          <el-button
            type="text"
            v-if="row.status === 0"
            @click="updateStatus(1, row)"
            >启用</el-button
          >
          <el-button
            type="text"
            v-if="row.status === 1"
            @click="updateStatus(0, row)"
            >禁用</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-row justify="end" align="middle" style="margin-top: 8px">
      <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="totalPagination"
        :page-size="pageSize"
        @current-change="getUserList"
      />
    </el-row>
  </el-card>
  <add ref="DialogAddRef" @success="getUserList(page)"></add>
</template>

<script setup>
import add from "./components/add.vue";
import { customerList, customerUpdate } from "../../api/user";
import { ref, getCurrentInstance } from "vue";

// 表格
const page = ref(1);
const pageSize = ref(10);
const totalPagination = ref(0);
const proxyList = ref([]);
const tableLoading = ref(false);
function getUserList(page = 1) {
  tableLoading.value = true;
  customerList({ page, pageSize: pageSize.value })
    .then((res) => {
      const { data, total } = res.data;
      totalPagination.value = total;
      proxyList.value = data.map((item) => {
        const { status, wechat_status, nick_name } = item;
        return {
          ...item,
          nick_name: nick_name || "-",
          status_text: status ? "启用" : "禁用",
          wechat_status_text: wechat_status ? "在线" : "离线",
        };
      });
    })
    .finally(() => {
      tableLoading.value = false;
    });
}
getUserList();

// 新增
const DialogAddRef = ref();
function openDialog() {
  DialogAddRef.value.open();
}

const updateStatus = (status, data) => {
  const typeName = status ? "启用" : "禁用";
  ElMessageBox({
    title: `${typeName}用户`,
    message: `确定${typeName}用户？`,
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    beforeClose: (action, instance, done) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        customerUpdate({
          id: data.id,
          status,
        })
          .then((res) => {
            if (res.data.code === 0) {
              done();
            } else {
              ElMessage({
                type: "error",
                message: res.data.message,
              });
            }
          })
          .catch(() => {
            ElMessage({
              type: "error",
              message: "网络开小差了，请稍后重试",
            });
          })
          .finally(() => {
            instance.confirmButtonLoading = false;
          });
      } else {
        done();
      }
    },
  }).then(() => {
    getUserList();
    ElMessage({
      type: "success",
      message: `用户${typeName}成功！`,
    });
  });
};
</script>
