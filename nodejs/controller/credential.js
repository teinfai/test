const smtp = require("../helper/smtp")
const db = require("../model/database")
const { helper: hlp } = require("../helper/helper");
const helper = new hlp();



exports.signup = async function (req, res) {

  // const abc = ['s', 'd', 'l', 'c'];

  if (req.body.username === undefined || req.body.username == "") {
    return res.status(400).send("username is empty");
  }

  if (req.body.password === undefined || req.body.password == "") {
    return res.status(400).send("password is empty");
  }

  if (req.body.role === undefined || req.body.role == "") {
    return res.status(400).send("role is empty");
  }

  // console.log(req.body);
  const password = helper.hash_password(req.body.password);
  const select_query = `SELECT * FROM  User where username = '${req.body.username}'`;


  const select = await db.raw_query(select_query).catch(err => {
    let info_response = {
      'status': 400,
      'data': [],
      'msg': 'Fail to get data'
    }
    return res.status(400).send(info_response);
  })


  if (select.length === 0) {

    const insert_query = `INSERT INTO User (username,password,role,created_by,created_at) VALUES ('${req.body.username}','${password}','${req.body.role}','${req.body.username}','${helper.getDate()}')`
    // console.log(insert_query);
    // process.exit();
    const insert = await db.raw_query(insert_query).catch(err => {
      let info_response = {
        'status': 400,
        'data': [],
        'msg': 'Fail to create user'
      }
      return res.status(400).send(info_response);
    })

    info_response = {
      'status': 200,
      'data': insert,
      'msg': "REGISTER_SUCCESSFUL"
    }
    return res.status(200).send(info_response);

  } else {
    let info_response = {
      'status': 400,
      'data': [],
      'msg': 'User_exist'
    }
    return res.status(400).send(info_response);
  }

}



