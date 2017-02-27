<template>
  <div>
    <x-header :left-options="{showBack: backs}">个人信息</x-header>
    <group>
      <cell :title="tit" :value="num"></cell>
      <cell :title="grade" :value="male"></cell>
    </group>
  </div>
</template>

<script>
  import { Group, Cell, XHeader} from 'vux'
  export default {
    components: {
      Group,
      Cell,
      XHeader
    },
    data () {
      return {
        backs: true,
        msg: {},
        tit: '电话号码',
        num: '18615111521',
        grade: '性别',
        male: '男'
      }
    },
    created () {

    },
    methods: {

    }
  }
</script>

<style>
</style>
