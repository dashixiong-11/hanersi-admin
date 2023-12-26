<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :xs="12" :sm="12" :md="12" :lg="12">
        <el-card class="update-log">
          <template v-slot:header>
            <div class="clearfix">
              <span>扫码登记</span>
            </div>
          </template>
          <div class="body">
            <img src="@/assets/images/pay.png" alt="donate" style="width:100%" />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card class="update-log">
          <template v-slot:header>
            <div class="clearfix">
              <span>今日访客</span>
            </div>
          </template>
          <el-table :data="tableData" max-height="400px"   style="width: 100%">
            <el-table-column prop="time" label="时间" width="180" />
            <el-table-column prop="name" label="姓名" width="180" />
            <el-table-column prop="phone" label="手机号" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <!-- <el-col :xs="12" :sm="12" :md="12" :lg="12">
        <el-card class="update-log">
          <template v-slot:header>
            <div class="clearfix">
              <span>扫码登记</span>
            </div>
          </template>
          <div class="body">
            <img
              src="@/assets/images/pay.png"
              alt="donate"
              style="width:100%"
            />
          </div>
        </el-card>
      </el-col> -->
    </el-row>
  </div>
</template>

<script setup name="Index">
import { ref } from 'vue'
import {tableData} from '@/assets/mock'
const value = ref(new Date())
function goTarget(url) {
  window.open(url, '__blank')
}
const handleEdit = (index, row) => {
  console.log(row);
}






</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }

  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }

  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans",
  "Helvetica Neue",
  Helvetica,
  Arial,
  sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    height: 100%;

    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }

  .card-body {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
  }
}
</style>

