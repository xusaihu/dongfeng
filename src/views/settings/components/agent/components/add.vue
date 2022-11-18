<template>
  <el-dialog v-model="dialogShow" title="新增代理" :before-close="beforeClose">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80">
      <el-form-item label="名称" prop="full_name">
        <el-input
          v-model.trim="form.full_name"
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input
          v-model.trim="form.phone"
          placeholder="请输入手机号码"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogShow = false">取消</el-button>
        <el-button
          type="primary"
          @click="submit(formRef)"
          :loading="btnLoading"
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineExpose, defineEmits } from "vue";
import { agentSave } from "../../../../../api/agent";
const dialogShow = ref(false);
const btnLoading = ref(false);
const open = () => {
  dialogShow.value = true;
};
defineExpose({ open });

const form = ref({
  full_name: "",
  phone: "",
});

const formRef = ref();

const rules = {
  full_name: [
    {
      required: true,
      message: "请输入名称",
      trigger: "blur",
    },
  ],
  phone: [
    {
      validator(rule, value, callback) {
        if (value && !/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)) {
          callback(new Error("手机格式有误,请重新输入"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
    {
      required: true,
      message: "请输入手机号",
      trigger: "blur",
    },
  ],
};

const emit = defineEmits(["success"]);

const submit = (formEl) => {
  formEl.validate((valid) => {
    if (valid) {
      btnLoading.value = true;
      agentSave({ ...form.value })
        .then((data) => {
          if (data.data.message) {
            ElMessage.error(data.data.message);
          } else {
            ElMessage.success("添加成功");
            beforeClose();
            emit("success");
          }
        })
        .catch((err) => {
          ElMessage.error("请求失败，请稍后重试");
        })
        .finally(() => {
          btnLoading.value = false;
        });
    }
  });
};

const beforeClose = () => {
  formRef.value.resetFields();
  dialogShow.value = false;
};
</script>

<style></style>
