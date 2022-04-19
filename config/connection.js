import mysql from "mysql";

let conn = mysql.createConnection({
  database: "todoList",
  host: "localhost",
  user: "root",
  password: "",
});

conn.connect(function (err) {
  if (err) throw err;
  console.log("Connect");
});

// var sql2 =
//   "CREATE TABLE Employees " +
//   " (Id INT not null AUTO_INCREMENT, " +
//   " Emp_No VARCHAR(20), " +
//   " Full_Name VARCHAR(255), " +
//   " Hire_Date DATE, " +
//   " PRIMARY KEY (Id) )";

// conn.query(sql2, function (err, results) {
//   if (err) throw err;
//   console.log("Table Employees created");
// });

// var todo = ["Scan", "Backup", "Buy Store"];
// var email = ["tinewq@gmail.com", "Smith@gmail.com", "Gates@gmail.com"];
// var done = ["done", "none", "done"];

// // Insert Datas to EMPLOYEES.
// for (var i = 0; i < todo.length; i++) {
//   var sql3 =
//     "Insert into todo (todo,email, done) " + //
//     " Values ('" +
//     todo[i] +
//     "', '" +
//     email[i] +
//     "', STR_TO_DATE('" +
//     done[i] +
//     "', '') )";

//   conn.query(sql3, function (err, results) {
//     if (err) throw err;
//     console.log("Insert a record!");
//   });
// }

export { conn };
