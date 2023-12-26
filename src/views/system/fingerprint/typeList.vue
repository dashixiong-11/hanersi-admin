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
            <el-table-column>
                <template #default="scope">
                    <el-button type="primary" @click="handleSearch(scope.$index, scope.row)" link>
                        查询
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column v-for="(item, index) in tableColumn" header-align="center" align="center"
                :show-overflow-tooltip="true" :key="index" :prop="item" :label="item">
            </el-table-column>
        </el-table>
        <div class="pagination-wrapper">
            <el-pagination v-model="currentPage" layout="prev, pager, next" :total="total"
                @current-change="currentChange" />
        </div>
        <el-dialog v-model="tableVisible" width="80%" :before-close="handleClose">
            <el-table :data="fingerprintTableData" style="width: 100%;" max-height="500px">
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
            <el-button @click="delSearch"> 删除 </el-button>
        </el-dialog>
        <el-dialog v-model="diffDialogVisible" width="80%" :before-close="handleClose">
            <div>
                <el-input v-model="newString" :rows="5" type="textarea" placeholder="Please input" />
            </div>
            <div>
                <code-diff max-height="500px" language="json" :old-string="oldString" :new-string="newString"
                    output-format="side-by-side" />
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="diffDialogVisible = false">Cancel</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup name="FingerprintTypeList">
import { reactive, onMounted, ref } from 'vue'
import TagInput from '@/components/TagInput'
import { getFingerprintList, getFingerprint, getStatus, delFingerprint } from '@/api/system/fingerprint'
const route = useRoute()
const multipleSelection = ref([])
const status = ref([])
const pkTypes = ref([])
const dialogVisible = ref(false)
const diffDialogVisible = ref(false)
const list = ref([])
const fingerprintTypeDetail = ref({})
const tableVisible = ref(false)
const created_at = ref(null)
const updated_at = ref(null)
const oldString = ref('')
const newString = ref('')
const currentPage = ref(1)
const total = ref(0)
const fingerprintTypeList = ref([])
const loading = ref(false)
const fingerprintTableData = ref([])
const searchList = ref([])

// const tableColumn = computed(() => Object.keys(list.value[0]))
const tableColumn = ref([])


const sizeForm = reactive({
    ids: [],
    enforcement_hex: '',
    md5: '',
    user_agent: '',
    pk_type: '',
    version: '',
    version_uuid: '',
    status: '',
    fingerprint_type: 'fe'
})





onMounted(() => {
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
    if (multipleSelection.value.length === 0) return
    getFingerprint({
        ids: multipleSelection.value.map(item => item.id)
    }).then(res => {
        if (res.code === 0 && res.data) {
            oldString.value = JSON.stringify(res.data, null, 2)
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
        page_size: 300,
        page: currentPage.value,
        query: filterEmptyFields(q)
    }).then(res => {
        if (res.data && res.data.items) {
            const l = res.data.items.map(i => {
                return { id: i.id, user_agent: i.user_agent, ...i[sizeForm.fingerprint_type] }
            })
            tableColumn.value = Object.keys(l[0])
            list.value = l
            total.value = res.data.total
        }
    }).finally(() => loading.value = false)
}


const currentChange = page => {
    currentPage.value = page
}

watchEffect(() => {
    getList(sizeForm)
})

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
    dialogVisible.value = false
    tableVisible.value = false
    diffDialogVisible.value = false
    oldString.value = ''
    newString.value = ''
}
const handleSearch = (index, row) => {
    loading.value = true
    getFingerprintList({
        page_size: 100,
        page: currentPage.value,
        query: { user_agent: row.user_agent }
    }).then(res => {
        if (res.data && res.data.items) {
            fingerprintTableData.value = res.data.items
            tableVisible.value = true
        }
    }).finally(() => loading.value = false)
}
const delSearch = () => {

    delFingerprint({
        ids: fingerprintTableData.value.map(item => item.id)
    }).then(res => {
        tableVisible.value = false
    })
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