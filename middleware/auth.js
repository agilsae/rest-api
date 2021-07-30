var connection = require('../koneksi');
var mysql = require('mysql')
var md5 = require('md5')
var response = require('../res')
var jwt = require('jsonwebtoken')
var config = require('../config/secret')
var ip = require('ip')

//controller utk register
exports.registrasi = function(req, res){
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: req.body.tanggal_daftar
    }

    var query = `SELECT email FROM user WHERE email = '${post.email}'`
    connection.query(query, function(error, rows){
        if(error){
            console.log(error)
        }else{
            if(rows.length == 0){
                var query = `INSERT INTO user (username, email, password, role, tanggal_daftar) VALUES ('${post.username}','${post.email}', '${post.password}', ${post.role}, '${post.tanggal_daftar}')`
                connection.query(query, function(error, rows){
                    if(error){
                        console.log(error)
                    }else{
                        response.ok('Berhasil menambahkan user baru', res)
                    }
                })
            }else{
                response.ok('Email sudah terdaftar!', res)
            }
        }
    })
}

//controller untuk login
exports.login = function(req, res){
    var post = {
        email: req.body.email,
        password: md5(req.body.password)
    }

    var query = `SELECT * FROM user WHERE email='${post.email}' and password = '${post.password}' `
    connection.query(query, function(error, rows){
        if(error){
            console.log(error)
        }else{
            if(rows.length){
                var token = jwt.sign({rows}, config.secret,{
                    expiresIn: 1440
                })
                id_user = rows[0].id_user
                
                var data = {
                    id_user: id_user,
                    acces_token: token,
                    ip_address: ip.address()
                }

                var query = `INSERT INTO akses_token (id_user,acces_token,ip_address) VALUES (${data.id_user}, '${data.acces_token}', '${data.ip_address}')`
                connection.query(query, function(error, rows){
                    if(error){
                        console.log(error)
                    }else{
                         res.json({
                             success:true,
                             message:"Token Berhasil Tergenerate",
                             token:token,
                             currUser:data.id_user
                         });
                    }
                })
            }else{
                 res.json({
                     "error":true,
                     "Message":"Email/Password Salha"
                 });
            }
        }
    })
}

exports.halamanrahasia = function(req, res){
    response.ok('Halaman ini hanya untuk user dengan role = 2', res)
}