import excaliburZen from "./excalibur-zen.js";

let id = '8fbf69c3daa49234acc91d6e1d97774c' // id, judul, banyak, pekan, tahun, tipe
let sql = 'https://excalibur.primasolutions.my.id/sql.php'

let tanggalan = new Date();
// let bulan = tanggalan.getMonth() + 1;
let tahun = tanggalan.getFullYear();

// Mendapatkan tanggal saat ini
var today = new Date();

// Mendapatkan tanggal awal tahun
var startOfYear = new Date(today.getFullYear(), 0, 1);

// Menghitung selisih dalam milidetik antara tanggal saat ini dan tanggal awal tahun
var diff = today - startOfYear;

// Mengkonversi selisih dalam milidetik menjadi jumlah pekan
var week = Math.ceil(diff / (1000 * 60 * 60 * 24 * 7));

// Menampilkan pekan ke berapa
// console.log("Sekarang adalah pekan ke: " + week);


let banyaknya;

export default async function ({ judul, tipe }) {
    banyaknya = await excaliburZen(sql, {
        id,
        kunci: "cek",
        judul,
        pekan: week,
        tahun,
        tipe
    });
    banyaknya = await banyaknya.json();
    if (!banyaknya) {
        // belum ada
        let tambah_baru = await excaliburZen(sql, {
            id,
            kunci: "tambah-baru",
            judul,
            banyak: "1",
            pekan: week,
            tahun, tipe
        });
    } else {
        // sudah ada
        let update_aja = await excaliburZen(sql, {
            id,
            kunci: "update-dulu",
            banyak: +banyaknya[0].banyak + 1,
            judul,
            pekan: week,
            tahun, tipe
        });
    }
}
// init();

//   async function cek() {
//     let terbaru = await excaliburZen(sql, {
//       id,
//       kunci: "ambil-terbanyak",
//       pekan: week,
//       tahun, tipe: 'Aplikasi Android'
//     });
//     terbaru = await terbaru.json();
//     terbaru = terbaru.sort((b, a) => +a.banyak - +b.banyak);
//     console.log(JSON.stringify(terbaru, null, 2));
//   }
//   cek();