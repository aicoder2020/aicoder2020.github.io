<template>
    <section >
      <div class="filmDeil">
        <p class="filmImg">
          <img :src="hostName +filmData.poster " :alt="hostName +filmData.poster">
        </p>
        <div>
          <h3 class="f16">{{ filmData.showName }}</h3>
          <p>{{ filmData.showNameEn }}</p>
          <p>{{ filmData.type }}</p>
          <p>{{ filmData.country }}｜{{ filmData.duration }}分钟</p>
          <p>这是评价</p>
        </div>
      </div>
      <div class="filmText">
        住在日本深山的某个乡下小镇的女高中生三叶（上白石萌音 配音）每天都过着忧郁的生活，
        而她烦恼的不光有担任镇长的父亲所举行的选举运动，还有家传神社的古老习俗。 三叶身居这小镇之中，
        又处于过多在意周围人目光的年龄，因此对大都市的憧憬日益强烈。 然而某一天，自己做了一 个变成男孩子的梦。
        这儿有着陌生的房间、陌生的朋友。 而眼前出现的则是东京的街道。三叶虽然感到困惑，
        但是能够来到朝思暮想的都市生活， 让她觉得神清气爽。另一方面在东京生活的男高中生立花泷（神木隆之介 配音）
        也做了个奇怪的梦。 他在一个从未去过的深山小镇中，变成了女高中生。
        两人就这样在梦中邂逅了彼此。随着千年后再度回归的彗星造访地球，命运的齿轮开始转动........
      </div>

      <div class="goNext" @click="go">回到上一页</div>

    </section>
</template>

<script>
    export default {
        name: "movie",
        data () {
          return {
            filmData : {},
            hostName : "http://img1.tbcdn.cn/tfscom/"
          }
        },
        methods : {
          getFilmData(){
            var _this = this;
            this.$root.Bus.$on("filmIndex",function(data){
              _this.filmData = data;
            });
          },
          go(){
            history.go(-1)
          }
        },
        created () {
          this.getFilmData();
        },
        beforeDestroy(){
          this.$root.Bus.$off();
        }

    }
</script>

<style scoped>
.filmDeil{
  display: flex;
  padding:20px;
  background: #2a86ab;
  color:#fff;
}
.filmDeil .filmImg{
  width: 25vmin;
  height:35vmin;
  border:1px solid #ccc;
  margin-right:15px;
}
.filmDeil div{
  flex: 1;
}
.filmDeil div p{
  line-height: 7.5vmin;
}
.filmText{
  padding:20px;
  line-height: 7.5vmin;
}

.goNext{
  width:100%;
  height:70px;
  background:red;
  position: fixed;
  bottom: 0;
  z-index: 1000000;
  color:#fff;
  font-size:20px;
  text-align: center;
  line-height: 70px;
  cursor: pointer;
}
</style>
