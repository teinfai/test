const smtp = require("../helper/smtp")
const db = require("../model/database")
const { helper: hlp } = require("../helper/helper");
const helper = new hlp();
const request = require('request');
const axios = require('axios');


exports.display_small = async function (req, res) {



  const apiUrl = 'https://api.data.gov.sg/v1/transport/carpark-availability';

  // define your parameters as an object
  const params = {
    date_time: helper.getDate(),
  };

  // console.log(params);
  // make the API call with the parameters
  axios.get(apiUrl, { json: true }, { params })
    .then(response => {
      // console.log(response.data);

      const carparkData = response.data.items[0].carpark_data;

      // return res.status(200).send(carparkData);
      let small = [];
      let medium = [];
      let big = [];
      let large = [];

      for (const iterator of carparkData) {
        // console.log(iterator.carpark_info);

        const array = iterator.carpark_info;
        var totallotsavailable = 0;
        array.forEach(function (item, index) {
          // console.log(item);
          totallotsavailable += parseInt(item.lots_available);
        });

        if (totallotsavailable < 100) {
          iterator["cateogries"] = "small";
          iterator["totallotsavailable"] = totallotsavailable;
          small.push(iterator)
        } else if (totallotsavailable >= 100 && totallotsavailable < 300) {
          iterator["cateogries"] = "medium";
          iterator["totallotsavailable"] = totallotsavailable;
          medium.push(iterator)
        } else if (totallotsavailable >= 300 && totallotsavailable < 400) {
          iterator["cateogries"] = "big";
          iterator["totallotsavailable"] = totallotsavailable;
          big.push(iterator)
        } else if (totallotsavailable >= 400 && totallotsavailable > 400) {
          iterator["cateogries"] = "large";
          iterator["totallotsavailable"] = totallotsavailable;
          large.push(iterator)
        }
      }

      let small_highest = [];
      let small_lowest = [];

      function finder(cmp, arr, getter) {
        var val = getter(arr[0]);
        for (var i = 1; i < arr.length; i++) {
          val = cmp(val, getter(arr[i]))
        }
        return val;
      }
      // console.log(small.carpark_info);
      const small_max = finder(Math.max, small, function (x) { return x.carpark_info[0].lots_available; });
      const small_min = finder(Math.min, small, function (x) { return x.carpark_info[0].lots_available; });

      for (const iterator of small) {
        // console.log(iterator.carpark_info[0].total_lots);
        if (iterator.carpark_info[0].lots_available == small_max) {
          // iterator.carpark_info[0]["cateogries"] = "small";
          small_highest.push(iterator)
        } else if (iterator.carpark_info[0].lots_available == small_min) {
          small_lowest.push(iterator)
        }
      }


      let small_display_highest_name = [];
      let small_display_lowest_name = [];
      let small_display_highest_totallotsavailable = small_max;
      let small_display_smallest_totallotsavailable = small_min;

      for (const iterator of small_highest) {
        small_display_highest_name.push(iterator.carpark_number);
      }

      for (const iterator of small_lowest) {
        small_display_lowest_name.push(iterator.carpark_number);
      }

      const info_response = {
        small_display_highest_name: small_display_highest_name,
        small_display_highest_totallotsavailable: small_display_highest_totallotsavailable,
        small_display_smallest_totallotsavailable: small_display_smallest_totallotsavailable,
        small_display_lowest_name: small_display_lowest_name
      }


      return res.status(200).send(info_response);

    })
    .catch(error => {
      console.log(error);
    });




}

exports.display_medium = async function (req, res) {
  const apiUrl = 'https://api.data.gov.sg/v1/transport/carpark-availability';

  // define your parameters as an object
  const params = {
    date_time: helper.getDate(),
  };

  // console.log(params);


  // make the API call with the parameters
  axios.get(apiUrl, { json: true }, { params })
    .then(response => {
      // console.log(response.data);

      const carparkData = response.data.items[0].carpark_data;

      // return res.status(200).send(carparkData);
      let small = [];
      let medium = [];
      let big = [];
      let large = [];

      for (const iterator of carparkData) {
        // console.log(iterator.carpark_info);

        const array = iterator.carpark_info;
        var totallotsavailable = 0;
        array.forEach(function (item, index) {
          // console.log(item);
          totallotsavailable += parseInt(item.lots_available);
        });

        if (totallotsavailable < 100) {
          iterator["cateogries"] = "small";
          iterator["totallotsavailable"] = totallotsavailable;
          small.push(iterator)
        } else if (totallotsavailable >= 100 && totallotsavailable < 300) {
          iterator["cateogries"] = "medium";
          iterator["totallotsavailable"] = totallotsavailable;
          medium.push(iterator)
        } else if (totallotsavailable >= 300 && totallotsavailable < 400) {
          iterator["cateogries"] = "big";
          iterator["totallotsavailable"] = totallotsavailable;
          big.push(iterator)
        } else if (totallotsavailable >= 400 && totallotsavailable > 400) {
          iterator["cateogries"] = "large";
          iterator["totallotsavailable"] = totallotsavailable;
          large.push(iterator)
        }
      }


      let medium_highest = [];
      let medium_lowest = [];


      function finder(cmp, arr, getter) {
        var val = getter(arr[0]);
        for (var i = 1; i < arr.length; i++) {
          val = cmp(val, getter(arr[i]))
        }
        return val;
      }
      const medium_max = finder(Math.max, medium, function (x) { return x.carpark_info[0].lots_available; });
      const medium_min = finder(Math.min, medium, function (x) { return x.carpark_info[0].lots_available; });

      for (const iterator of medium) {
        if (iterator.carpark_info[0].lots_available == medium_max) {
          medium_highest.push(iterator)
        } else if (iterator.carpark_info[0].lots_available == medium_min) {
          medium_lowest.push(iterator)
        }
      }


      let medium_display_highest_name = [];
      let medium_display_lowest_name = [];
      let medium_display_highest_totallotsavailable = medium_max;
      let medium_display_smallest_totallotsavailable = medium_min;






      for (const iterator of medium_highest) {
        medium_display_highest_name.push(iterator.carpark_number);
      }

      for (const iterator of medium_lowest) {
        medium_display_lowest_name.push(iterator.carpark_number);
      }

      const info_response = {
        medium_display_highest_name: medium_display_highest_name,
        medium_display_highest_totallotsavailable: medium_display_highest_totallotsavailable,
        medium_display_smallest_totallotsavailable: medium_display_smallest_totallotsavailable,
        medium_display_lowest_name: medium_display_lowest_name
      }





      return res.status(200).send(info_response);



    })
    .catch(error => {
      console.log(error);
    });




}

exports.display_big = async function (req, res) {
  const apiUrl = 'https://api.data.gov.sg/v1/transport/carpark-availability';

  // define your parameters as an object
  const params = {
    date_time: helper.getDate(),
  };

  // console.log(params);


  // make the API call with the parameters
  axios.get(apiUrl, { json: true }, { params })
    .then(response => {
      // console.log(response.data);

      const carparkData = response.data.items[0].carpark_data;

      // return res.status(200).send(carparkData);
      let small = [];
      let medium = [];
      let big = [];
      let large = [];

      for (const iterator of carparkData) {
        // console.log(iterator.carpark_info);

        const array = iterator.carpark_info;
        var totallotsavailable = 0;
        array.forEach(function (item, index) {
          // console.log(item);
          totallotsavailable += parseInt(item.lots_available);
        });

        if (totallotsavailable < 100) {
          iterator["cateogries"] = "small";
          iterator["totallotsavailable"] = totallotsavailable;
          small.push(iterator)
        } else if (totallotsavailable >= 100 && totallotsavailable < 300) {
          iterator["cateogries"] = "medium";
          iterator["totallotsavailable"] = totallotsavailable;
          medium.push(iterator)
        } else if (totallotsavailable >= 300 && totallotsavailable < 400) {
          iterator["cateogries"] = "big";
          iterator["totallotsavailable"] = totallotsavailable;
          big.push(iterator)
        } else if (totallotsavailable >= 400 && totallotsavailable > 400) {
          iterator["cateogries"] = "large";
          iterator["totallotsavailable"] = totallotsavailable;
          large.push(iterator)
        }
      }


      let big_highest = [];
      let big_lowest = [];


      function finder(cmp, arr, getter) {
        var val = getter(arr[0]);
        for (var i = 1; i < arr.length; i++) {
          val = cmp(val, getter(arr[i]))
        }
        return val;
      }
      const big_max = finder(Math.max, big, function (x) { return x.carpark_info[0].lots_available; });
      const big_min = finder(Math.min, big, function (x) { return x.carpark_info[0].lots_available; });

      for (const iterator of big) {
        if (iterator.carpark_info[0].lots_available == big_max) {
          big_highest.push(iterator)
        } else if (iterator.carpark_info[0].lots_available == big_min) {
          big_lowest.push(iterator)
        }
      }


      let big_display_highest_name = [];
      let big_display_lowest_name = [];
      let big_display_highest_totallotsavailable = big_max;
      let big_display_smallest_totallotsavailable = big_min;

      for (const iterator of big_highest) {
        big_display_highest_name.push(iterator.carpark_number);
      }

      for (const iterator of big_lowest) {
        big_display_lowest_name.push(iterator.carpark_number);
      }

      const info_response = {
        big_display_highest_name: big_display_highest_name,
        big_display_highest_totallotsavailable: big_display_highest_totallotsavailable,
        big_display_smallest_totallotsavailable: big_display_smallest_totallotsavailable,
        big_display_lowest_name: big_display_lowest_name
      }
      return res.status(200).send(info_response);
    })
    .catch(error => {
      console.log(error);
    });




}

exports.display_large = async function (req, res) {
  const apiUrl = 'https://api.data.gov.sg/v1/transport/carpark-availability';

  // define your parameters as an object
  const params = {
    date_time: helper.getDate(),
  };

  // console.log(params);


  // make the API call with the parameters
  axios.get(apiUrl, { json: true }, { params })
    .then(response => {
      // console.log(response.data);

      const carparkData = response.data.items[0].carpark_data;

      // return res.status(200).send(carparkData);
      let small = [];
      let medium = [];
      let big = [];
      let large = [];

      for (const iterator of carparkData) {
        // console.log(iterator.carpark_info);

        const array = iterator.carpark_info;
        var totallotsavailable = 0;
        array.forEach(function (item, index) {
          // console.log(item);
          totallotsavailable += parseInt(item.lots_available);
        });

        if (totallotsavailable < 100) {
          iterator["cateogries"] = "small";
          iterator["totallotsavailable"] = totallotsavailable;
          small.push(iterator)
        } else if (totallotsavailable >= 100 && totallotsavailable < 300) {
          iterator["cateogries"] = "medium";
          iterator["totallotsavailable"] = totallotsavailable;
          medium.push(iterator)
        } else if (totallotsavailable >= 300 && totallotsavailable < 400) {
          iterator["cateogries"] = "big";
          iterator["totallotsavailable"] = totallotsavailable;
          big.push(iterator)
        } else if (totallotsavailable >= 400 && totallotsavailable > 400) {
          iterator["cateogries"] = "large";
          iterator["totallotsavailable"] = totallotsavailable;
          large.push(iterator)
        }
      }


      let large_highest = [];
      let large_lowest = [];


      function finder(cmp, arr, getter) {
        var val = getter(arr[0]);
        for (var i = 1; i < arr.length; i++) {
          val = cmp(val, getter(arr[i]))
        }
        return val;
      }
      const large_max = finder(Math.max, large, function (x) { return x.carpark_info[0].lots_available; });
      const large_min = finder(Math.min, large, function (x) { return x.carpark_info[0].lots_available; });

      for (const iterator of large) {
        if (iterator.carpark_info[0].lots_available == large_max) {
          large_highest.push(iterator)
        } else if (iterator.carpark_info[0].lots_available == large_min) {
          large_lowest.push(iterator)
        }
      }


      let large_display_highest_name = [];
      let large_display_lowest_name = [];
      let large_display_highest_totallotsavailable = large_max;
      let large_display_smallest_totallotsavailable = large_min;






      for (const iterator of large_highest) {
        large_display_highest_name.push(iterator.carpark_number);
      }

      for (const iterator of large_lowest) {
        large_display_lowest_name.push(iterator.carpark_number);
      }

      const info_response = {
        large_display_highest_name: large_display_highest_name,
        large_display_highest_totallotsavailable: large_display_highest_totallotsavailable,
        large_display_smallest_totallotsavailable: large_display_smallest_totallotsavailable,
        large_display_lowest_name: large_display_lowest_name
      }





      return res.status(200).send(info_response);



    })
    .catch(error => {
      console.log(error);
    });




}







