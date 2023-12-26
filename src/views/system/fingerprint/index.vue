<template >
    <div class="records app-container">
        <el-form ref="form" :model="sizeForm" :inline="true">
            <el-form-item label="ID">
                <tag-input v-model="sizeForm.ids"></tag-input>
            </el-form-item>
            <el-form-item label="arkose版本UUID">
                <el-input v-model="sizeForm.enforcement_hex" />
            </el-form-item>
            <el-form-item label="arkose版本">
                <el-input v-model="sizeForm.version" />
            </el-form-item>
            <el-form-item label="MD5指纹">
                <el-input v-model="sizeForm.md5" />
            </el-form-item>
            <el-form-item label="指纹类型">
                <el-select v-model="sizeForm.fingerprint_type" class="m-2" placeholder="请选择">
                    <el-option v-for="item in fingerprintTypeList" :key="item.value" :label="item.text"
                        :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="浏览器用户代理">
                <el-input v-model="sizeForm.user_agent" />
            </el-form-item>
            <el-form-item label="挑战类型版本UUID">
                <el-input v-model="sizeForm.version_uuid" />
            </el-form-item>
            <el-form-item label="挑战类型">
                <el-select v-model="sizeForm.pk_type" class="m-2" placeholder="请选择">
                    <el-option v-for="item in pkTypes" :key="item.value" :label="item.text" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="sizeForm.status" class="m-2" placeholder="请选择">
                    <el-option v-for="item in status" :key="item.value" :label="item.text" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-date-picker v-model="created_at" type="datetimerange" start-placeholder="创建开始时间"
                    end-placeholder="创建结束时间" format="YYYY-MM-DD HH:mm:ss" date-format="YYYY/MM/DD ddd"
                    value-format="YYYY-MM-DD hh:mm:ss" time-format="A hh:mm:ss" />
            </el-form-item>
            <el-form-item label="更新时间">
                <el-date-picker v-model="updated_at" type="datetimerange" start-placeholder="更新开始时间"
                    end-placeholder="更新结束时间" format="YYYY-MM-DD HH:mm:ss" date-format="YYYY/MM/DD ddd"
                    value-format="YYYY-MM-DD hh:mm:ss" time-format="A hh:mm:ss" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">搜索</el-button>
                <el-button type="primary" @click="onReset">重置</el-button>
            </el-form-item>
        </el-form>
        <div style="padding-bottom: 1em;">
            <el-button type="primary" plain @click="getF">获取指纹</el-button>
            <el-button plain @click="delF">删除指纹</el-button>
        </div>
        <el-table :data="list" @selection-change="handleSelectionChange" v-loading="loading" style="width: 100%;"
            max-height="800px">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="ID" :show-overflow-tooltip="true" />
            <el-table-column prop="created_at" label="创建时间" :show-overflow-tooltip="true" />
            <el-table-column prop="fingerprint_type" label="指纹类型" :show-overflow-tooltip="true" />
            <el-table-column prop="enforcement_hex" label="arkose版本UUID" :show-overflow-tooltip="true" />
            <el-table-column prop="md5" label="指纹MD5" :show-overflow-tooltip="true" />
            <el-table-column prop="pk_type" label="挑战类型" :show-overflow-tooltip="true" />
            <el-table-column prop="updated_at" label="更新时间" :show-overflow-tooltip="true" />
            <el-table-column prop="user_agent" label="浏览器用户代理" :show-overflow-tooltip="true" />
            <el-table-column prop="version" label="arkose版本" :show-overflow-tooltip="true" />
            <el-table-column prop="version_uuid" label="挑战类型版本UUID" :show-overflow-tooltip="true" />
            <el-table-column prop="status" label="状态" :show-overflow-tooltip="true" />
            <!-- <el-table-column label="详细信息">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                </template>
            </el-table-column> -->
        </el-table>
        <div class="pagination-wrapper">
            <el-pagination v-model="currentPage" layout="prev, pager, next"
                :page-sizes="[100, 200, 300, 400, 600, 800, 1000, 2000]" :total="total" @size-change="handleSizeChange"
                @current-change="currentChange" />
        </div>
        <el-dialog v-model="diffDialogVisible" width="80%" :before-close="handleClose">
            <div>
                <el-input v-model="newString" :rows="5" type="textarea" placeholder="Please input" />
            </div>
            <div>
                <code-diff max-height="500px" language="json"  :old-string="oldString"
                    :new-string="newString" output-format="side-by-side" />
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="diffDialogVisible = false">Cancel</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup name="Fingerprint">
import { reactive, onMounted, ref, watchEffect, } from 'vue'
import { useRouter } from 'vue-router'
import TagInput from '@/components/TagInput'
import { getFingerprintList, getStatus, getFingerprint, delFingerprint } from '@/api/system/fingerprint'
const multipleSelection = ref([])
const status = ref([])
const pkTypes = ref([])
const diffDialogVisible = ref(false)
const list = ref([])
const created_at = ref(null)
const updated_at = ref(null)
const oldString = ref('')
const newString = ref('')
const currentPage = ref(1)
const total = ref(0)
const fingerprintTypeList = ref([])
const loading = ref(false)
const pageSize = ref(1000)
const router = useRouter()



const sizeForm = reactive({
    ids: [],
    enforcement_hex: '',
    md5: '',
    user_agent: '',
    pk_type: '',
    version: '',
    version_uuid: '',
    status: '',
    fingerprint_type: ''
})


onMounted(() => {
    getList()
    getStatus({ keys: ['pk_type', 'status', 'fingerprint_type'] }).then(res => {
        if (res.code === 0 && res.data && res.data.statuses && res.data.statuses) {
            if (res.data.statuses.status) {
                status.value = res.data.statuses.status
            }
            if (res.data.statuses.pk_type) {
                pkTypes.value = res.data.statuses.pk_type
            }
            if (res.data.statuses.fingerprint_type) {
                fingerprintTypeList.value = res.data.statuses.fingerprint_type
            }
        }
    })

})


const handleSelectionChange = (val) => {
    multipleSelection.value = val
}

const getF = () => {
    if (multipleSelection.value.length === 0 && sizeForm.ids.length === 0) {
        return
    }
    getFingerprint({
        ids: [...multipleSelection.value.map(item => item.id), ...sizeForm.ids],
        json_string: true
    }).then(res => {
        if (res.code === 0 && res.data) {
            oldString.value = res.data.fingerprint
            setTimeout(() => {
                diffDialogVisible.value = true
            })
        }
    })
}

const delF = () => {
    if (multipleSelection.value.length === 0) {
        return
    }
    loading.value = true

    delFingerprint({
        ids: multipleSelection.value.map(item => item.id)
    }).then(res => {
        if (res.code === 0) {
            list.value = list.filter(id => !multipleSelection.value.includes(id))
        }
    }).finally(() => loading.value = false)
}


const filterEmptyFields = (obj) => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value !== '') {
            acc[key] = value;
        }
        return acc;
    }, {});
}

const getList = (query = {}) => {
    loading.value = true
    const q = Object.assign({}, query)
    if (created_at.value && created_at.value.length > 0) {
        q.created_at_from = created_at.value[0]
        q.created_at_to = created_at.value[1]
    }
    if (updated_at.value && updated_at.value.length > 0) {
        q.updated_at_from = updated_at.value[0]
        q.updated_at_to = updated_at.value[1]
    }
    if (q.ids) {
        q.ids = q.ids.map(id => parseInt(id))
    }
    getFingerprintList({
        page_size: pageSize.value,
        page: currentPage.value,
        query: filterEmptyFields(q)
    }).then(res => {
        if (res.data && res.data.items) {
            list.value = res.data.items
            total.value = res.data.total
        }
    }).finally(() => loading.value = false)
}


const currentChange = page => {
    currentPage.value = page
    setTimeout(() => {
        getList()
    })
}

const handleSizeChange = (size) => {
    pageSize.value = size
}


const onReset = () => {
    created_at.value = null
    updated_at.value = null
    sizeForm.ids = []
    sizeForm.enforcement_hex = ''
    sizeForm.md5 = ''
    sizeForm.user_agent = ''
    sizeForm.pk_type = ''
    sizeForm.version = ''
    sizeForm.version_uuid = ''
    sizeForm.status = ''
    currentPage.value = 1

    getList()
}
const onSubmit = () => {
    getList(sizeForm)
}
const handleClose = () => {
    diffDialogVisible.value = false
    oldString.value = ''
    newString.value = ''
}



</script>

<style scoped>
ul,
li {
    list-style: none;
    padding: 0;
    margin: 0;
}

.detail {
    padding: 0 1rem;

    li {
        padding: .5em 0;

        .key {
            font-weight: bold;
        }

        .value {
            margin-left: 1em;
        }
    }
}

.pagination-wrapper {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
}
</style>