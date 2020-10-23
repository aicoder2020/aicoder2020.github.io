<template>
    <section>

      <div class="hotcity" @click="cityBool = true">
        <span>{{ cityName }}</span>
        <i class="iconfont icon-arrow"></i>
      </div>

      <!--城市列表-->
      <div class="citylist" v-show="cityBool">
        <div class="checkHot mint-1px-b">选择热门 <i class="iconfont icon-chushaixuanxiang"  @click="cityBool = false"></i></div>
        <!--热门城市列表-->
        <v-citylist></v-citylist>

      </div>
    </section>
</template>

<script>

    //引入城市列表
    import citylist from  '@/components/citylist/citylist'
    export default {
        name: "city",
        components : {
          'v-citylist' : citylist
        },
        data() {
          return {
            cityBool : false,
            cityName : "北京"
          }
        },
        methods :{
          //接收cityList传递过来的值
          getCityData (){
            var _this = this;
            this.$root.Bus.$on("city",function(data){
              _this.cityName = data[0];
              _this.cityBool = false;
            });
          }
        },
        created(){
          this.getCityData();
        }

    }
</script>

<style scoped>
  .citylist{
    height:100%;
    width:100%;
    position:fixed;
    z-index: 1000;
    top:0;
    background:#fff;
  }
  .citylist .checkHot{
    position: relative;
    z-index: 10000;
    font-size:22px;
    font-weight: bold;
    background-color:#fff;
  }
  .citylist .checkHot i{
    position: absolute;
    right:20px;
  }
</style>
