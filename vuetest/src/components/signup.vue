<template>
  <div class="container">

    <h1>Sign up</h1>
    <form role="form" class="text-start" v-on:submit.prevent="signup">
      <div class="row justify-content-center">
        <div class="col-7">
          <div class="card p-5 mt-3 rounded">
            <div class="col-12 text-start">
              <label for="user_name" class="form-label">User Name</label>
              <input type="text" required class="form-control" placeholder="Username" name="username" id="user_name"
                aria-describedby="emailHelp">
            </div>
            <div class="col-12 text-start mb-5">
              <label for="exampleInputPassword1" class="form-label mt-4">Password</label>
              <input type="password" required class="form-control" placeholder="Password" name="password"
                id="exampleInputPassword1">
            </div>

            <select class="form-select" name="role" aria-label="Default select example">
              <option value="1">SuperAdmin</option>
              <option value="2">Admin</option>
              <option value="3">User</option>
            </select>

            <!-- <Dropdown v-model="roles.selectedrole" :options="roles.role" optionLabel="name" placeholder="Select a Role"
              :required="true" class="w-full md:w-14rem" />
            <div v-if="!roles.selectedrole"> Please Choose at least one option before Submit </div> -->


            <div class="mt-5 row justify-content-between">
              <div class="col-3 text-end">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>

              <div class="col-3">
                <router-link to="/signup">
                  <button class="btn btn-primary">Signup</button>
                </router-link>
              </div>
            </div>
            <Toast ref="toast" :position="position" />
          </div>
        </div>
      </div>
    </form>
  </div>

</template>

<script>
import axios from 'axios';
import Dropdown from 'primevue/dropdown';

export default {
  data() {
    return {
      // roles: {
      //   selectedrole: null,
      //   role: [
      //     { name: 'SuperAdmin', value: '1' },
      //     { name: 'Admin', value: '2' },
      //     { name: 'User', value: '3' },
      //   ]
      // },
    }
  },
  components: {
    Dropdown,
  },

  methods: {
    signup(e) {

      let body = {
        "username": e.target.elements.username.value,
        "password": e.target.elements.password.value,
        "role": e.target.elements.role.value,
      }

      console.log(body);

      axios.post('http://127.0.0.1:4444/router_v2/signup', body)
        .then(data => {
          console.log(data);

          if (data.data.status == 200) {
            this.showToast("success", 'Congratualation', 'Register Successful');
          } else {
            this.showToast("error", 'Something Went Wrong', 'Please Contact Customer Service');

          }

        })
        .catch(function (error) {
          this.showToast("error", 'Something Went Wrong', 'Please Contact Customer Service');
        })
    },
    showToast(type, title, msg) {
      this.$refs.toast.add({
        severity: type,
        summary: title,
        detail: msg,
        life: 3000,
      });
    },
    // submit_update() {
    //   axios.post('http://127.0.0.1:4444/router_v2/update', this.form)
    //     // .then(response => alert('Wahoo!'))
    //     .then(function (response) {
    //       console.log(response.data)
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     })
    //   //postStatus();
    // },
    // table_render() {
    //   axios.post('http://127.0.0.1:4444/router_v2/get_data', this.form)
    //     // .then(response => alert('Wahoo!'))
    //     .then(data => {

    //       this.datas = data.data;
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     })
    // },
    // submit_delete() {
    //   axios.post('http://127.0.0.1:4444/router_v2/delete', this.form)
    //     // .then(response => alert('Wahoo!'))
    //     .then(response => {
    //       console.log(response.data)
    //       this.table_render();

    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     })
    //   //postStatus();
    // },





  },


}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
