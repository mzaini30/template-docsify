import excaliburZen from "./excalibur-zen.js";

let id = '3cf736049cd41daa59c58c7bff2686bf' // id, judul, banyak, bulan, tahun, tipe
let sql = 'https://excalibur.primasolutions.my.id/sql.php'

let tanggalan = new Date();
let bulan = tanggalan.getMonth() + 1;
let tahun = tanggalan.getFullYear();

let banyaknya;

export default async function ({ judul, tipe }) {
    banyaknya = await excaliburZen(sql, {
        id,
        kunci: "cek",
        judul,
        bulan,
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
            bulan,
            tahun, tipe
        });
    } else {
        // sudah ada
        let update_aja = await excaliburZen(sql, {
            id,
            kunci: "update-dulu",
            banyak: +banyaknya[0].banyak + 1,
            judul,
            bulan,
            tahun, tipe
        });
    }
}
// init();

//   async function cek() {
//     let terbaru = await excaliburZen(sql, {
//       id,
//       kunci: "ambil-terbanyak",
//       bulan,
//       tahun,
//     });
//     terbaru = await terbaru.json();
//     terbaru = terbaru.sort((b, a) => +a.banyak - +b.banyak);
//     console.log(JSON.stringify(terbaru, null, 2));
//   }
//   cek();