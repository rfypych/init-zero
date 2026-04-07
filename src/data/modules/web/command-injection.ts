import { CyberSecModule } from '../../../types';

export const commandInjectionModule: CyberSecModule = {
  id: 'command-injection',
  slug: 'command-injection',
  title: 'Command Injection',
  category: 'Web Exploitation',
  description: 'Mengeksploitasi fitur web yang menjalankan perintah sistem operasi di backend.',
  sections: [
    {
      id: 'concept',
      title: 'Menyisipkan Perintah Ilegal',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Terkadang aplikasi web perlu berinteraksi langsung dengan sistem operasi server. Contoh klasik adalah fitur "Ping" atau "Network Diagnostic" pada router rumah Anda.'
        },
        {
          id: '2',
          type: 'text',
          content: 'Jika developer tidak berhati-hati dan meneruskan input Anda langsung ke fungsi seperti `system()`, `exec()`, atau `shell_exec()`, hacker dapat menyisipkan perintah Linux berbahaya menggunakan karakter separator shell.'
        },
        {
          id: '3',
          type: 'alert',
          content: 'Karakter separator yang sering digunakan: `;` (titik koma), `&&` (AND), `||` (OR), dan `|` (Pipe).',
          metadata: { type: 'warning' }
        }
      ]
    },
    {
      id: 'interactive-simulator',
      title: 'Lab Interaktif: Router Ping Tool',
      blocks: [
        {
          id: '4',
          type: 'text',
          content: 'Aplikasi di bawah ini mengeksekusi `ping -c 1 <input>`. Coba tambahkan separator shell (misalnya `;`) untuk menjalankan perintah kedua seperti `ls`.'
        },
        {
          id: '5',
          type: 'interactive',
          content: 'MockCmdInjection',
          metadata: { component: 'MockCmdInjection' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_cmd_1',
    type: 'flag_submission',
    question: 'Eksploitasi alat Ping di atas untuk membaca isi dari file flag.txt. Masukkan flag yang Anda temukan:',
    flag: 'INIT0{cmd_1nj3ct10n_m4st3r}',
    explanation: 'Kerja bagus! Anda telah berhasil mengeksekusi Arbitrary Command Execution pada server target.'
  }
};
