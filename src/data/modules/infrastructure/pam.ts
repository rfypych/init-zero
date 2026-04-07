import { CyberSecModule } from '../../../types';

export const pamModule: CyberSecModule = {
  id: 'linux-pam',
  slug: 'linux-pam',
  title: 'Privileged Access Management (PAM)',
  category: 'Infrastructure Hardening',
  description: 'Mengkonfigurasi Pluggable Authentication Modules (PAM) di Linux untuk memperkuat keamanan sistem autentikasi.',
  sections: [
    {
      id: 'concept',
      title: 'Apa itu Linux PAM?',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'PAM (Pluggable Authentication Modules) adalah kerangka kerja di Linux yang menangani **semua hal terkait autentikasi**. Daripada setiap aplikasi (seperti `login`, `ssh`, `su`) menulis kode autentikasi sendiri-sendiri, mereka semua mengandalkan modul PAM.'
        },
        {
          id: '2',
          type: 'text',
          content: 'File konfigurasi utama PAM terletak di direktori `/etc/pam.d/`. Salah satu file yang paling sering dikonfigurasi oleh SysAdmin adalah `common-password`, yang mengatur aturan pembuatan password.'
        }
      ]
    },
    {
      id: 'hardening',
      title: 'Hardening Policy Password',
      blocks: [
        {
          id: '3',
          type: 'text',
          content: 'Untuk mencegah brute-force dan tebakan password, kita bisa mewajibkan password yang kuat menggunakan modul `pam_pwquality.so`.'
        },
        {
          id: '4',
          type: 'code',
          content: 'password requisite pam_pwquality.so retry=3 minlen=12 dcredit=-1 ucredit=-1 lcredit=-1 ocredit=-1',
          metadata: { language: 'bash' }
        },
        {
          id: '5',
          type: 'text',
          content: 'Penjelasan parameter:\n- `minlen=12` : Minimal panjang password adalah 12 karakter\n- `dcredit=-1` : Wajib minimal 1 angka (digit)\n- `ucredit=-1` : Wajib minimal 1 huruf besar (uppercase)\n- `lcredit=-1` : Wajib minimal 1 huruf kecil (lowercase)\n- `ocredit=-1` : Wajib minimal 1 karakter spesial (other)'
        }
      ]
    },
    {
      id: 'interactive-simulator',
      title: 'Lab Interaktif: PAM Editor',
      blocks: [
        {
          id: '6',
          type: 'text',
          content: 'Edit file konfigurasi `/etc/pam.d/common-password` di bawah ini. Tambahkan parameter yang diwajibkan untuk mengamankan sistem. Target Anda adalah membuat konfigurasi yang mewajibkan `minlen` â¥ 12, wajib ada angka, dan wajib ada huruf besar.'
        },
        {
          id: '7',
          type: 'interactive',
          content: 'MockPAMConfig',
          metadata: { component: 'MockPAMConfig' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_pam_1',
    type: 'flag_submission',
    question: 'Terapkan hardening pada simulator PAM di atas agar memunculkan flag keamanan.',
    flag: 'INIT0{P4M_S3cur3d_B0y}',
    explanation: 'Kerja bagus! Hardening PAM adalah langkah fundamental pertama dalam mengamankan server Linux.'
  }
};
