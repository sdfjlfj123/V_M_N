const webService = require("../service/webService")

const webController={
    NewList:async(req,res,next)=>{
        const[result,fileds]=await webService.NewList({id:req.params.id})
        res.send({
            data:result
        })
    },
    Toplist:async(req,res,next)=>{
        const[result,fileds]=await webService.Toplist({limit:Number(req.query.limit)})
        res.send({
            data:result
        })
    },
    ProductList:async(req,res,next)=>{
        const[result,fileds]=await webService.ProductList()
        res.send({
            data:result
        })
    },
}
module.exports = webController