'use strict'

module.exports = function(app){
    var jsonku = require('./controller')

    app.route('/')
        .get(jsonku.index)
    
    app.route('/tampil')
        .get(jsonku.tampilSemuaMahasiswa)

    app.route('/tampil/:id')
        .get(jsonku.tampilMahasiswaByID)

    app.route('/tambahmahasiswa')
        .post(jsonku.tambahMahasiswa)

    app.route('/updatemahasiswa')
        .post(jsonku.updateMahasiswa)
    
    app.route('/deletemahasiswa')
        .post(jsonku.deleteMahasiswa)
}

