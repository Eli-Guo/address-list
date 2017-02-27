<template>
  <div>
    <x-header :left-options="{showBack: backs}" :right-options="{showMore: true}" @on-click-more="showm=true">个人信息</x-header>
    <loading v-model="loading" :text="txt"></loading>
    <div class="head-pic"><img :src="linkto"></div>
    <div class="p-name">{{title}}</div>
    <group>
      <cell :title="tit" :value="num"></cell>
    </group>
    <x-button class="cbutton" @click.native="col" >{{text}}</x-button>
    <actionsheet :menus="menus" v-model="showm" @on-click-menu="mclick" show-cancel></actionsheet>
    <confirm v-model="showc" @on-confirm="onConfirm"></confirm>
  </div>
</template>

<script>
  import { Group, Cell, XHeader, Loading, Actionsheet, Confirm, XButton} from 'vux'
  export default {
    components: {
      Group,
      Cell,
      XHeader,
      Loading,
      Actionsheet,
      Confirm,
      XButton
    },
    data () {
      return {
        backs: true,
        loading: false,
        txt: '载入中...',
        text: '',
        msg: {},
        tit: '电话号码',
        title: '',
        linkto: '',
        num: null,
        showm: false,
        showc: false,
        collect: false,
        menus: {
          menu1: '删除',
          menu2: '修改'
        }
      }
    },
    created () {
        this.getData();
        this.buttontitle();
    },
    methods: {
        getData () {
          this.msg = JSON.parse(this.$route.query.data);
          this.num = this.msg.txt;
          this.title = this.msg.title;
          this.linkto = this.msg.src;
          this.collect = this.$route.query.col == 'false' ? false:true;
        },
        mclick (k) {
          var idx = this.$route.query.id,
              that = this;
          if (k == 'menu1'){
            console.log('del')
            this.$vux.confirm.show({
                title: '确认删除吗',
                onConfirm () {
                  console.log(1)
                  that.$http
                      .get('http://localhost:8080/api/deldata?idx='+idx)
                      .then(function (res) {
                        that.$router.push({
                          path: "/index/list"
                        })
                      })
                }
            })
          }else if(k == 'menu2'){
            this.$router.push({
                path: "/changes?idx="+idx
            })
          }
        },
        onConfirm () {
            console.log("sure")
        },
        col () {
            var idx = this.$route.query.id;
            var url = '';
            if(!this.collect) {
              this.collect = true;
              url = 'http://localhost:8080/api/addcol?name='+this.title+'&num='+this.num+'&img='+this.linkto+'&idx='+idx+'&col='+this.collect;
            }else{
                this.collect = false;
                url = 'http://localhost:8080/api/remcol?idx='+this.title;

            }
            this.$http
              .get(url)
              .then(function(data){
                  console.log(data)
              })

        },
        buttontitle (){
            if(this.collect){
                this.text = '移除常用'
            }else{
                this.text = '添加常用'
            }
        }
    },
    watch: {
        'collect': 'buttontitle'
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
  .cbutton{
    width: 92%!important;
    margin: 20px auto;
  }
</style>
