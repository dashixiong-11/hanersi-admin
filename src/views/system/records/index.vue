<template >
    <div class="records app-container">
        <el-form ref="form" :model="sizeForm" :inline="true">
            <el-form-item label="姓名">
                <el-input v-model="sizeForm.name" />
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="sizeForm.name" />
            </el-form-item>
            <el-form-item label="身份证号码">
                <el-input v-model="sizeForm.name" />
            </el-form-item>
            <el-form-item label="到访时间">
                <el-row>
                <el-col :span="9"> <el-date-picker v-model="sizeForm.date1" type="date" label="选择日期" placeholder="选择日期"
                        style="width: 100%" /> </el-col>
                <el-col class="text-center" :span="1" style="margin: 0 0.5rem">-</el-col>
                <el-col :span="9"> <el-time-picker v-model="sizeForm.date2" label="选择时间" placeholder="选择时间"
                        style="width: 100%" />
                </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">搜索</el-button>
                <el-button type="primary" @click="onSubmit">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" max-height="400px" style="width: 100%">
            <el-table-column prop="time" label="时间" width="180" />
            <el-table-column prop="name" label="姓名" width="180" />
            <el-table-column prop="phone" label="手机号" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { tableData } from '@/assets/mock'
const router = useRouter();


const sizeForm = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})
const handleEdit = (index, row) => {
    router.push('/visitor/index/view/'+ row.id)
}

const onSubmit = e => {
    console.log(e);
}
</script>

<style></style>