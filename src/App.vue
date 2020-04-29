<template>
  <div id="app">
    app的名字叫做：<zhj-table title="myPlugin" :list="list" :tableColemn="tableColemn" :height="400" />
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      tableColemn: [
          {
              type: 'selection',
              width: 60,
              align: 'center'
          },
          {
              title: '机器人昵称',
              key: 'vcNickName'
          },
          {
              title: '群组名称',
              key: 'groupName'
          },
          {
              title: '运营微信号',
              key: 'vcAccount'
          }
      ],
      list: [],
    }
  },
  created() {
    for (let i = 0; i < 1000; i++) {
      this.list.unshift({
          groupId: 'groupId'+i,
          vcRobotSerialNo: 'vcRobotSerialNo'+i,
          vcNickName: 'vcNickName'+i,
          groupName: 'groupName'+i,
          vcAccount: 'vcAccount'+i,
          _check: false,
          _disabled: false
      })
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
