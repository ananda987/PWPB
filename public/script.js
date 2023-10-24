 //saldo
//  let nominal = 500000000;
//  let saldo = nominal;

//  const formatSaldo = (saldo) => {
//      return saldo.toLocaleString('id-ID', {
//          style: 'currency',
//          currency: 'IDR',
//          minimunFractionDigits: 0,
//      });

//  };
 document.getElementById('saldo').innerHTML = formatSaldo(saldo);
 //bayar barang
 const bayar = (harga) => {
     if (confirm('apakah anda yakin ingin membayar?')) {
         if (harga <= saldo) {
             saldo = saldo - harga;
             document.getElementById('saldo').innerHTML = formatSaldo(saldo);
         } else {
             alert("saldo kurang");
         }
     }
 }


 function barang(idBarang, hargaBarang, stock) {
     const inputBarangId = document.getElementById('barang_id')
     inputBarangId.value = idBarang
     const inputHargaBarang = document.getElementById('hargaBarang')
     inputHargaBarang.value = hargaBarang
     const inputStock = document.getElementById('stock').value = stock
 }
 const total_harga = () => {
     const harga = document.getElementById('hargaBarang').value;
     const jumlahInput = document.getElementById('jumlah');
     const stock = document.getElementById('stock').value;
     let jumlah = jumlahInput.value
     if(jumlah > stock){
         alert('Stock anda kurang')
         jumlahInput.value = stock
         document.getElementById('new_stock').value = stock - jumlahInput.value
         document.getElementById('total').value = harga * jumlahInput.value
     }else{
         document.getElementById('new_stock').value = stock - jumlahInput.value
         document.getElementById('total').value = harga * jumlahInput.value
     }
     console.log(stock);
 //     if (jumlah) {
 //         alert("Jumlah barang tidak boleh melebihi stock yang tersedia.");
 //         document.getElementById("jumlah").value = stock;
 //     }

 //     console.log(harga, jumlah);
 //     const seluruh = document.getElementById('total').value = harga * jumlah
 //     const stockBaru = stock-jumlah;
 //    document.getElementById("total").value = seluruh
 //    document.getElementById("new_stock").value = math.max(0, stockBaru);


 }


 //ngasi aturan biar teratur
 const validasi_modal1 = () => {
     const harga = document.getElementById("harga").value
     const save = document.getElementById("save")
     const nama_barang = document.getElementById('nama_barang')
     console.log(harga);
     if (nama_barang.value.lenght >= 3) {
         if (harga % 500 == 0) {
             if (harga.lenght >= 3) {
                 save.style.display = "block"
             }
             save.style.display = "block"
         } else {
             alert("harga tidak sesuai")
             save.style.display = "none"
         }
         alert("mohon diisi nama barang")
         save.style.display = "none"
     } else {
         save.style.display = "block"
     }
     if (harga % 500 == 0) {
         save.style.display = "block"
     } else {
         alert("harga tidak sesuai")
         save.style.display = "none"
     }
 }



 const cancel = (newStock, jumlah, idBarang, idtransaksi) => {
     console.log(newStock, jumlah, idBarang, idtransaksi)
     document.getElementById('barang_id2').value = idBarang
     document.getElementById('id_transaksi').value = idtransaksi
     document.getElementById('stockBaru').value = newStock = +jumlah
 }