<template>
  <div class="container">

    <h1>Sign In</h1>
    <form role="form" @submit.prevent="submit_form()">
      <div class="row justify-content-center">
        <div class="col-7">
          <div class="card p-5 mt-3 rounded">
            <div class="col-12 text-start">
              <label for="user_name" class="form-label">User Name</label>
              <input type="text" required class="form-control" v-model="username" id="user_name"
                aria-describedby="emailHelp">
            </div>
            
            <div class="col-12 text-start mb-5">
              <label for="exampleInputPassword1" class="form-label mt-4">Password</label>
              <input type="password" required class="form-control" v-model="password" id="exampleInputPassword1">
            </div>

            <select class="form-select" v-model="role">
              <option value="1">SuperAdmin</option>
              <option value="2">Admin</option>
              <option value="3">User</option>
            </select>

            <div class="col-12 text-start my-3 form-check">
              <input type="checkbox" required class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>

            <div class="row justify-content-between">
              <div class="col-5">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>

              <div class="col-5">
                <router-link to="/signup">
                  <button class="btn btn-primary">Signup</button>
                </router-link>
              </div>

            </div>

          </div>
        </div>
      </div>
    </form>
  </div>

</template>

<script>
// import axios from 'axios';


export default {
  data() {
    return {
      form: {
        name: '',
        password: '',
      },

    }
  },
  components: {
  },
  // mounted() {

  //   axios.post('http://127.0.0.1:4444/router_v2/get_data', this.form)
  //     // .then(response => alert('Wahoo!'))
  //     .then(data => {
  //       // error
  //       // arrow
  //       // console.log(response.data);
  //       console.log(data.data);
  //       this.datas = data.data;
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })

  // },

  methods: {
    submit_form() {



      // axios.post('http://127.0.0.1:4444/router_v2/update', this.form)
      //   .then(function (response) {
      //     console.log(response.data)
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   })
    },
  },


}


</script>

