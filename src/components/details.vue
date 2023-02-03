
<template>
  <h1 class="user">User's Details Form's</h1>
  <!-- <table /> -->
  <!-- <h1> Is Initialization:{{ Vue3GoogleOauth.isInit }}</h1> -->

  <div class="col-md-6">
    <!-- <el-form
      ref="ruleFormRef" :model="ruleForm"
      status-icon :rules="rules" label-width="120px"
           class="demo-ruleForm">
      <el-form-item label="Password" prop="pass">
        <el-input type="password" />
      </el-form-item>
      <el-form-item label="First Name:" v-model="first_Name">
        <el-input />
      </el-form-item>
      <el-form-item label="Last Name:" prop="last_Name" v-model="last_Name">
        <el-input />
      </el-form-item>
      <el-form-item label="Email:" prop="email" v-model="email">
        <el-input />
      </el-form-item>
    </el-form> -->

      <form>
      <label>FirstName: </label>
      <input type="text" placeholder="Enter first Name" v-model="users.first_name" />
      <br /><br />
      <label>LastName: </label>
      <input type="text" placeholder="Enter last Name" v-model="users.last_name" />
      <br /><br />

      <label>Email: </label>
      <input type="text" placeholder="Enter Email" v-model="users.email" />
      <br /><br />
      <label>Images:
        <input type="file" accept="image/*" ref="file" @change="selectImage" />
      </label>
      <!-- <input type="text" placeholder="Enter Images Url" v-model="users.avatar" /> -->
      </form>


  </div>
  <button class="btn btn-primary" v-on:click="sendData()">Submit</button>
  <button>Login</button>
</template>


<script>
// import { inject } from 'vue'
import axios from "axios";
export default {
  name: "user_co",
  
  // setup() {
  //   const Vue3GoogleOauth = inject('Vue3GoogleOauth')
  //   return {
  //     Vue3GoogleOauth
  //   }
  // },


  data() {
    return {
      users: {
        first_name: "",
        last_name: "",
        email: "",
        avatar: []
      },
    };
  },


  methods: {
    async sendData() {
      const result = await axios.post("http://localhost:3000/data", this.users);
      if (result.status == 201) {
        this.$notify({
          title: 'Success',
          message: 'User Created successfully',
          type: 'success'
        });
        this.$router.push("/table?");
      }
    },
  },

};
</script>


<style>
.user {
  text-align: center;
  margin-top: 4px;
}

.btn-primary {
  margin-left: 50%;
}
</style>
