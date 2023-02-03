<template>
  <h3>its a Update components</h3>

  <div class="col-md-6">
    <form>
      <label>FirstName: </label>
      <input
        type="text"
        placeholder="Enter first Name"
        v-model="users.first_name"
      /><br /><br />
      <label>LastName: </label>
      <input
        type="text"
        placeholder="Enter last Name"
        v-model="users.last_name"
      /><br /><br />
      <label>Email: </label>
      <input type="text" placeholder="Enter Email" v-model="users.email" />
    </form>
    <button class="btn btn-primary" v-on:click="updateData()">Submit</button>
    <h4 v-if="loading">Loading...</h4>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "edit_co",
  data() {
    return {
      
      lists: [],
      users: {
        first_name: "",
        last_name: "",
        email: "",
      },
      loading: false,
    };
  },

  methods: {
    async updateData() {
      this.loading = true;
      const result = await axios.put(
        "http://localhost:3000/data/" + this.$route.params.id,
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
        // alert("record updated successfully.....");
        //this.$toasted.show('Successfully updated...')
        this.$router.push("/table?");
      }
    },

           
   

     

    // async getData() {
    //   let result = await axios.get("http://localhost:3000/data");
    //   this.lists = result.data;
    // },
  },

 
 

  async mounted() {
    //this.getData();
    console.log("current updated id is:", this.$route.params.id);
    let result = await axios.get(
      "http://localhost:3000/data/" + this.$route.params.id
    );
    // this.users.first_name = result.data.first_name;
    this.users = result.data;
    console.log("Specific data is:", this.lists);
  },
};
</script>
