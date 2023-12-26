<template>
    <div class="visitor app-container">
        <el-row :gutter="20">
            <el-col :xs="12" :sm="12" :md="12" :lg="12">
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span> 个人信息</span>
                            <el-button class="button" text>修改</el-button>
                        </div>
                    </template>
                    <div class="card-info">
                        <el-avatar :size="50" :src="''" />
                        <div class="info">
                            <div class="name-phone">
                                <span class="name">张三</span>
                                <span class="phone"> 13700000000 </span>
                            </div>
                            <span class="id-card">362203111111111100 </span>

                        </div>
                    </div>
                    <el-statistic title="余额" style="margin-top: 2em;"
                        :value-style="{ fontSize: '30px', fontWeight: 'bold' }" :value="268500">
                        <template #prefix>
                            <span style="">
                                ￥
                            </span>
                        </template></el-statistic>

                </el-card>
                <el-card class="box-card" style="margin-top: 20px;">
                    <template #header>
                        <div class="card-header">
                            <span> 已做项目</span>
                            <el-button class="button" text @click="dialogVisible = true">修改</el-button>
                        </div>
                    </template>
                    <el-timeline>
                        <el-timeline-item timestamp="2018/4/12" placement="top">
                            <el-card>
                                <h4>Update Github template</h4>
                                <p>Tom committed 2018/4/12 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/3" placement="top">
                            <el-card>
                                <h4>Update Github template</h4>
                                <p>Tom committed 2018/4/3 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/2" placement="top">
                            <el-card>
                                <h4>Update Github template</h4>
                                <p>Tom committed 2018/4/2 20:46</p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </el-card>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12">
                <el-card class="box-card">
                    <el-calendar v-model="value" />
                </el-card>
            </el-col>
        </el-row>
        <el-dialog v-model="dialogVisible" title="修改" width="50%" :before-close="handleClose">
            <div class="updata-physical-examinations-dialog">
                <el-form ref="formRef" :model="dynamicValidateForm" label-width="120px" class="demo-dynamic">
                    <el-form-item v-for="(physicalExaminations, index) in dynamicValidateForm.physicalExaminations"
                        :key="index"  :prop="'domains.' + index + '.value'">
                        <el-row :gutter="20">
                            <el-col v-for="(item, itemIndex) in physicalExaminations" :lg="6"
                                style="display: flex;align-items: center;">
                                <span style="width: 4em;">{{ item.label }}</span>
                                <el-input v-model="item.value" />
                            </el-col>
                            <el-col :lg="6">
                                <el-button type="danger" @click.prevent="removeDomain(domain)">删除</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>

                    <el-form-item class="">
                        <!-- <el-button type="primary" @click="submitForm(formRef)">Submit</el-button> -->
                        <el-button @click="addDomain" type="primary">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup name="VisitorInfo">
import { reactive, ref } from 'vue'
import { ElMessageBox } from 'element-plus'

const value = ref(new Date())
const dialogVisible = ref(false)

const handleClose = (done) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}

const formRef = ref()
const dynamicValidateForm = reactive({
    domains: [

        {
            key: 1,
            value: '',
        },
    ],
    physicalExaminations: [[
        { key: 'name', label: '名称', value: '' },
        { key: 'date', label: '时间', value: '' },
        { key: 'amount', label: '金额', value: '' },
    ]],
    email: '',
})


const removeDomain = (item) => {
    const index = dynamicValidateForm.domains.indexOf(item)
    if (index !== -1) {
        dynamicValidateForm.domains.splice(index, 1)
    }
}

const addDomain = () => {
    dynamicValidateForm.physicalExaminations.push([
        { key: 'name', label: '名称', value: '' },
        { key: 'date', label: '时间', value: '' },
        { key: 'amount', label: '金额', value: '' },
    ])
}

const submitForm = (formEl) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<style scoped lang="scss">
.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.card-info {
    display: flex;
    align-items: center;

    .info {
        margin-left: 1em;
        line-height: 1.3;

        .name {
            font-weight: bold;
        }

        .phone,
        .id-card {
            font-size: 13px;
            color: #666;
        }
    }
}
</style>