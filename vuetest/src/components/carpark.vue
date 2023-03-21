<template>
  <div class="container">

    <div class="row">
      <div class="col-12 text-start">
        <h5>SMALL</h5>
      </div>
      <div class="col-12 text-start">
        <p class="mb-0">HIGHEST ( {{ small.small_display_highest_totallotsavailable }} lots) available</p>
        <span v-for="(small_detail, index) in small.small_display_highest_name" class="mb-0"> {{ small_detail + " "}}</span>
        <p class="mb-0">Lowest ( {{ small.small_display_smallest_totallotsavailable }} lots) available</p>
        <span v-for="(small_detail, index) in small.small_display_lowest_name" class="mb-0"> {{ small_detail + " "}}</span>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-12 text-start">
        <h5>Medium</h5>
      </div>
      <div class="col-12 text-start">
        <p class="mb-0">HIGHEST ( {{ medium.medium_display_highest_totallotsavailable }} lots) available</p>
        <span v-for="(medium_detail, index) in medium.medium_display_highest_name" class="mb-0"> {{ medium_detail + " "}}</span>
        <p class="mb-0">Lowest ( {{ medium.medium_display_smallest_totallotsavailable }} lots) available</p>
        <span v-for="(medium_detail, index) in medium.medium_display_lowest_name" class="mb-0"> {{ medium_detail + " "}}</span>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-12 text-start">
        <h5>Big</h5>
      </div>
      <div class="col-12 text-start">
        <p class="mb-0">HIGHEST ( {{ big.big_display_highest_totallotsavailable }} lots) available</p>
        <span v-for="(big_detail, index) in big.big_display_highest_name" class="mb-0"> {{ big_detail + " " }}</span>
        <p class="mb-0">Lowest ( {{ big.big_display_smallest_totallotsavailable }} lots) available</p>
        <span v-for="(big_detail, index) in big.big_display_lowest_name" class="mb-0"> {{ big_detail + " " }}</span>
      </div>
      <div class="col-12"></div>
    </div>

    <div class="row mt-5">
      <div class="col-12 text-start">
        <h5>Large</h5>
      </div>
      <div class="col-12 text-start">
        <p class="mb-0">HIGHEST ( {{ large.large_display_highest_totallotsavailable }} lots) available</p>
        <span v-for="(large_detail, index) in large.large_display_highest_name" class="mb-0"> {{ large_detail + " "
        }}</span>
        <p class="mb-0">Lowest ( {{ large.large_display_smallest_totallotsavailable }} lots) available</p>
        <span v-for="(large_detail, index) in large.large_display_lowest_name" class="mb-0"> {{ large_detail + " "
        }}</span>
      </div>
      <div class="col-12"></div>
    </div>

  </div>

</template>

<script>
import axios from 'axios';


export default {
  data() {
    return {
      small: {
        small_display_highest_name: [],
        small_display_highest_totallotsavailable: '',
        small_display_lowest_name: [],
        small_display_smallest_totallotsavailable: '',
      },
      medium: {
        medium_display_highest_name: [],
        medium_display_highest_totallotsavailable: '',
        medium_display_lowest_name: [],
        medium_display_smallest_totallotsavailable: '',
      },
      big: {
        big_display_highest_name: [],
        big_display_highest_totallotsavailable: '',
        big_display_lowest_name: [],
        big_display_smallest_totallotsavailable: '',
      },
      large: {
        large_display_highest_name: [],
        large_display_highest_totallotsavailable: '',
        large_display_lowest_name: [],
        large_display_smallest_totallotsavailable: '',
      },


    }
  },
  components: {
  },

  created() {
    this.small_display();
    this.medium_display();
    this.big_display();
    this.large_display();
    setInterval(() => {
      this.small_display();
      this.medium_display();
      this.big_display();
      this.large_display();
    }, 60000);
  },
  methods: {
    small_display() {
      axios.get('http://127.0.0.1:4444/router_v2/display_small')
        .then(data => {
          // console.log(data.data);
          this.small.small_display_highest_name = data.data.small_display_highest_name
          this.small.small_display_highest_totallotsavailable = data.data.small_display_highest_totallotsavailable
          this.small.small_display_lowest_name = data.data.small_display_lowest_name
          this.small.small_display_smallest_totallotsavailable = data.data.small_display_smallest_totallotsavailable

        })
        .catch(function (error) {
        })
    },
    medium_display() {
      axios.get('http://127.0.0.1:4444/router_v2/display_medium')
        .then(data => {
          // console.log(data.data);
          this.medium.medium_display_highest_name = data.data.medium_display_highest_name
          this.medium.medium_display_highest_totallotsavailable = data.data.medium_display_highest_totallotsavailable
          this.medium.medium_display_lowest_name = data.data.medium_display_lowest_name
          this.medium.medium_display_smallest_totallotsavailable = data.data.medium_display_smallest_totallotsavailable
        })
        .catch(function (error) {
        })
    },
    big_display() {
      axios.get('http://127.0.0.1:4444/router_v2/display_big')
        .then(data => {
          // console.log(data.data);
          this.big.big_display_highest_name = data.data.big_display_highest_name
          this.big.big_display_highest_totallotsavailable = data.data.big_display_highest_totallotsavailable
          this.big.big_display_lowest_name = data.data.big_display_lowest_name
          this.big.big_display_smallest_totallotsavailable = data.data.big_display_smallest_totallotsavailable
        })
        .catch(function (error) {
        })
    },
    large_display() {
      axios.get('http://127.0.0.1:4444/router_v2/display_large')
        .then(data => {
          // console.log(data);
          // console.log(data.data);
          this.large.large_display_highest_name = data.data.large_display_highest_name
          this.large.large_display_highest_totallotsavailable = data.data.large_display_highest_totallotsavailable
          this.large.large_display_lowest_name = data.data.large_display_lowest_name
          this.large.large_display_smallest_totallotsavailable = data.data.large_display_smallest_totallotsavailable
        })
        .catch(function (error) {
        })
    },

  }
}


</script>

