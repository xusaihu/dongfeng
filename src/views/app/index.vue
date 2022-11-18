<template>
  <el-card
    v-loading="tableLoading"
    style="height: 100%"
    body-style="display: flex; flex-direction: column; height: 100%;box-sizing: border-box;"
  >
    <el-tabs v-model="activeApp">
      <el-tab-pane :label="item.name" :name="item.id" v-for="item in appList">
        <tab-content :id="item.id"></tab-content>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import TabContent from "./components/TabConntent.vue";

const activeApp = ref(1);
const appList = ref([
  {
    name: "机场-机场酒业",
    id: 1,
  },
]);
</script>
