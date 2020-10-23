<template>
    <section>
        <!--左右滑动图片-->
      <div class="swipe-wrapper">
        <mt-swipe :auto="2000" ref="swipeWrapper">
          <mt-swipe-item class="swip-item-1 item"><img src="https://gw.alicdn.com/tfs/tps/TB1YTkBOpXXXXbLaXXXXXXXXXXX-1280-520.jpg" alt=""></mt-swipe-item>
          <mt-swipe-item class="swip-item-2 item"><img src="https://gw.alicdn.com/tfs/tps/TB1pre1OFXXXXaGXXXXXXXXXXXX-1280-520.jpg" alt=""></mt-swipe-item>
          <mt-swipe-item class="swip-item-3 item"><img src="https://gw.alicdn.com/tfs/tfs/TB1.Zy6OFXXXXbhXpXXXXXXXXXX-1280-520.jpg" alt=""></mt-swipe-item>
        </mt-swipe>
      </div>
      <!--电影布局-->
      <ul class="filmList">
        <li v-for="( itemFilm, index) in filmList " :key="index">
          <div>
            <p class="filmImg">
              <img :src="hostName + itemFilm.poster" :alt="hostName + itemFilm.poster">
            </p>
            <div class="filmText" @click="sendFilmData(index)">
              <router-link class="filmLink" :to="{ name : 'movie',params: { hid : index }}">
                <h3 class="towc">{{ itemFilm.showName }}</h3>
                <span>这是星星评级</span>
                <p class="mt6 towc"> {{ itemFilm.highlight }}</p>
                <p class="mt6 towc">{{ itemFilm.leadingRole }}</p>
              </router-link>
              <button>购买</button>
            </div>
          </div>
          <div class="carnival">
            <p>1212五折狂欢</p>
            <p class="towc">1212特惠抢票，名额有限抢完即止</p>
          </div>
        </li>
      </ul>

    </section>
</template>

<script>
    export default {
        name: "liveShow",
        data(){
          return{
            cityCode : "bj",
            filmList : [],
            hostName : "http://img1.tbcdn.cn/tfscom/"
          }
        },
        methods : {
          getFilm(cityCode){
            //错误信息
            const ERROR_OK = 0;
            //获取地址
            let filmUrl = "/api/movie/hot/?city="+cityCode;

            var _this = this;
            //发送请求
            this.axios.get(filmUrl).then(function(res){
              if(res.data.errno === ERROR_OK){
                _this.filmList = res.data.data.data.returnValue;

              };
            });
          },
          getCityData(){
            var _this = this;
            this.$root.Bus.$on("city",function(data){
              _this.cityCode = data[1];
            });
          },
          sendFilmData(index){
            var _this = this;
            setTimeout(function(){
              var data = _this.filmList[index];
              //console.log(index);
              _this.$root.Bus.$emit("filmIndex",data);
            },20)
          }
        },
        created(){
            this.getFilm(this.cityCode);
            this.getCityData();
        },
        watch : {
          cityCode(data){
            this.getFilm(data);
          }
        }

    }
</script>

<style scoped>
.swipe-wrapper{
  width:100%;
  height:45vmin;
}
.filmList{
  padding-left:10px;
}
.filmList li{
  border-bottom:1px solid #d9d9d9;
  margin:20px 0;
}
.filmList li div {
  display: flex;
}
.filmList li>div > .filmImg{
  width:65px;
  height:90px;
  border:1px solid #ccc;
}
.filmList li .filmText{
  flex:1;
  margin-left:10px;
  padding-bottom:15px;
  border-bottom:1px solid #d9d9d9;
}
.filmList li a{
  flex: 1;
  width:0;
}

.filmList li button{
  width: 45px;height: 24px;border: 1px solid red;border-radius: 3px;
  background: #fff;color: red;margin: auto 20px;
}

.filmList li   .carnival{
  display: flex;
  margin-left : 75px;
  padding:10px 0;
}

.filmList li   .carnival p{
  flex: 1;
}
.filmList li   .carnival p:first-child{
  border-right:1px solid #d9d9d9;
  color:#f60;
}
.filmList li   .carnival p:last-child{
  padding-left: 10px;
  width:0;
}


</style>
