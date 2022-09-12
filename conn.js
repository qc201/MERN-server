//該js文檔搭建了一個全新的connection在cloud，實現尋找db的名字，
//如果存在，那麼建立連結，如果不存在，那麼新建一個db並建立連結。

const { MongoClient } = require("mongodb");
//這裏ATLAS_URI指向我們的database access user,
//注意，如果第一次連結不成功，我們在cluster里再重新建立一個讀寫用戶。
//在config.env 中的URI是從 cluster connect to app中複製來的。
//process是js自帶的模塊，可以自動尋找env文件中的環境變量
const Db = process.env.ATLAS_URI; 
//建立客戶端在mongo atlas中
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
// 這個建立連結的模塊有2個function導出，一個是連結服務器，一個是獲取db
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        //建立新db 命名為newstopics
        _db = db.db("newstopics");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    //console.log(_db)
    return _db;
  },
};