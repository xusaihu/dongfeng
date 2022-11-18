<template>
  <el-card
    style="height: 100%"
    body-style="display: flex; flex-direction: column; height: 100%;box-sizing: border-box;"
  >
    <el-tabs v-model="active">
      <el-tab-pane label="代理配置" name="1">
        <agent></agent>
      </el-tab-pane>
      <el-tab-pane label="公网ip设置" name="2">
        <ip></ip>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import agent from "./components/agent/index.vue";
import ip from "./components/ip.vue";

const active = ref("1");
</script>
