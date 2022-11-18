<template>
  <el-form ref="formEl" label-width="80" :model="form" :rules="formRules">
    <el-form-item label="公网IP地址" prop="ip">
      <el-input
        style="width: 300px"
        v-model="form.ip"
        placeholder="请输入公网ip地址"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save(formEl)">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  ip: localStorage.getItem("baseUrl") || "http://zkg.mynatapp.cc",
});
const formRules = {
  ip: [
    {
      validator(rule, value, callback) {
        if (!value) {
          callback(new Error("请输入公网ip"));
        } else {
          if (
            /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/.test(value) ||
            /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(
              value
            )
          ) {
            callback();
          } else {
            callback("请输入正确ip");
          }
        }
      },
      trigger: "blur",
    },
  ],
};
const formEl = ref();
const save = (el) => {
  //   if()
  console.log(form.value.ip);
  el.validate((valid) => {
    if (valid) {
      localStorage.setItem("baseUrl", form.value.ip);
      location.reload();
      ElMessage.success("公网ip设置成功");
    }
  });
};
</script>
