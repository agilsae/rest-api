const jwt = require('jsonwebtoken')
const config = require('../config/secret')

function verifikasi(){
    return function(req, res, next){
        //cek authorization header
        var tokenWithBearer = req.headers.authorization
        var role = req.body.role
        if(tokenWithBearer){
            var token = tokenWithBearer.split(' ')[1]
            //verifikasi
            jwt.verify(token, config.secret, function(err, decoded){
                if(err){
                    return res.status(401).send({auth:false, message:'Token Salha'});
                }else{
                    if(role == 2){
                        req.auth = decoded
                        next()
                    }else{
                        return res.status(401).send({auth:false, message:'Role tidak sesuai'});
                    }
                }
    
            })
        }else{
            return res.status(401).send({auth:false, message:'Token tidak tersedia'}); 
        }
    }
}

module.exports = verifikasi