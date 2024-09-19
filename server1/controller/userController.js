const userService = require("../service/userService")
const JWT = require("../util/JWT")
const fs = require('fs')

const userController = {
    Login: async (req, res, next) => {
        const { username, password } = req.body
        const [result, fileds] = await userService.Login(username, password)
        if (result.length === 0) {
            res.send({
                ok: 0
            })
        }
        else {
            const token = JWT.generate({
                _id: result[0].id,
                username: result[0].username
            }, '1d')
            res.setHeader("Authorization", token)
            //要暴露出去，才能被前端访问到
            res.set('Access-Control-Expose-Headers', 'Authorization');
            res.send({
                id: result[0].id,
                username: result[0].username,
                role: result[0].role
            })
        }
    },
    UserCenter: async (req, res, next) => {
        const { username, gender, introduction } = req.body
        // console.log(req.body, req.file)
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ''
        const token = req.headers['authorization'].split(" ")[1]
        var payload = JWT.verify(token)
        // console.log(payload._id)
        const [result, fileds] = await userService.UserCenter({ id: payload._id, username, gender: Number(gender), introduction, avatar })
        if (avatar) {
            res.send({
                data: {
                    username,
                    gender: Number(gender),
                    introduction,
                    avatar
                }
            })
        }
        else {
            res.send({
                data: {
                    username,
                    gender: Number(gender),
                    introduction,
                }
            })
        }

    },
    UserAdd: async (req, res, next) => {
        const { username, password, role, introduction } = req.body
        avatar = `/avataruploads/${req.file.filename}`
        await userService.UserAdd({ username, password, role: Number(role), introduction, avatar })
        res.send({
            ok: 1
        })
    },
    UserList: async (req, res, next) => {
        const [result, fileds] = await userService.UserList()
        res.send({
            ok: 1,
            data: result
        })
    },
    UserDel: async (req, res, next) => {
        const id = req.params.id
        const [result, fileds] = await userService.UserDel(id)
        res.send({
            ok: 1
        })
    },
    UserPost: async (req, res, next) => {
        // console.log(req.body)
        await userService.UserPost(req.body)
        res.send({
            ok: 1
        })
    },
    NewAdd: async (req, res, next) => {
        console.log(req.body, req.file)
        const { title, content, category, isPublish } = req.body
        cover = `/coveruploads/${req.file.filename}`
        await userService.NewAdd({ title, content, category: Number(category), cover, isPublish: Number(isPublish), editTime: new Date() })
        res.send({
            ok: 1
        })
    },
    NewList: async (req, res, next) => {
        // console.log(11)
        const [result, fileds] = await userService.NewList({ id: req.params.id })
        res.send({
            ok: 1,
            data: result
        })
    },
    NewPublish: async (req, res, next) => {
        // console.log(11)
        const { id, isPublish } = req.body
        // console.log(id,isPublish,formatDate.getTime(new Date()))
        await userService.NewPublish({
            id,
            isPublish,
            editTime: new Date()
        })
    },
    NewDel: async (req, res, next) => {
        // console.log(req.params)
        await userService.NewDel(req.params.id)

    },
    NewPost: async (req, res, next) => {
        console.log(req.body, req.file)
        const { id, title, content, category, isPublish } = req.body
        cover = `/coveruploads/${req.file.filename}`
        await userService.NewPost({ id, title, content, category: Number(category), cover, isPublish: Number(isPublish), editTime: new Date() })
        res.send({
            ok: 1
        })
    },

    ProductAdd: async (req, res, next) => {
        // console.log(req.body,req.file)
        const { title, introduction, detail } = req.body
        cover = `/productuploads/${req.file.filename}`
        await userService.ProductAdd({ title, introduction, detail, cover, editTime: new Date() })
        res.send({
            ok: 1
        })

    },

    ProductList: async (req, res, next) => {
        // console.log(11)
        const [result, fileds] = await userService.ProductList()
        res.send({
            data: result
        })
    },
    ProductDel: async (req, res, next) => {
        // console.log(req.params.id)
        await userService.ProductDel(req.params.id)
    },
    ProductEdit: async (req, res, next) => {
        const { id, title, introduction, detail } = req.body
        cover = `/productuploads/${req.file.filename}`
        await userService.ProductEdit({id,title, introduction, detail, cover, editTime: new Date()})
    },
}
module.exports = userController