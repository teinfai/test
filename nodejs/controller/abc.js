const smtp = require("../helper/smtp")
const db = require("../model/database")
const { helper: hlp } = require("../helper/helper");
const helper = new hlp();


exports.create_user = async function (req, res) {



  if (req.body.name === undefined || req.body.name === "") {

    let info_response = {
      'msg': 'Name is empty!'
    }
    return res.status(400).send(info_response);
  }

  if (req.body.password === undefined || req.body.password === "") {

    let info_response = {
      'msg': 'password is empty!'
    }
    return res.status(400).send(info_response);
  }


  if (req.body.role === undefined || req.body.role === "") {

    let info_response = {
      'msg': 'role is empty!'
    }
    return res.status(400).send(info_response);
  }


  const password = helper.hash_password(req.body.password);
  const select_query = `SELECT * FROM  User where name = '${req.body.name}'`;

  // console.log(select_query);
  // process.exit();
  // const select = await db.raw_query(select_query)


  const select = await db.raw_query(select_query).catch(err => {
    let info_response = {
      'status': 400,
      'data': [],
      'msg': 'Fail to get data'
    }
    return res.status(400).send(info_response);
  })


  if (select.length === 0) {

    const insert_query = `INSERT INTO User (name,password,role) VALUES ('${req.body.name}','${password}','${req.body.role}')`

    const insert = await db.raw_query(insert_query).catch(err => {
      let info_response = {
        'status': 400,
        'data': [],
        'msg': 'Fail to create user'
      }
      return res.status(400).send(info_response);
    })

  } else {
    let info_response = {
      'status': 400,
      'data': [],
      'msg': 'User_exist'
    }
    return res.status(400).send(info_response);
  }

  // helper.hash_password(req.body.password);

  info_response = {
    'status': 200,
    'data': insert,
    'msg': "GET_SUCCESS"
  }
  return res.status(200).send(info_response);




  console.log(insert);
  process.exit();
  // const data = encodeURI(`gino.lim@onesoftlab.com`)
  // const encrypted = helper.enc_dec('encrypt', data)
  // console.log(helper.enc_dec('encrypt', data))
  // console.log(helper.enc_dec('decrypt', encrypted))
  // console.log(`UPDATE user SET email = '${helper.enc_dec('decrypt', encrypted)}'`)

  // const insert_query = `INSERT INTO testing (name) VALUES ('${req.body.first_name}')`
  // const insert = await db.raw_query(insert_query)
  // let abc = insert
  // const select_query = `SELECT * FROM testing where id = ${insert.insertId} limit 1 offset 0`;
  // const select = await db.raw_query(select_query)


  // const update_query = `UPDATE testing SET name = 'mcd' where id = ${select[0].id}`;
  // const update = await db.raw_query(update_query)

  // console.log();
  // const insert_query = `INSERT INTO testing (name) VALUES ('kfc')`
  // const insert = await db.raw_query(insert_query)

  return res.status(200).send("insert_done");




}

exports.signin = async function (req, res) {

  // const abc = ['s', 'd', 'l', 'c'];

  // const select_query = `SELECT * FROM User where username = '${req.body.name}' and password = '${req.body.password}' limit 1 offset 0`;


  if (req.body.name === undefined || req.body.name === "") {

    let info_response = {
      'msg': 'Name is empty!'
    }
    return res.status(400).send(info_response);
  }

  if (req.body.password === undefined || req.body.password === "") {

    let info_response = {
      'msg': 'password is empty!'
    }
    return res.status(400).send(info_response);
  }


  const password = helper.hash_password(req.body.password);

  const select_query = `SELECT User.*, Role_table.position FROM User JOIN Role_table ON User.role = Role_table.id Where User.name = '${req.body.name}' and User.password = '${password}' limit 1 offset 0`

  // console.log(select_query);
  // process.exit();
  const select = await db.raw_query(select_query).catch(err => {
    let info_response = {
      'status': 400,
      'data': [],
      'msg': 'Fail to get user'
    }
    return res.status(400).send(info_response);
  })
  const gentoken = helper.testgen(select[0].id);
  select[0]['logintoken'] = gentoken
cons
  if (select.length === 0) {
    let info_response = {
      'status': 200,
      'data': [],
      'msg': 'No this account'
    }
    return res.status(200).send(info_response);
  }

  info_response = {
    'status': 200,
    'data': select,
    'msg': "GET_SUCCESS"
  }
  return res.status(200).send(info_response);



  // console.log(insert);

  process.exit();
  // const data = encodeURI(`gino.lim@onesoftlab.com`)
  // const encrypted = helper.enc_dec('encrypt', data)
  // console.log(helper.enc_dec('encrypt', data))
  // console.log(helper.enc_dec('decrypt', encrypted))
  // console.log(`UPDATE user SET email = '${helper.enc_dec('decrypt', encrypted)}'`)

  // const insert_query = `INSERT INTO testing (name) VALUES ('${req.body.first_name}')`
  // const insert = await db.raw_query(insert_query)
  // let abc = insert
  // const select_query = `SELECT * FROM testing where id = ${insert.insertId} limit 1 offset 0`;
  // const select = await db.raw_query(select_query)


  // const update_query = `UPDATE testing SET name = 'mcd' where id = ${select[0].id}`;
  // const update = await db.raw_query(update_query)

  // console.log();
  // const insert_query = `INSERT INTO testing (name) VALUES ('kfc')`
  // const insert = await db.raw_query(insert_query)

  return res.status(200).send("insert_done");




}

exports.update = async function (req, res) {

  // console.log(req.body);
  // process.exit();

  if (req.body.table_name === undefined || req.body.table_name === "") {
    let info_response = {
      'msg': 'table_name is empty!'
    }
    return res.status(400).send(info_response);

  }

  if (req.body.data_name === undefined || req.body.data_name === "") {

    let info_response = {
      'msg': 'data_name is empty!'
    }
    return res.status(400).send(info_response);

  }

  if (req.body.data_data === undefined || req.body.data_data === "") {

    let info_response = {
      'msg': 'data_data is empty!'
    }
    return res.status(400).send(info_response);
  }

  if (req.body.data_id === undefined || req.body.data_id === "") {
    let info_response = {
      'msg': 'data_id is empty!'
    }
    return res.status(400).send(info_response);
  }



  if (req.body.role != 3) {
    const update_query = `UPDATE ${req.body.table_name} SET ${req.body.data_name} = '${req.body.data_data}' where id = ${req.body.data_id}`;

    const update = await db.raw_query(update_query).catch(err => {
      let info_response = {
        'status': 400,
        'data': [],
        'msg': 'Update Unsuccessful'
      }
      return res.status(400).send(info_response);
    })


    info_response = {
      'status': 200,
      'data': update,
      'msg': "Update Sucess"
    }
    return res.status(200).send(info_response);
  } else {
    let info_response = {
      'status': 400,
      'data': [],
      'msg': 'Role Not Allow'
    }
    return res.status(400).send(info_response);
  }
  // console.log();
  // const insert_query = `INSERT INTO testing (name) VALUES ('kfc')`
  // const insert = await db.raw_query(insert_query)



}

exports.delete = async function (req, res) {

  // console.log(req.body);
  // process.exit();
  // const data = encodeURI(`gino.lim@onesoftlab.com`)
  // const encrypted = helper.enc_dec('encrypt', data)
  // console.log(helper.enc_dec('encrypt', data))
  // console.log(helper.enc_dec('decrypt', encrypted))
  // console.log(`UPDATE user SET email = '${helper.enc_dec('decrypt', encrypted)}'`)

  if (req.body.table_name === undefined || req.body.table_name === "") {
    let info_response = {
      'msg': 'table_name is empty!'
    }
    return res.status(400).send(info_response);
  }

  if (req.body.data_id === undefined || req.body.data_id === "") {
    let info_response = {
      'msg': 'data_id is empty!'
    }
    return res.status(400).send(info_response);
  }



  if (req.body.role == 1) {
    const delete_query = `DELETE FROM ${req.body.table_name} WHERE id = ${req.body.data_id}`
    // const del = await db.raw_query(delete_query)


    const del = await db.raw_query(delete_query).catch(err => {
      let info_response = {
        'status': 400,
        'data': [],
        'msg': 'Delete Unsucccessful'
      }
      return res.status(400).send(info_response);
    })




    info_response = {
      'status': 200,
      'data': del,
      'msg': "Update Sucess"
    }
    return res.status(200).send(info_response);

  } else {
    let info_response = {
      'status': 400,
      'data': [],
      'msg': 'Role Not Allow'
    }
    return res.status(400).send(info_response);
  }



}

exports.get_data = async function (req, res) {

  // console.log(req.body);
  // process.exit();
  if (req.body.table_name === undefined || req.body.table_name === "") {
    let info_response = {
      'msg': 'table_name is empty!'
    }
    return res.status(400).send(info_response);
  }

  if (req.body.data_id === undefined || req.body.data_id === "") {
    let info_response = {
      'msg': 'data_id is empty!'
    }
    return res.status(400).send(info_response);
  }

  const select_query = `SELECT * FROM  ${req.body.table_name} where id = ${req.body.data_id}`;
  // const select = await db.raw_query(select_query)


  const select = await db.raw_query(select_query).catch(err => {
    let info_response = {
      'status': 400,
      'data': [],
      'msg': 'Fail to get data'
    }
    return res.status(400).send(info_response);
  })

  if (select.length === 0) {
    let info_response = {
      'status': 200,
      'data': [],
      'msg': 'No data'
    }
    return res.status(200).send(info_response);
  }


  info_response = {
    'status': 200,
    'data': select,
    'msg': "Get Sucess"
  }
  return res.status(200).send(info_response);


}

