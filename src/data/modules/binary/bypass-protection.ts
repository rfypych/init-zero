import { LKSModule } from '../../../types';

export const bypassProtectionModule: LKSModule = {
  id: 'bypass-protection',
  slug: 'bypass-protection',
  title: 'Bypass Protection (PIE, CANARY, NX, RELRO)',
  category: 'Binary Exploitation',
  description: 'Memahami berbagai mekanisme pertahanan sistem operasi modern terhadap eksploitasi biner dan konsep dasar cara melewatinya.',
  sections: [
    {
      id: 'concept',
      title: 'Mekanisme Pertahanan Modern',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Seiring berkembangnya teknik Buffer Overflow, pembuat OS (Linux/Windows) menambahkan fitur keamanan agar eksploitasi biner (PWN) tidak semudah di era 90-an. Berikut adalah pertahanan utama yang wajib diketahui setiap pwner:'
        }
      ]
    },
    {
      id: 'protections',
      title: 'Empat Pilar Proteksi',
      blocks: [
        {
          id: '2',
          type: 'alert',
          content: '**NX (No-eXecute) / DEP**\nMemori Stack tidak lagi bisa dieksekusi. Hacker tidak bisa lagi menginjeksi Shellcode ke stack dan menjalankannya.\nBypass: ROP (Return Oriented Programming).',
          metadata: { type: 'info' }
        },
        {
          id: '3',
          type: 'alert',
          content: '**Stack Canary**\nNilai acak (cookie) diletakkan di sebelum Return Address. Jika buffer overflow terjadi, cookie ini akan ikut rusak dan program mendeteksi serangan lalu abort.\nBypass: Leak nilai Canary terlebih dahulu menggunakan Format String bug, lalu susun ulang di payload Bof.',
          metadata: { type: 'info' }
        },
        {
          id: '4',
          type: 'alert',
          content: '**ASLR & PIE (Position Independent Executable)**\nAlamat memori dari program dan libc akan diacak setiap kali dijalankan.\nBypass: Cari Memory Leak untuk menghitung Base Address.',
          metadata: { type: 'info' }
        },
        {
          id: '5',
          type: 'alert',
          content: '**RELRO (Relocation Read-Only)**\nMencegah eksploitasi GOT (Global Offset Table) overwrite dengan membuatnya bersifat read-only setelah diinisialisasi.\nBypass: Overwrite alamat lain (seperti malloc_hook) jika Full RELRO.',
          metadata: { type: 'info' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_prot_1',
    type: 'mcq',
    question: 'Teknik "Return Oriented Programming" (ROP) utamanya diciptakan untuk mem-bypass (melewati) proteksi jenis apa?',
    options: [
      { id: '1', text: 'Stack Canary', isCorrect: false },
      { id: '2', text: 'ASLR', isCorrect: false },
      { id: '3', text: 'NX (No-Execute) / DEP', isCorrect: true },
      { id: '4', text: 'RELRO', isCorrect: false }
    ],
    explanation: 'Karena NX mencegah eksekusi shellcode di stack, ROP mendaur ulang instruksi-instruksi (gadgets) yang sudah ada di area memori eksekutabel program itu sendiri (seperti libc) dengan memanipulasi rentetan alamat return.'
  }
};
