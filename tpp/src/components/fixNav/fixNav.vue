<template>
      <nav class="mint-1px-t">
        <ul>
          <li><router-link to="/"><i class="iconfont icon-dianying"></i>电影</router-link></li>
          <li><router-link to="/filmYard"><i class="iconfont icon-yingyuan"></i>影院</router-link></li>
          <li><router-link to="/my"><i class="iconfont icon-wode"></i>我的</router-link></li>
        </ul>
      </nav>
</template>

<script>
    export default {
        name: "fixNav"
    }
</script>

<style scoped>
  nav{
    position: fixed;
    bottom:0;
    width:100%;
    text-align: center;
    background-color:#fff;
  }
  nav ul{
    display: flex;
  }
  nav ul li{
    flex : 1;
    padding: 10px 0;
  }
  nav ul li i{
    display: block;
    font-size:22px;
  }

  .router-link-exact-active{
    color:red;
  }

</style>
