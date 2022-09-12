const express = require("express");
const app = express();
const cors = require("cors");
// 這部分我們需要使用dotenv來把我們的mogodb用戶密碼設置文件自動導出至conn.js 

require("dotenv").config({ path: "./config.env" });
// 同樣使用process來尋找env文件中的環境變量找到PORT
const port = process.env.PORT || 5000; 
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  // 調用conn.js中的連結function來連結mongodb sever
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});