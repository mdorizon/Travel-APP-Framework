import mysql from "mysql2";

// Connection to the mysql database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: 'travel_app'
});

connection.connect((e) => {
  if(e){
      console.log(e)
  } else {
      console.log('Connected to database !')
  }
});

export default connection;