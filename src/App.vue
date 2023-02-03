
<template>
  <header_com />
  <router-view></router-view>
      <!-- <button @click="login()">Giris yap</button>
           Login mi ? {{isLogin}} -->
</template> 

<script>
import header_com from "./components/header.vue";
export default {
  name: "App",
  components: {
    header_com,
  },

  data() {
    return {
      isLogin:false,
      lists: [],
    };
  },

     methods:{
      // async login(){
      //   const googleUser =await this.$gAuth.signIn();
      //   console.log("Google users is:",googleUser);
      // }
     }

};
</script>

<style></style>
