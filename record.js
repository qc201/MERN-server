const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("newstopics");
  db_connect
    .collection("records") //table的名字叫records
    .find({})
    .sort("_id", "descending") //尋找全部在這個table里的內容
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result); //將fatch的內容轉換稱json
    });
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb(); //獲取db的全部內容
  let myquery = { _id: ObjectId(req.params.id) }; //用戶輸入變量的_id等於db table中的id
  db_connect.collection("records").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();

  let myobj = {
    submitDate: req.body.submitDate,
    slug: req.body.slug,
    reporter: req.body.reporter,
    timeRelease: req.body.timeRelease,
    title: req.body.title,
    leadIn: req.body.leadIn,
    voiceOver: req.body.voiceOver,
    releaseDate: req.body.releaseDate,
    note: req.body.note,
    submitDateUnix: req.body.submitDateUnix,
  };
  db_connect.collection("records").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,

      submitDateUnix: req.body.submitDateUnix,
      submitDate: req.body.submitDate,
      slug: req.body.slug,
      reporter: req.body.reporter,
      timeRelease: req.body.timeRelease,
      title: req.body.title,
      leadIn: req.body.leadIn,
      voiceOver: req.body.voiceOver,
      releaseDate: req.body.releaseDate,
      note: req.body.note,
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

// this wection will help you find a record by id
// recordRoutes.route("/view/:id").get(function (req, res) {
//   let db_connect = dbo.getDb("newstopics");
//   db_connect
//     .collection("records")
//     .findOne({ _id: ObjectId(req.params.id) })
//     .toArray(function (err, result) {
//       if (err) throw err;
//       console.log("find one match");
//       res.json(result);
//     });
// });

module.exports = recordRoutes;
