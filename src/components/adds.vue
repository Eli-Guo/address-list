<template>
  <div>
    <x-header :left-options="{showBack: backs}">添加</x-header>
    <Alert title="成功" v-model="suc"></Alert>
    <group>
      <x-input title="昵称" v-model="nam"></x-input>
      <x-input title="手机号" v-model="num" keyboard="number" is-type="china-mobile"></x-input>
      <x-button @click.native="addps">添加</x-button>
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
        msg: {},
        linkto: "",
        num: "",
        nam: "",
        suc: false
      }
    },
    created () {
    },
    methods: {
      addps () {
          if(this.nam == "" || this.num == "") return;
          var n = Math.floor(Math.random()*10)+1;
          var imgs = './static/img/pic ('+n+').jpg';
          var that = this;
          this.$http
              .get('http://localhost:8080/api/setdata?name='+this.nam+'&num='+this.num+'&img='+imgs)
              .then(function (res) {
                that.nam = '';
                that.num = null;
                that.suc = true;
              });
      }
    }
  }
</script>

<style>
  .head-pic{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin: 40px auto;
  }
  .head-pic img{
    width: 100%;
    height: 100%;
  }
  .p-name{
    width: 100%;
    text-align: center;
  }
</style>
