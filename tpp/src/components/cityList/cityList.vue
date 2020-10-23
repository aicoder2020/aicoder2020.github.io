<template>
  <section class="hotCityList">
    <div class="cityList" ref="cityScroll">
      <ul >
        <li>
          <span>热门</span>
          <p @click.stop="getCity" v-for="(item,index) in cityList" :key="index">{{ item.name }}</p>
        </li>
        <li v-for="(item,index) in hotCity" :key="index">
          <span> {{ index }} </span>
          <p @click.stop="getCity" v-for="( itemCity,index ) in item" :key="index"> {{ itemCity.regionName }} </p>
        </li>
      </ul>
    </div>

    <ul class="cityCode">
      <li>
        <span>热门</span>
        <p v-for="(item ,index) in hotCity" :key="index"> {{ index }}</p>
      </li>
    </ul>
  </section>
</template>

<script>
    //引入better-scorll插件
    import  BScroll from 'better-scroll'

    export default {
        name: "cityList",
        data () {
          return {
            hotCity : [],
            cityList : [
              {"name" : "北京"},
              {"name" : "上海"},
              {"name" : "广州"}
            ],
            cityName : "",
            cityCode : "",
          }
        },
        methods : {
          getCity($event){
            //获取当前点击的对象
            var target = $event.currentTarget;
            //得到内容
            this.cityName = target.innerText;
            //得到点击对象对应的cityCode
            this.cityCode = this.match(target.innerText);

            //传值数组
            var cityArr = [];
            cityArr.push(this.cityName,this.cityCode);
            //传值
            this.$root.Bus.$emit("city",cityArr);
            //console.log(this.cityCode);

          },
          //得到城市代码
          match(name){
            var code = ["bj","sh","gz"];
            var returnCode = code[Math.floor(Math.random()*3)];
            switch(name){
              case "北京":
                return "bj";
                break;
              case "上海":
                return "sh";
                break;
              case "广州":
                return "gz"
            }
            return returnCode;
          }
        },
        created (){

          //获取热门城市数据
          //定义路径
          const getUrl = '/api/movie/city'
          //定义请求状态
          const ERROR_OK = 0;
          //定义作用域
          var _this = this;

          //发送请求
          this.axios.get(getUrl).then(function(res){
            if(res.data.errno === ERROR_OK){
              _this.hotCity = res.data.data.data.returnValue;
            }
          });
        },
        mounted () {
          //即定时器 20ms
          this.$nextTick(() => {
            //$refs绑定元素
            //console.log(this.scroll);
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.cityScroll, {
                //开启点击事件 默认为false
                click: true
              });
              // console.log(this.scroll)
            } else if (!this.$refs.cityScroll) {
              return;
            } else {
              this.scroll.refresh();
            }
          })
        }
    }
</script>

<style scoped>
  .hotCityList{
  display: flex;
      height:100%;
  }
  .hotCityList .cityList{
    flex: 1;
    text-align: left;
    border-right:1px solid #d9d9d9;
    padding-right:30px;
    background-color:#fff !important;
    display: fixed;
  }
  .hotCityList .cityList li span{
    display: block;
    background:#e9e9e9;
    padding-left:20px;
    font-size:18px;
    font-weight: bold;
  }
  .hotCityList .cityList li p{
    padding-left:20px;
  }
  .hotCityList .cityCode{
    width:50px;
    line-height: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .hotCityList .cityCode {

  }


</style>
