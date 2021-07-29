'use strict'

var response = require('./res')
var connection = require('./koneksi')

exports.index = function(req, res){
    response.ok('Aplikasi REST API ku berjalan!', res)
}

//menampilkan semua data mahasiswa
exports.tampilSemuaMahasiswa = function(req, res){
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fields){
        if (error){
            connection.log(error)
        }else{
            response.ok(rows,res)
        }
    })
}

exports.tampilMahasiswaByID = function(req, res){
    let id_mahasiswa = req.params.id_mahasiswa
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id],
        function(error, rows, fields){
            if(error){
                connection.log(error)
            }else{
                response.ok(rows, res)
            }
        }
    )
}

//insert data mahasiswa
exports.tambahMahasiswa = function(req, res){
    var nim = req.body.nim
    var nama = req.body.nama
    var jurusan = req.body.jurusan

    connection.query('INSERT INTO mahasiswa (nim,nama,jurusan) VALUES(?,?,?)',
        [nim,nama,jurusan],
        function(error, rows, fields){
            if(error){
                console.log(error)
            }else{
                response.ok('Berhasil Menambahkan data', res)
            }
        }
    )    
}

//update data mahasiswa
exports.updateMahasiswa = function(req, res){
    var id_mahasiswa = req.body.id_mahasiswa
    var nim = req.body.nim
    var nama = req.body.nama
    var jurusan = req.body.jurusan

    connection.query(`UPDATE mahasiswa SET nim = '${nim}', nama = '${nama}', jurusan = '${jurusan}' WHERE id_mahasiswa = ${id_mahasiswa}`,
        function(error, rows, fields){
            if(error){
                console.log(error)
            }else{
                response.ok(rows.affectedRows + 'record(s) updated', res)
            }
        }   
    )
}

//hapus data mahasiswa
exports.deleteMahasiswa = function(req, res){
    var id_mahasiswa = req.body.id_mahasiswa

    connection.query(`DELETE FROM mahasiswa WHERE id_mahasiswa = ${id_mahasiswa}`,
    function(error, rows, fields){
        if(error){
            console.log(error)
        }else{
            response.ok(rows.affectedRows +'record(s) deleted', res)
        }
    })
}

//tampilkan matakuliah group
exports.tampilGroupMatakuliah = function (req, res){
    connection.query(`SELECT 
    a.id_mahasiswa,
    a.nim,
    a.nama,
    a.jurusan,
    c.matakuliah,
    c.sks
   FROM mahasiswa a
   JOIN krs b ON a.id_mahasiswa = b.id_mahasiswa
   JOIN matakuliah c ON b.id_matakuliah = c.id_matakuliah`,
    function(error, rows, fields){
        if(error){
            console.log(error)
        }else{
            response.oknested(rows, res)
        }
    }
   )
}