<template>
  <div>
    <div class="pic">
      <img src="../img/p0.jpg">
    </div>
    <group>
      <cell :title="tit" @click.native="showPes" is-link></cell>
      <cell :title="set" @click.native="showPlu" is-link></cell>
    </group>
    <router-view></router-view>
  </div>
</template>

<script>
import { Group, Cell, Alert, XSwitch } from 'vux'

export default {
  components: {
    Group,
    Cell,
    Alert,
    XSwitch
  },
  data () {
    return {
      val: false,
      msg: 'Hello World!',
      tit: '个人资料',
      set: '设置'
    }
  },
  methods: {
    showPes () {
      this.$router.push({
        path: '/pesonal'
      })
    },
    showPlu () {
      console.log(this.$router)
      this.$router.push({
        path: '/detail'
      })
    }
  }
}
</script>

<style>
.pic{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin: 40px auto;
}
.pic img{
  width: 100px;
}
</style>
