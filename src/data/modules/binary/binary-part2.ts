import { LKSModule } from '../../../types';

export const integerOverflowModule: LKSModule = {
  id: 'integer-overflow',
  slug: 'integer-overflow',
  title: 'Integer Overflow / Underflow',
  category: 'Binary Exploitation',
  description: 'Mengeksploitasi batasan matematis tipe data integer pada bahasa tingkat rendah.',
  sections: [
    {
      id: 'concept',
      title: 'Matematika Komputer Tidak Sempurna',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Dalam memori, variabel angka memiliki ukuran terbatas. Misalnya, tipe data `unsigned short` (16-bit) hanya bisa menampung angka dari 0 hingga 65,535.'
        },
        {
          id: '2',
          type: 'alert',
          content: 'Apa yang terjadi jika Anda menambahkan 1 pada angka 65,535?\nBukan 65,536, melainkan kembali menjadi 0 (Overflow/Wrap-around). Sebaliknya, jika Anda mengurangi 1 dari 0, ia akan menjadi 65,535 (Underflow).',
          metadata: { type: 'warning' }
        }
      ]
    },
    {
      id: 'exploitation',
      title: 'Bagaimana Hacker Memanfaatkannya?',
      blocks: [
        {
          id: '3',
          type: 'text',
          content: 'Biasanya integer overflow tidak membahayakan sistem secara langsung, namun ia bisa **memicu kerentanan lain**, khususnya Buffer Overflow.'
        },
        {
          id: '4',
          type: 'code',
          content: `unsigned short len = get_user_input();\nif (len < 100) {\n    // Lolos pengecekan karena hacker memasukkan angka -1 (yang dikonversi jadi 65535)\n    memcpy(buffer, user_data, len); // BOOM! Buffer Overflow!\n}`,
          metadata: { language: 'c' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_int_1',
    type: 'mcq',
    question: 'Jika sebuah variabel "unsigned char" (8-bit, rentang 0-255) memiliki nilai 250, lalu program menambahkan nilai 10 ke variabel tersebut, berapa nilai akhirnya?',
    options: [
      { id: '1', text: '260', isCorrect: false },
      { id: '2', text: '0', isCorrect: false },
      { id: '3', text: '4', isCorrect: true },
      { id: '4', text: '255 (Max out)', isCorrect: false }
    ],
    explanation: 'Karena batasnya 255. 250 + 5 = 255. Ditambah 1 menjadi 0. Sisa 4, maka berakhirlah di angka 4.'
  }
};

export const shellcodeModule: LKSModule = {
  id: 'shellcode',
  slug: 'shellcode',
  title: 'Shellcode',
  category: 'Binary Exploitation',
  description: 'Instruksi bahasa mesin (assembly) yang disuntikkan untuk mengeksekusi shell.',
  sections: [
    {
      id: 'concept',
      title: 'Payload Kematian',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Setelah hacker berhasil membajak aliran eksekusi program (misal lewat Buffer Overflow), mereka perlu memberitahu program "apa yang harus dilakukan". Inilah fungsi Shellcode.'
        },
        {
          id: '2',
          type: 'text',
          content: 'Shellcode adalah serangkaian byte (instruksi Assembly mentah) yang biasanya dirancang untuk melakukan System Call `execve("/bin/sh")`.'
        },
        {
          id: '3',
          type: 'code',
          content: `\\x31\\xc0\\x50\\x68\\x2f\\x2f\\x73\\x68\\x68\\x2f\\x62\\x69\\x6e\\x89\\xe3\\x50\\x53\\x89\\xe1\\xb0\\x0b\\xcd\\x80`,
          metadata: { language: 'text' }
        }
      ]
    },
    {
      id: 'nop-sled',
      title: 'NOP Sled',
      blocks: [
        {
          id: '4',
          type: 'text',
          content: 'Karena sangat sulit menebak alamat memori shellcode secara presisi, hacker menggunakan teknik NOP Sled. Instruksi NOP (No Operation, byte `\\x90` di x86) adalah instruksi yang "tidak melakukan apa-apa dan lanjut ke baris berikutnya".'
        },
        {
          id: '5',
          type: 'text',
          content: 'Hacker mengirimkan ratusan NOP lalu diakhiri dengan Shellcode. Jika EIP melompat ke bagian mana saja dari NOP Sled tersebut, eksekusi akan meluncur lurus ke bawah (sliding) hingga mengenai Shellcode.'
        }
      ]
    }
  ],
  quiz: {
    id: 'q_shell_1',
    type: 'mcq',
    question: 'Apa alasan utama (historis) mengapa instruksi Shellcode harus dihindari dari penggunaan byte "0x00" (Null Byte)?',
    options: [
      { id: '1', text: 'OS Windows tidak mengenali Null Byte.', isCorrect: false },
      { id: '2', text: 'Null Byte diartikan sebagai "End of String" oleh fungsi string di C (seperti strcpy), sehingga akan memutus payload di tengah jalan.', isCorrect: true },
      { id: '3', text: 'Null Byte memicu peringatan Antivirus.', isCorrect: false },
      { id: '4', text: 'Null byte menyebabkan CPU menjadi overhead/lag.', isCorrect: false }
    ],
    explanation: 'Fungsi seperti strcpy() akan berhenti menyalin data ketika menemui Null Byte. Jika shellcode Anda memilikinya, proses injeksi akan gagal setengah jalan.'
  }
};

export const ropChainModule: LKSModule = {
  id: 'rop-chain',
  slug: 'rop-chain',
  title: 'ROP Chain (ret2libc, ret2win)',
  category: 'Binary Exploitation',
  description: 'Teknik Return-Oriented Programming untuk mem-bypass proteksi NX (No-Execute).',
  sections: [
    {
      id: 'concept',
      title: 'Merakit Senjata dari Puing-puing',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Karena proteksi NX membuat memori Stack tidak bisa mengeksekusi Shellcode, hacker menciptakan ROP. Alih-alih menyuntikkan kode baru, hacker menyusun ulang eksekusi menggunakan kode yang SUDAH ADA di dalam program tersebut.'
        }
      ]
    },
    {
      id: 'gadgets',
      title: 'ROP Gadgets',
      blocks: [
        {
          id: '2',
          type: 'text',
          content: 'Potongan instruksi kecil yang diakhiri dengan perintah `ret` (return) disebut "Gadget". Hacker merangkai banyak gadget (Chain) untuk membentuk logika program yang mereka inginkan.'
        },
        {
          id: '3',
          type: 'alert',
          content: '**ret2win**: Teknik CTF dasar di mana kita mengarahkan Instruction Pointer langsung ke alamat fungsi rahasia (misal fungsi `win()`) yang sudah ada di source code.\n**ret2libc**: Teknik nyata di mana kita memanggil fungsi `system()` yang ada di library bawaan OS (libc) dan mempassing string `"/bin/sh"`.',
          metadata: { type: 'info' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_rop_1',
    type: 'mcq',
    question: 'Pernyataan mana yang PALING TEPAT mengenai instruksi "ret" (return) dalam perannya di ROP Chain?',
    options: [
      { id: '1', text: 'Mengembalikan program ke fungsi main().', isCorrect: false },
      { id: '2', text: 'Mematikan paksa program.', isCorrect: false },
      { id: '3', text: 'Mengambil (pop) alamat memori yang ada di puncak Stack dan memasukkannya ke Instruction Pointer (EIP/RIP) untuk dieksekusi selanjutnya.', isCorrect: true },
      { id: '4', text: 'Menghapus isi register CPU.', isCorrect: false }
    ],
    explanation: 'Karena serangan Buffer Overflow memungkinkan hacker mengontrol isi Stack, instruksi `ret` menjadi jembatan agar CPU terus mengambil alamat berikutnya (gadget selanjutnya) dari Stack buatan hacker.'
  }
};
