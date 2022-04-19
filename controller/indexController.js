import { conn } from "../config/connection.js";

const getAlltodo = async (req, res) => {
  let temp = new Array("all", "completed", "active", "has-due-date");

  //   const user = await todoModel.find({ email: "tinewq@yahoo.com" });

  let sql = `SELECT * FROM todo`;

  conn.query(sql, function (err, data) {
    // biến data chứa kết quả truy vấn
    if (err) throw err;
    res.render("todoList", { todo: data, status: temp });
  });
  // console.log("DATA", user);
};

const Delete = async (req, res) => {
  let idParam = req.params.id;

  let sql = `DELETE from todo where id= '${idParam}'`;

  conn.query(sql, function (err, data) {
    // biến data chứa kết quả truy vấn
    if (err) throw err;
    res.redirect("/");
  });
};

const Update = async (req, res) => {
  let idParam = req.params.id;
  let title = "Job";

  let sql = `UPDATE todo SET todo='${title}' where id= '${idParam}'`;

  conn.query(sql, function (err, data) {
    // biến data chứa kết quả truy vấn
    if (err) throw err;
    res.redirect("/");
  });
};

const Add = (req, res) => {
  const dataTodo = req.body.todo;
  const inputDate = req.body.inputDate;
  const email_ = "tinewq@yahoo.com";

  console.log("input la", typeof inputDate);

  let arrayString = inputDate.split("/");

  console.log("chuoi la ", arrayString);

  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let date = arrayString[1];

  // current month
  let month = arrayString[0];

  // current year
  let year = arrayString[2];

  // prints date in YYYY-MM-DD format
  let time = year + "-" + month + "-" + date;

  var sql = `insert into todo(todo,email,done,date) values('${dataTodo}','${email_}','0','${time}');`;

  conn.query(sql, function (err, data) {
    // biến data chứa kết quả truy vấn
    if (err) throw err;
    res.redirect("/");
  });
};

const checkDone = async (req, res) => {
  let datacall = req.body.id;
  console.log("vo :", req.body.id);

  let sql = `UPDATE todo SET done="1" where id= '${datacall}'`;
  conn.query(sql, function (err, data) {
    // biến data chứa kết quả truy vấn

    if (err) throw err;
    res.redirect("/");
  });
};

const Status = async (req, res) => {
  console.log("Tai ", req.query.filter);
  let user = [];
  let temp = null;
  let new_arr = null;
  let valueToRemove = null;
  let sql = "";

  temp = new Array("all", "completed", "active", "has-due-date");
  // Hoặc

  switch (req.query.filter) {
    case "active":
      // code block
      valueToRemove = "active";
      console.log("Vo active");

      sql = `SELECT * FROM todo where done= 0`;
      conn.query(sql, function (err, data) {
        // biến data chứa kết quả truy vấn
        user = data;
        if (user) res.render("todoList", { todo: user, status: new_arr });

        if (err) throw err;
      });
      new_arr = temp.filter((item) => item !== valueToRemove);
      new_arr.unshift("active");
      console.log("hu", new_arr);
      break;
    case "completed":
      sql = `SELECT * FROM todo where done= 1`;
      conn.query(sql, function (err, data) {
        // biến data chứa kết quả truy vấn
        user = data;
        if (user) res.render("todoList", { todo: user, status: new_arr });

        if (err) throw err;
      });
      valueToRemove = "completed";
      new_arr = temp.filter((item) => item !== valueToRemove);
      new_arr.unshift("completed");
      break;
    case "has-due-date":
      // code block

      let date_ob = new Date();

      // current date
      // adjust 0 before single digit date

      valueToRemove = "has-due-date";
      //   user = await todoModel.find({ email: "tinewq@yahoo.com" });
      sql = `SELECT date FROM todo `;
      conn.query(sql, function (err, data) {
        // biến data chứa kết quả truy vấn
        data.forEach((sp) => {
          console.log("data la ", sp.date.getTime());
          if (sp.date.getTime() < date_ob.getTime()) {
            user.push(sp);
          }
        });
        if (user) res.render("todoList", { todo: user, status: new_arr });

        if (err) throw err;
      });
      new_arr = temp.filter((item) => item !== valueToRemove);
      new_arr.unshift("has-due-date");
      break;
    default:
      valueToRemove = "all";
      //   user = await todoModel.find({ email: "tinewq@yahoo.com" });
      console.log("Vo df");

      sql = `SELECT * FROM todo`;
      conn.query(sql, function (err, data) {
        // biến data chứa kết quả truy vấn
        user = data;
        if (user) res.render("todoList", { todo: user, status: new_arr });

        if (err) throw err;
      });
      new_arr = temp.filter((item) => item !== valueToRemove);
      new_arr.unshift("all");
      console.log("hu", new_arr);
  }
};

export default {
  getAlltodo,
  Delete,
  Update,
  Add,
  checkDone,
  Status,
};
