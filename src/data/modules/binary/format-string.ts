import { CyberSecModule } from '../../../types';

export const formatStringModule: CyberSecModule = {
  id: 'format-string',
  slug: 'format-string',
  title: 'Format String Vulnerability',
  category: 'Binary Exploitation',
  description: 'Mengeksploitasi fungsi format output (seperti printf) untuk membocorkan informasi memori atau menulis data secara sewenang-wenang.',
  sections: [
    {
      id: 'concept',
      title: 'Kesalahan Memanggil Printf',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Fungsi `printf` di C sangat bergantung pada penentu format (format specifiers) seperti `%d` (integer) atau `%s` (string) untuk mengetahui variabel apa yang akan dicetak.'
        },
        {
          id: '2',
          type: 'text',
          content: 'Jika developer salah menulis kodenya dengan memasukkan input user langsung ke argumen pertama `printf`, maka user mengontrol "format" tersebut.'
        },
        {
          id: '3',
          type: 'code',
          content: `// AMAN:\nprintf("%s", user_input);\n\n// VULNERABLE (Format String Bug):\nprintf(user_input);`,
          metadata: { language: 'c' }
        }
      ]
    },
    {
      id: 'exploitation',
      title: 'Membocorkan Isi Memori',
      blocks: [
        {
          id: '4',
          type: 'text',
          content: 'Bila kode rentan, seorang hacker dapat memasukkan string seperti `%x %x %x`. Karena `printf` mengharapkan variabel tambahan yang *sebenarnya tidak ada* di kode, ia akan secara keliru mengambil nilai mentah dari Stack memory dan mencetaknya (Memory Leak).'
        },
        {
          id: '5',
          type: 'text',
          content: 'Lebih parah lagi, dengan specifier `%n`, hacker bisa **menulis** nilai ke memori dan membajak kontrol eksekusi.'
        }
      ]
    }
  ],
  quiz: {
    id: 'q_fmt_1',
    type: 'mcq',
    question: 'Jika suatu program memiliki kerentanan Format String dan Anda menginputkan "%x %x %x", apa yang akan dicetak oleh program tersebut?',
    options: [
      { id: '1', text: 'Program akan mencetak huruf "x x x".', isCorrect: false },
      { id: '2', text: 'Program akan langsung crash / Segmentation Fault.', isCorrect: false },
      { id: '3', text: 'Program akan mencetak nilai heksadesimal mentah yang sedang berada di dalam Stack memory.', isCorrect: true },
      { id: '4', text: 'Program akan mengeksekusi shell (/bin/sh).', isCorrect: false }
    ],
    explanation: '%x memerintahkan printf untuk mengambil variabel dari stack. Jika variabel tidak disuplai, ia tetap mengambil apa pun yang ada di stack saat itu.'
  }
};
