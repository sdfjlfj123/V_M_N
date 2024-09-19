const pool = require("../config");
const userService = {
    Login: (username, password) => {
        return pool.query('SELECT * FROM user WHERE username = ? and password=?', [username, password]);
    },
    UserCenter: ({ id, username, gender, introduction, avatar }) => {
        if (avatar) {
            return pool.query(`update user set username=?,gender=?,introduction=?,avatar=? where id=?`, [username, gender, introduction, avatar, id])
        }
        else {
            return pool.query(`update user set username=?,gender=?,introduction=? where id=?`, [username, gender, introduction, id])
        }

    },
    UserAdd: ({ username, password, role, introduction, avatar }) => {
        return pool.query(`insert into user (username,password,role,introduction,avatar) values(?,?,?,?,?)`, [username, password, role, introduction, avatar])
    },
    UserList: () => {
        return pool.query('select username,password,avatar,introduction,role,id from user')
    },
    UserDel: (id) => {
        return pool.query('DELETE FROM user WHERE id = ?', [id])
    },
    UserPost: ({ id, username, password, introduction, role }) => {
        return pool.query(`update user set username=?,password=?,role=?,introduction=? where id=?`, [username, password, role, introduction, id])
    },

    NewAdd: ({ title, content, category, cover, isPublish, editTime }) => {
        return pool.query(`insert into news (title,content,category,cover,isPublish,editTime) values(?,?,?,?,?,?)`, [title, content, category, cover, isPublish, editTime])
    },
    NewList: ({ id }) => {
        if (id) {
            return pool.query('select * from news where id=?', [id])
        }
        else {
            return pool.query('select * from news')
        }
    },
    NewPublish: ({ id, isPublish, editTime }) => {
        return pool.query(`update news set isPublish=?,editTime=? where id=?`, [isPublish, editTime, id])
        // console.log('Parameters:', [isPublish, editTime, id]);
    },
    NewDel: (id) => {
        return pool.query('delete from news where id = ?', [id])
    },
    NewPost: ({ id, title, content, category, cover, isPublish, editTime }) => {
        return pool.query(`update news set title=?,content=?,category=?,cover=?,isPublish=?,editTime=? where id=?`, [title, content, category, cover, isPublish, editTime, id])
    },

    ProductAdd: ({ title, introduction, detail, cover }) => {
        return pool.query(`insert into product (title, introduction, detail,cover) values(?,?,?,?)`, [title, introduction, detail, cover])
    },
    ProductList: () => {
        return pool.query('select * from product')
    },
    ProductDel: (id) => {
        return pool.query('delete from product where id = ?', [id])
    },
    ProductEdit: ({ id, title, introduction, detail, cover, editTime }) => {
        return pool.query(`update product set title=?,introduction=?,detail=?,cover=?,editTime=? where id=?`, [title, introduction, detail, cover, editTime, id])
    }
}
module.exports = userService