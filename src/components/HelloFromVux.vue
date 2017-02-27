<template>
  <div class="wrap">
    <div class="w-content">
      <router-view></router-view>
    </div>
    <div class="w-foot">
      <ul>
        <li><router-link to='/index/home'>HOME</router-link></li>
        <li><router-link to='/index/list'>LIST</router-link></li>
        <li><router-link to='/index/mine'>MINE</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'

export default {
  components: {
    Group,
    Cell
  },
  data () {
    return {
      msg: 'Hello World!'
    }
  }
}
</script>

<style>
.wrap{
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}
.w-content{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 50px;
}
.w-foot{
  width: 100%;
  height: 50px;
  border-top: 1px solid #ccc;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #fff;
}
.w-foot ul li{
  float: left;
  width: 33.33%;
  text-align: center;
  line-height: 50px;
}
.w-foot ul li a{
  color: #333;
}
.w-foot ul li a.router-link-active{
  color: #007cff;
}
</style>
