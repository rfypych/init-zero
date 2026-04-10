import { CyberSecModule } from '../../../types';

export const bufferOverflowModule: CyberSecModule = {
  id: 'buffer-overflow',
  slug: 'buffer-overflow',
  title: 'Buffer Overflow',
  category: 'Binary Exploitation',
  description: 'Memahami bagaimana pengisian data yang melebihi kapasitas memori yang dialokasikan dapat membajak eksekusi program (Return Address Overwrite).',
  sections: [
    {
      id: 'objective',
      title: 'Mission Objective',
      blocks: [
        {
          id: '1',
          type: 'alert',
          content: 'Target: Binary login program (C language).\nGoal: Memaksa program memberikan akses "Granted" tanpa password yang benar.',
          metadata: { type: 'warning' }
        }
      ]
    },
    {
      id: 'concept',
      title: 'The Vulnerability (TL;DR)',
      blocks: [
        {
          id: '2',
          type: 'text',
          content: 'Dalam bahasa tingkat rendah seperti C dan C++, program mengalokasikan ruang memori statis bernama **Buffer**. Misalnya, membuat `char nama[10]` akan menyiapkan tepat 10 byte ruang untuk teks.'
        },
        {
          id: '3',
          type: 'text',
          content: 'Apa yang terjadi jika fungsi yang membaca input tidak mengecek panjangnya, lalu pengguna mengetik 30 karakter? Karakter berlebih itu (Overflow) akan "tumpah" ke luar ruang buffer.'
        }
      ]
    },
    {
      id: 'anatomy',
      title: 'Memory Stack Overwrite',
      blocks: [
        {
          id: '4',
          type: 'text',
          content: 'Bahayanya terletak pada **Memori Stack**. Di dalam Stack, variabel buffer Anda (misalnya password) bersebelahan letaknya dengan variabel kritis lain, bahkan berdekatan dengan **Instruction Pointer (EIP/RIP)** (alamat yang memberitahu CPU kode mana yang harus dijalankan setelah fungsi ini selesai).'
        },
        {
          id: '5',
          type: 'code',
          content: `// Stack Memory Layout (Secara visual):
[ Variabel Lain (access_granted) ] <- Tumpahan masuk ke sini!
[ Buffer 'nama' (10 bytes)       ] <- Kita isi dengan 30 bytes
[ ... ]`,
          metadata: { language: 'text' }
        },
        {
          id: '6',
          type: 'text',
          content: 'Dengan mengisi buffer sampai meluap, Anda bisa menimpa (overwrite) variabel "access_granted" (mengubah nilainya menjadi 1/True) atau bahkan mengendalikan EIP untuk melompat ke alamat memori lain (misalnya fungsi rahasia `win()`).'
        }
      ]
    },
    {
      id: 'real-world-ctf',
      title: 'Real-World CTF Approach (Pwntools)',
      blocks: [
        {
          id: '7',
          type: 'text',
          content: 'Dalam kompetisi CTF, jika Anda diberikan file binary (`.elf`) dan IP server rentan (via `nc` / netcat), langkah pertama adalah membukanya di GDB untuk mencari *offset* pastinya. Setelah ketemu berapa byte yang dibutuhkan untuk "crash" di EIP, Anda akan menggunakan **pwntools** (Python).'
        },
        {
          id: '8',
          type: 'code',
          content: `from pwn import *\n\n# Konek ke server panitia\n# p = process('./login') # Untuk tes lokal\np = remote('10.10.10.50', 1337)\n\n# Payload: 16 byte sampah ("A") + 4 byte Overwrite "1" ke variabel\npayload = b"A" * 16 + p32(0x1)\n\n# Kirim payload\np.sendline(payload)\n\n# Dapatkan shell interaktif\np.interactive()`,
          metadata: { language: 'python' }
        }
      ]
    },
    {
      id: 'interactive-simulator',
      title: 'Live Lab: Code Analysis',
      blocks: [
        {
          id: '9',
          type: 'text',
          content: 'Perhatikan program C di bawah. Tujuan utamanya adalah masuk dengan mencocokkan password (menggunakan `strcmp`). Namun, programmer menggunakan fungsi yang tidak aman. Carilah baris mana yang merusak bounds checking.'
        },
        {
          id: '10',
          type: 'interactive',
          content: 'MockCodeAnalyzer',
          metadata: {
            component: 'MockCodeAnalyzer',
            title: 'C Code Analyzer (login_bof.c)',
            codeLines: [
              "void login() {",
              "    int access_granted = 0;",
              "    char buffer[16];",
              "",
              "    printf(\"Enter password: \");",
              "    gets(buffer); // VULNERABLE: gets() reads until newline",
              "",
              "    if(strcmp(buffer, \"SuperSecretP@ss\") == 0) {",
              "        access_granted = 1;",
              "    }",
              "",
              "    if(access_granted) {",
              "        give_shell();",
              "    }",
              "}"
            ],
            vulnerableLines: [5],
            explanation: "Fungsi gets() dari library C standard tidak melakukan pengecekan batas maksimum input. Jika pengguna memasukkan string yang lebih panjang dari ukuran array `buffer` (16 bytes), string tersebut akan menimpa (overwrite) variabel yang ada di sebelahnya di memori (dalam hal ini `access_granted`), yang mengakibatkan hacker bisa mengubah nilai `access_granted` menjadi apa pun (bypass password check).",
            flag: "INIT0{N3v3r_Us3_g3ts_In_C}"
          }
        }
      ]
    },
    {
      id: 'mitigation',
      title: 'The Fix (Mitigasi)',
      blocks: [
        {
          id: '11',
          type: 'text',
          content: 'Sangat disarankan untuk berhenti menggunakan fungsi-fungsi berisiko di C (seperti `gets`, `strcpy`, `strcat`, `sprintf`). Gantilah dengan fungsi yang mewajibkan penentuan batas maksimum panjang buffer.'
        },
        {
          id: '12',
          type: 'code',
          content: `// Contoh mitigasi menggunakan fgets() daripada gets()\nfgets(buffer, sizeof(buffer), stdin);\n\n// Atau menggunakan strncpy() daripada strcpy()\nstrncpy(dest, src, sizeof(dest) - 1);\ndest[sizeof(dest) - 1] = '\\0';`,
          metadata: { language: 'c' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_bof_1',
    type: 'flag_submission',
    question: 'Berdasarkan Lab Code Analysis di atas, submit flag yang didapat setelah memilih dan memahami baris kode yang menyebabkan kerentanan Buffer Overflow (BoF):',
    flag: 'INIT0{N3v3r_Us3_g3ts_In_C}',
    hints: ['Fungsi `printf` dan `strcmp` aman digunakan asalkan parameternosnya benar.', 'Perhatikan fungsi di baris ke-6. Fungsi ini membaca input user tanpa batas maksimal.', 'Pilih baris yang mengandung fungsi `gets(buffer);` lalu klik tombol Submit Analysis merah di kanan atas.'],
    explanation: 'Target Compromised! Ingatlah, memori stack bukan hanya menyimpan variabel lokal, tapi juga alamat balik eksekusi (Return Address). Jika buffer overflow menimpa Return Address, program akan melompat dan mengeksekusi instruksi dari alamat memori acak pilihan si penyerang.'
  }
};
