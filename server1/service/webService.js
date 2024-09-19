const pool = require("../config");
const webService = {
    NewList: ({ id }) => {
        return id ? pool.query("select * from news where id=? and isPublish=?", [id, 1]) : pool.query("select * from news where isPublish=1 ORDER BY editTime ASC")
    },
    Toplist:({limit})=>{
        return pool.query("select * from news where isPublish=1 ORDER BY editTime ASC LIMIT ?",[limit])
    },
    ProductList:()=>{
        return pool.query("select * from product ORDER BY editTime ASC")
    }
}
module.exports = webService