import { LKSModule } from '../../../types';

export const typeConfusionModule: LKSModule = {
  id: 'type-confusion',
  slug: 'type-confusion',
  title: 'Type Confusion & Uninitialized Memory',
  category: 'Binary Exploitation',
  description: 'Mengeksploitasi kebingungan tipe data (Type Confusion) dan penggunaan memori yang tidak diinisialisasi.',
  sections: [
    {
      id: 'type-confusion',
      title: 'Type Confusion (Casting Salah)',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Terjadi ketika program mengalokasikan memori untuk satu tipe data (misalnya `User Object`), tetapi kemudian memperlakukan blok memori tersebut sebagai tipe data lain (misalnya `Admin Object`) melalui proses type-casting (seperti `(Admin*)user_ptr` di C++).'
        },
        {
          id: '2',
          type: 'text',
          content: 'Jika hacker dapat memanipulasi field dalam `User Object` sehingga saat di-"cast" menjadi `Admin Object` memberikan privilege tinggi, maka sistem bisa dikompromikan.'
        }
      ]
    },
    {
      id: 'uninit-mem',
      title: 'Uninitialized Memory Use',
      blocks: [
        {
          id: '3',
          type: 'alert',
          content: 'Dalam C/C++, variabel lokal yang dideklarasikan (seperti `int x;`) tidak otomatis bernilai 0. Mereka akan berisi "sampah" sisa dari apa pun yang sebelumnya ada di lokasi memori tersebut di Stack atau Heap.',
          metadata: { type: 'warning' }
        },
        {
          id: '4',
          type: 'text',
          content: 'Jika program membaca variabel `x` sebelum memberinya nilai eksplisit, program bisa membocorkan alamat memori (Memory Leak) atau berperilaku aneh yang bisa dimanfaatkan untuk melewati pengecekan keamanan.'
        }
      ]
    }
  ],
  quiz: {
    id: 'q_bin3_1',
    type: 'mcq',
    question: 'Mana cara yang direkomendasikan untuk mencegah "Uninitialized Memory Use" di bahasa C?',
    options: [
      { id: '1', text: 'Gunakan memset() atau beri nilai awal saat deklarasi (misal: int x = 0;).', isCorrect: true },
      { id: '2', text: 'Kompilasi dengan flag -O3 (Optimasi tertinggi).', isCorrect: false },
      { id: '3', text: 'Gunakan fungsi malloc() daripada tipe data primitif.', isCorrect: false },
      { id: '4', text: 'Bebaskan (free) memori sebelum menggunakannya.', isCorrect: false }
    ],
    explanation: 'Selalu inisialisasi variabel. Di C, alokasi heap dengan calloc() lebih aman dari malloc() karena otomatis mengisi memori dengan angka 0.'
  }
};
