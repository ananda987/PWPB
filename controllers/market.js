const db = require("../connect");

const getMarket = (req, res) => {
    const sql = "SELECT * FROM jenisbarang";
    db.query(sql, (error, result) => {
        const jenisBarang = JSON.parse(JSON.stringify(result));
        if (error) throw error
        if (req.session.user) {
            const sql = `SELECT * FROM user WHERE username = '${req.session.user.usernsme}'`;
            db.query(sql, (error, result) => {
                const user = result[0];
                console.log(user);
            })
        } else {
            res.render("jenisBarang", { jenis: jenisBarang });
        }

    })

};
const tambahJenis = (req, res) => {
    const sql = `INSERT INTO jenisBarang(jenisBarang) VALUES ('${req.body.jenisBarang}')`;
    db.query(sql, (error, result) => {
        if (error) throw error
        res.redirect('/')
    })
};

const hapusJenis = (req, res) => {
    const id = req.params.id_jenisBarang;
    const sql = "DELETE FROM jenisBarang where id_jenisBarang = ?";
    db.query(sql, id, (error, result) => {
        if (error) throw error
        res.redirect("back")
    })
};

const getBarang = (req, res) => {
    const id = req.params.id_JenisBarang;
    const sql = `SELECT * FROM barang WHERE id_jenisBarang = ${id}`;
    db.query(sql, (error, result) => {
        const barang = JSON.parse(JSON.stringify(result));
        if (error) throw error

        const uang = (rupiah) => {
            return rupiah.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
                mininumFractionDigits: 0,
            })
        }
        if (req.session.user) {
            const sql = `SELECT * FROM user WHERE username = '${req.session.user.username}'`
            db.query(sql, (error, result) => {
                const user = result[0];
                console.log(user);
                const sql2 = `SELECT * FROM transaksi JOIN barang ON transaksi.id_barang = barang.id_barang WHERE status = 0 AND id_user = ${req.session.user.id}`;
                db.query(sql2, (error, result2) => {
                    const transaksi = result2
                    const sql3 = `SELECT * FROM transaksi JOIN barang ON transaksi.id_barang = barang.id_barang WHERE status = 0 AND id_user = ${req.session.user.id}`;
                    db.query(sql3, (error, result3) => {
                        if (error) {
                            throw error
                        }
                        total = result3
                        console.log(user);
                        res.render("marketbarang", { bar: barang, id: id, uang, transaksi, user });
                    })
                })
            })
        } else {

            res.render("pilihBarang", { bar: barang, id: id, uang, user: '', transaksi });
        }
    });

};

const hapusBarang = (req, res) => {
    const id = req.params.id_barang;
    const sql = "DELETE FROM barang where id_barang = ?";
    db.query(sql, id, (error, result) => {
        if (error) throw error
        res.redirect("back")
    })
};

const tambahBarang = (req, res) => {
    const image = req.file ? req.file.filename : null;
    const sql = `INSERT INTO barang(Nama_barang, id_jenisBarang, harga, stock, new_stock, image) VALUES ('${req.body.nama_barang}', '${req.body.id_jenisBarang}', '${req.body.harga}', '${req.body.stock}', '${req.body.new_stock}', '${image}')`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.redirect("back");
        console.log(sql);
    });
};

const tambahTransaksi = (req, res) => {
    if (req.session.user) {
        const jumlah = req.body.jumlah;
        const total = req.body.total;
        const sql = `INSERT INTO transaksi (id_barang, jumlah, total_harga, status, id_user) VALUES('${req.body.barang_id}', '${jumlah}', '${total}', '0', ${req.session.user.id})`;
        db.query(sql, (error, result) => {
            if (error) throw error;
            const sql2 = `UPDATE barang SET new_stock = ${req.body.new_stock} WHERE id_barang = ${req.bpdy.barang_id}`;
            db.query(sql, (error, result) => {
                if (error) throw error;
                res.redirect("back");
            });
        });
    } else {
        res.render('logi', { pesan: "anda harus login", class: "danger" })
    }
};

const cancel = (req, res) => {
    const sql = `UPDATE barang SET new_stock = ${req.body.stockBaru} WHERE id_barang = ${req.body.barang_id2}`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        const sql2 = `DELETE FROM transaksi WHERE id_transaksi = ${req.body.id_transaksi}`;
        db.query(sql2, (eror, result) => {
            if (eror) throw error;
            res.redirect("back");
        });
    });
};

const editJenis = (req, res) => {
    // ubah tabel di jenis barang, dengan kolom jenis barang dg isi yg ada di formulir edit 
    const sql = `UPDATE JenisBarang SET JenisBarang = '${req.body.jenis}' WHERE id_jenisBarang = '${req.body.id_jenis}'`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.redirect("back");
    });
};

const transaksi = (req, res) => {
    if (req.session.user) {
        const id = req.params.id;
        const sql2 = `SELECT * FROM transaksi JOIN barang ON transaksi.id_barang = barang.id_barang WHERE status = 0 AND id_user = ${req.session.user.id}`
        db.query(sql2, (error, result) => {
            const transaksi = JSON.parse(JSON.stringify(result));
            const sql3 = `SELECT SUM (total_harga) As total FROM transaksi JOIN barang ON transaksi.id_barang = barang.id_barang WHERE status = 0 AND id_user = ${req.session.user.id}`;
            db.query(sql3, (error, result) => {
                const total = JSON.parse(JSON.stringify(result));
                const uang = (rupiah) => {
                    return rupiah.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        mininumFractionDigits: 0,
                    })
                }
                res.render("transaksi", { transaksi, idJbar: id, total, uang });
            });
        });
    } else {
        res.redirect("back")
    }
}

const shop = (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM barang WHERE id_jenisBarang = ${id}`;
    db.query(sql, (error, result) => {
        const barang = JSON.parse(JSON.stringify(result));
        if (error) throw error

        const uang = (rupiah) => {
            return rupiah.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
                mininumFractionDigits: 0,
            })
        }
        res.render("shop", { bar: barang, id, uang });
    });
};

const bayar = (req, res) => {
    if (req.session.user) {
        const sql = `UPDATE user SET saldo = '${req.body.u_saldo}' WHERE id_user = ${req.session.user.id}`;
        db.query(sql, (error, results) => {
            if (error) throw error
            res.redirect("back")
            const sql = `UPDATE transaksi AS t INNER JOIN barang AS b ON t.id_barang = b.id_barang SET t.status='1', b.stock = ${req.body.B_stock} WHERE t.id_barang = b._barang SET t.status = '1', b.stock = ${req.body.B_stock} WHERE t.id_transaksi = ${req.body.B_id_transaksi};`;
            db.query(sql, (error, result) =>{
                if (error) throw error;
            })
        })
    }
}



module.exports = { getMarket, tambahJenis, hapusJenis, getBarang, hapusBarang, tambahBarang, tambahTransaksi, editJenis, cancel, transaksi, shop, bayar };