<template>
  <section>
    <h1 class="text-center">form's Data</h1>
    <h1>Name is:{{ name }}</h1>
    <button class="btn btn-primary">call api</button>
  </section>

  <!-- <el-table :data="lists" style="width: 100%">
    <el-table-column prop="id" label="No" width="180"  >
      </el-table-column>
    <el-table-column prop="first_name" label="FirstName" width="180" />
    <el-table-column prop="last_name" label="LastName" />
    <el-table-column prop="email" label="Email" />
    <el-table-column prop="id" label="Operations">
      <el-button type="primary" size="small" @click="Edit(lists)" >Edit</el-button>
      <el-button type="danger" size="small" v-bind:id="lists.id" @click="Delete(lists.id)" 
      >Delete</el-button>
     
    </el-table-column>
  </el-table> -->

  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">first_name</th>
        <th scope="col">last_name</th>
        <th scope="col">email</th>
        <th scope="col">images</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(list, index) in lists" :key="index">
        <th scope="row">{{ index+ 1 }}</th>
        <td>{{ list.first_name }}</td>
        <td>{{ list.last_name }}</td>
        <td>{{ list.email }}</td>
        <td><img class="images" :src="list.avatar"></td>
        <td>
          <!-- <router-link :to="'/edit/' + list.id" class="btn btn-success"
            >update</router-link> -->

          <!-- <el-button type="text" @click="Edit(list.id); outerVisible = true;">Update</el-button> -->
          <el-icon class="pointer-cursor" @click="Edit(list.id); outerVisible = true;"><Edit /></el-icon>
        </td>
        <td>
          <el-icon v-on:click="Delete(list.id)"><Delete /></el-icon>
          <!-- <button class="btn btn-danger" v-on:click="Delete(list.id)">delete</button> -->
        </td>
      </tr>
    </tbody>
  </table>

  <el-dialog v-model="outerVisible" title="Update forms">
    <template #default>
      <form>
        <label>FirstName: </label>
        <input type="text" placeholder="Enter first Name" v-model="users.first_name" /><br /><br />
        <label>LastName: </label>
        <input type="text" placeholder="Enter last Name" v-model="users.last_name" /><br /><br />
        <label>Email: </label>
        <input type="text" placeholder="Enter Email" v-model="users.email" />
      </form>
      <h4 v-if="loading">Loading...</h4>

    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="outerVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateData()">
          Update
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
   import axios from "axios";
   export default {
   name: "table_co",
  data() {
    return {
      total: 0,
      lists: [],
      cId: '',
      outerVisible: false,
      innerVisible: false,
      users: {
        first_name: "",
        last_name: "",
        email: "",
      },
      loading: false,
    };
  },

  async mounted() {
    this.getData()
  },

  methods: {
    async getData() {
      let result = await axios.get("http://localhost:3000/data/");
      this.lists = result.data;
      this.total = this.lists.length;
    },

    Delete(id) {
      let currentId = id;
      let result = axios.delete("http://localhost:3000/data/" + currentId);
      this.lists = result.data;
      this.$notify.error({
        title: 'Error',
        message: 'record deleted successfully',
      });
      this.getData();
    },

    async Edit(id) {
      localStorage.setItem("Id", id)
      let usrData = await axios.get("http://localhost:3000/data/" + id);
      this.users = usrData.data;
    },

    async updateData() {
      this.loading = true;
      let norId = localStorage.getItem("Id")
      const result = await axios.put(
        "http://localhost:3000/data/" + norId,
        {
          first_name: this.users.first_name,
          last_name: this.users.last_name,
          email: this.users.email,
        }
      );
      if (result.status === 200) {
        this.$notify({
          title: 'Success',
          message: 'Record updated successfully..',
          type: 'success'
        });
        this.outerVisible = false;
      }
      this.getData();
      this.$router.push("/table?");
    },
  },
}
</script>

<style>
.images {
  width: 50px;
}

.el-icon svg {
  cursor: pointer;
}
</style>
