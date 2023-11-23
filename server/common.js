const jwt = require('jsonwebtoken');
const secret = "aabbccdd"

const getNextId = (array) =>{
    let ids = array.map(object => object.id);
    let max = Math.max(...ids)+1;

    return max;
}
const getMaxId = (array) =>{
    let ids = array.map(object => object.id);
    let max = Math.max(...ids);

    return max;
}
const verifyToken = async (req,res,next)=>{
    if(req.headers.authorization){
        let token = req.headers.authorization
        if(token){
            const payload = await jwt.verify(token,secret)  
            console.log(payload);
            next();
        }else{
            return res.status(401).send("authorization error");
        }

    }
    else{
        return res.status(401).send("authorization error");
    }
    }

module.exports = {getNextId,getMaxId,secret,verifyToken}