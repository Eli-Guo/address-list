<template>
  <div>
    <x-header :left-options="{showBack: backs}">修改</x-header>
    <Alert title="成功" v-model="suc"></Alert>
    <group>
      <x-input title="手机号" v-model="num" keyboard="number" is-type="china-mobile"></x-input>
      <x-button @click.native="changeNum">修改</x-button>
    </group>
  </div>
</template>

<script>
  import { Group, XInput, XHeader, XButton, Alert} from 'vux'
  export default {
    components: {
      Group,
      XInput,
      XHeader,
      XButton,
      Alert
    },
    data () {
      return {
        backs: true,
        num: "",
        suc: false,
        msg: {}
      }
    },
    created () {
      this.getData();
    },
    methods: {
      getData () {
        var that = this;
        this.$http
          .get('http://localhost:8080/api/data')
          .then(function(res){
            that.msg = res.data.data[that.$route.query.idx];
            that.num = that.msg.txt;
          },function(err){
            console.log(err)
          })
      },
      changeNum () {
        if(this.num == "") return;
        var that = this,
            idx = this.$route.query.idx;
        this.$http
            .get('http://localhost:8080/api/changedata?idx='+idx+'&num='+that.num)
            .then(function (res) {
              that.suc = true;
            });
      }
    }
  }
</script>

<style>

</style>
