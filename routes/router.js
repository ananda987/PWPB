const express = require('express');
const router = express.Router();
const { getMarket, tambahJenis, hapusJenis, getBarang, hapusBarang, tambahBarang, tambahTransaksi,editJenis, cancel, transaksi, shop, bayar } = require('../controllers/market.js')
const multer = require ('multer');
const { login, register, registrasi, auth, logout}= require("../controllers/auth.js")

const storage = multer.diskStorage({
    destination:function (req, flie,cb) {
        cb(null, './public/uploads')
    },
    
    filename : function (req,file,cb){
    cb(null, file.originalname)
    }        
});


const upload = multer({storage});


router.get('/', getMarket)
router.get('/getMarket', getMarket)
router.post('/tambahJenis', tambahJenis)
router.get('/hapusJenis/:id_JenisBarang', hapusJenis)
router.get('/pilihBarang/:id_JenisBarang', getBarang)
router.get('/hapusBarang/:id_barang', hapusBarang)
router.get('/login', login)
router.get('/getMarket', getMarket)
router.get('/transaksi', transaksi)
router.get('/shop/:id', shop)
router.get('/register', register)
router.get('/logout', logout)
router.post('/tambahBarang', upload.single("photo"), tambahBarang)
router.post('/tambahTransaksi', tambahTransaksi)
router.post('/editJanis', editJenis)
router.post('/cancelTransaksi', cancel)
router.post('/registrasi', registrasi)
router.post('/auth', auth)
router.post('/bayar', bayar)




module.exports = router;