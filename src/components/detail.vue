<template>
  <div>
    <x-header :left-options="{showBack: backs}">设置</x-header>
    <Alert :title="alet" v-model="val"></Alert>
    <group>
      <x-switch :title="msg" v-model="val"></x-switch>
    </group> 
  </div>
</template>

<script>
import { Group, Cell, Alert, XSwitch, XHeader} from 'vux'

export default {
  components: {
    Group,
    Cell,
    Alert,
    XSwitch,
    XHeader
  },
  data () {
    return {
      backs: true,
      val: false,
      msg: '显示弹窗',
      alet: '你好！'
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