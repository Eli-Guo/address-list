<template>
  <div class="listpage">
    <loading v-model="loading" :text="txt"></loading>
    <x-header :left-options="{showBack: false}">列表<a slot="right" @click="addP">Add</a></x-header>
    <div class="loading" v-if="loading">loading...</div>
    <div class="error" v-if="err">{{errData}}</div>
    <scroller lock-x height="100%" v-if = "listc">
      <div class="isc">
        <div class="list-li" v-for="(i,k) in msg" @click="toPerson(i,k,i.iscol)">
          <div class="list-t">{{i.title}}</div>
          <div class="list-c">{{i.txt}}</div>
          <img class="list-p" :src="i.src">
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import { Scroller, Loading, XHeader } from 'vux'

export default {
  components: {
    Scroller,
    Loading,
    XHeader
  },
  data () {
    return {
      loading: false,
      err: false,
      listc: false,
      errData: null,
      txt: "载入中...",
      msg: []
    }
  },
  created () {
    this.getData();
    console.log(this.$vux)
  },
  methods: {
    getData () {
      var that = this;
      this.loading = true;
      this.$http
          .get('http://localhost:8080/api/data')
          .then(function(res){
            that.loading = false;
            that.err = false;
            that.listc = true;
            console.log(res.data.data)
            that.msg = res.data.data;
          },function(err){
            that.loading = false;
            that.err = true;
            that.errData = err.status;
            console.log(err)
          })
    },
    toPerson (i,k,c) {
      var str = JSON.stringify(i);
      this.$router.push({
        path: "/person?data="+str+"&id="+k+"&col="+c
      })
    },
    addP () {
      this.$router.push({
        path: "/adds"
      })
    }
  }
}
</script>

<style>
.listpage{
  height: 100%;
}
.isc{
 padding-bottom: 50px;
}
.list-li{
  padding: 10px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin: 10px 0;
  display: block;
  position: relative;
}
.list-t{
  font-size: 30px;
  font-weight: bold;
  color: #333;
}
.list-c{
  font-size: 18px;
  color: #999;
}
.list-p{
  position: absolute;
  right: 10px;
  top: 10px;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  overflow: hidden;
}
</style>
