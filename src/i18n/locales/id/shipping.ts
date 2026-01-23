export default {
  header: {
    badge: "Pengiriman & Pengembalian",
    title: "Info Pengiriman",
    subtitle:
      "Semua yang perlu Anda ketahui tentang pengiriman dan pengembalian",
  },
  highlights: {
    fastShipping: {
      title: "Pengiriman Cepat",
      description: "Pesanan diproses dalam 1-2 hari kerja",
    },
    securePackaging: {
      title: "Kemasan Aman",
      description:
        "Dikemas dengan hati-hati untuk memastikan pengiriman yang aman",
    },
    easyReturns: {
      title: "Pengembalian Mudah",
      description: "Kebijakan pengembalian 7 hari untuk ketenangan pikiran",
    },
  },
  processing: {
    title: "Waktu Pemrosesan",
    subtitle: "Berapa lama sebelum pesanan Anda dikirim",
    content: "Semua pesanan diproses dalam",
    timeframe: "1-2 hari kerja",
    after:
      "setelah konfirmasi pembayaran. Pesanan yang dilakukan pada akhir pekan atau hari libur akan diproses pada hari kerja berikutnya.",
    tracking:
      "Anda akan menerima email konfirmasi dengan informasi pelacakan setelah pesanan Anda dikirim.",
  },
  delivery: {
    title: "Waktu & Biaya Pengiriman",
    subtitle: "Pengiriman di Indonesia",
    standard: {
      title: "Pengiriman Standar (3-5 hari kerja)",
      description: "Tersedia ke semua kota besar di Indonesia",
      cost: "Biaya pengiriman dihitung saat checkout berdasarkan tujuan",
    },
    express: {
      title: "Pengiriman Ekspres (1-2 hari kerja)",
      description: "Tersedia untuk Jakarta, Surabaya, dan sekitarnya",
      cost: "Opsi pengiriman premium untuk pengiriman lebih cepat",
    },
    note: "Waktu pengiriman dapat bervariasi tergantung pada layanan kurir dan lokasi Anda. Daerah terpencil mungkin memerlukan waktu pengiriman tambahan.",
  },
  returns: {
    title: "Pengembalian & Pertukaran",
    subtitle: "Kebijakan pengembalian 7 hari kami",
    intro:
      "Kami ingin Anda menyukai pembelian Mewzu Anda. Jika Anda tidak sepenuhnya puas, Anda dapat mengembalikan atau menukar barang dalam",
    timeframe: "7 hari",
    introEnd: "setelah menerima pesanan Anda.",
    conditions: {
      title: "Kondisi Pengembalian",
      items: [
        "Barang harus tidak dipakai, tidak dicuci, dan dalam kondisi asli",
        "Semua tag dan kemasan asli harus disertakan",
        "Barang tidak boleh memiliki tanda-tanda pemakaian atau perubahan",
      ],
    },
    howTo: {
      title: "Cara Mengembalikan",
      steps: [
        "Hubungi kami melalui email atau WhatsApp dalam 7 hari setelah menerima pesanan Anda",
        "Berikan nomor pesanan dan alasan pengembalian Anda",
        "Kami akan mengirimkan instruksi pengembalian dan alamat",
        "Kirim barang kembali menggunakan metode pengiriman yang dapat dilacak",
        "Pengembalian dana akan diproses dalam 3-5 hari kerja setelah kami menerima pengembalian",
      ],
    },
    note: "Biaya pengiriman pengembalian menjadi tanggung jawab pelanggan kecuali pengembalian disebabkan oleh cacat atau kesalahan dari pihak kami.",
    noteLabel: "Catatan:",
  },
  issues: {
    title: "Masalah Pesanan",
    intro:
      "Kami sangat berhati-hati dalam mengemas dan mengirim pesanan Anda. Namun, jika Anda menerima barang yang rusak, cacat, atau salah, harap segera hubungi kami.",
    resolve: {
      title: "Kami akan menyelesaikannya dengan:",
      items: [
        "Mengirim pengganti tanpa biaya tambahan",
        "Mengeluarkan pengembalian dana penuh termasuk biaya pengiriman awal",
        "Memberikan kredit toko untuk pembelian di masa depan",
      ],
    },
    note: "Harap sertakan foto masalahnya saat menghubungi kami untuk membantu kami memproses klaim Anda lebih cepat.",
  },
  cta: {
    question: "Punya pertanyaan tentang pengiriman atau pengembalian?",
    link: "Hubungi kami",
    suffix: "dan kami akan dengan senang hati membantu.",
  },
} as const;
