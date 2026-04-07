import { CyberSecModule } from '../../../types';

export const staticAnalysisModule: CyberSecModule = {
  id: 'static-analysis',
  slug: 'static-analysis',
  title: 'Static Analysis & z3 Theorem Prover',
  category: 'Reverse Engineering',
  description: 'Menganalisis file binary tanpa menjalankannya menggunakan Disassembler dan Decompiler.',
  sections: [
    {
      id: 'concept',
      title: 'Membaca Bahasa Mesin',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Reverse Engineering (RE) adalah seni membongkar program kompilasi kembali menjadi bentuk asalnya untuk memahami logikanya.'
        },
        {
          id: '2',
          type: 'text',
          content: '**Static Analysis** dilakukan menggunakan alat seperti **IDA Pro**, **Ghidra**, atau **Binary Ninja**. Alat ini memiliki dua fitur utama:\n- **Disassembler**: Menerjemahkan byte mesin mentah menjadi instruksi Assembly (seperti MOV, PUSH, CMP).\n- **Decompiler**: Berusaha mengubah Assembly tersebut kembali menjadi "Pseudo-C" (mirip bahasa C tingkat tinggi).'
        }
      ]
    },
    {
      id: 'z3',
      title: 'Menyelesaikan Alogaritma dengan z3',
      blocks: [
        {
          id: '3',
          type: 'text',
          content: 'Di kompetisi CTF, sering kali Anda menemukan program yang mengecek flag dengan persamaan matematika yang rumit (contoh: `flag[0] * 5 + flag[1] == 120`). Memecahkannya secara manual sangat sulit.'
        },
        {
          id: '4',
          type: 'text',
          content: '**z3 Theorem Prover** (library Python buatan Microsoft) sangat diandalkan. Anda tinggal memasukkan batasan-batasannya (constraints) ke script Python, dan z3 akan menghitung nilai flag secara otomatis (Constraint Solving).'
        }
      ]
    }
  ],
  quiz: {
    id: 'q_re1_1',
    type: 'mcq',
    question: 'Alat sumber terbuka (Open Source) gratis yang dikembangkan oleh NSA (National Security Agency) yang sangat populer digunakan untuk dekompilasi binary adalah?',
    options: [
      { id: '1', text: 'IDA Pro', isCorrect: false },
      { id: '2', text: 'Ghidra', isCorrect: true },
      { id: '3', text: 'x64dbg', isCorrect: false },
      { id: '4', text: 'OllyDbg', isCorrect: false }
    ],
    explanation: 'Ghidra merubah lanskap Reverse Engineering karena menyediakan decompiler gratis yang sebelumnya hanya tersedia di software mahal seperti IDA Pro berbayar.'
  }
};

export const dynamicAnalysisModule: CyberSecModule = {
  id: 'dynamic-analysis',
  slug: 'dynamic-analysis',
  title: 'Dynamic Analysis (GDB) & Anti-RE',
  category: 'Reverse Engineering',
  description: 'Membedah perilaku program secara langsung saat berjalan menggunakan Debugger.',
  sections: [
    {
      id: 'concept',
      title: 'Menjalankan Kode Baris per Baris',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: '**Dynamic Analysis** berarti menjalankan program dalam sebuah **Debugger** (seperti GDB di Linux atau x64dbg di Windows). Ini memungkinkan Anda menghentikan sementara program (Breakpoint), melihat isi memori/register, dan mengubah aliran eksekusi saat itu juga (misal: melewati pengecekan password).'
        }
      ]
    },
    {
      id: 'anti-re',
      title: 'Teknik Anti-Debugging (Anti-RE)',
      blocks: [
        {
          id: '2',
          type: 'text',
          content: 'Pembuat malware atau software berbayar tidak ingin kodenya dibedah. Mereka menanamkan jebakan:'
        },
        {
          id: '3',
          type: 'code',
          content: `// Contoh Anti-Debug ptrace di Linux\nif (ptrace(PTRACE_TRACEME, 0, 1, 0) < 0) {\n    printf("Debugger terdeteksi! Abort.\\n");\n    exit(1);\n}`,
          metadata: { language: 'c' }
        },
        {
          id: '4',
          type: 'text',
          content: 'Linux tidak mengizinkan satu program di-trace oleh dua debugger. Jika `ptrace` gagal, program tahu dia sedang berjalan di dalam GDB. Cara bypass-nya adalah dengan menambal (Patch) binary atau mengubah nilai return `ptrace` secara dinamis di GDB.'
        }
      ]
    }
  ],
  quiz: {
    id: 'q_re2_1',
    type: 'mcq',
    question: 'Di lingkungan GDB/pwndbg, perintah apa yang umum digunakan untuk menghentikan eksekusi program tepat saat fungsi "main" dimulai?',
    options: [
      { id: '1', text: 'stop at main', isCorrect: false },
      { id: '2', text: 'break main', isCorrect: true },
      { id: '3', text: 'run main', isCorrect: false },
      { id: '4', text: 'step into main', isCorrect: false }
    ],
    explanation: 'Perintah "break" (atau "b") diikuti nama fungsi atau alamat memori digunakan untuk memasang Breakpoint.'
  }
};

export const architectureModule: CyberSecModule = {
  id: 'architecture',
  slug: 'architecture',
  title: 'Architecture & Low Level Formats',
  category: 'Reverse Engineering',
  description: 'Memahami format file biner (ELF/PE) dan arsitektur CPU utama (x86_64, ARM).',
  sections: [
    {
      id: 'formats',
      title: 'PE (Windows) vs ELF (Linux)',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'File biner bukan sekadar kode mesin; mereka memiliki "amplop" yang memberi tahu OS cara memuatnya ke memori.'
        },
        {
          id: '2',
          type: 'alert',
          content: '**PE (Portable Executable)**: Format .exe dan .dll di Windows.\n**ELF (Executable and Linkable Format)**: Format eksekutabel, .so, dan core dump di Linux.',
          metadata: { type: 'info' }
        }
      ]
    },
    {
      id: 'arch',
      title: 'x86_64 vs ARM',
      blocks: [
        {
          id: '3',
          type: 'text',
          content: '**x86_64 (CISC)**: Arsitektur CPU PC/Server Intel & AMD. Jumlah instruksi sangat banyak dan panjang byte-nya bervariasi. Menggunakan register seperti RAX, RBX, RCX.'
        },
        {
          id: '4',
          type: 'text',
          content: '**ARM (RISC)**: Arsitektur CPU Mobile (Android/iOS) dan Mac modern (M1/M2). Instruksi berukuran tetap (biasanya 4 bytes). Menggunakan register bernomor seperti R0, R1, R2, X0, X1.'
        }
      ]
    }
  ],
  quiz: {
    id: 'q_re3_1',
    type: 'mcq',
    question: 'Di arsitektur x86_64 Linux (System V ABI), saat sebuah fungsi dipanggil, argumen pertama dari fungsi tersebut disimpan di register mana?',
    options: [
      { id: '1', text: 'RAX', isCorrect: false },
      { id: '2', text: 'RSP', isCorrect: false },
      { id: '3', text: 'RDI', isCorrect: true },
      { id: '4', text: 'Stack (Push)', isCorrect: false }
    ],
    explanation: 'Calling convention x86_64 di Linux menggunakan register untuk argumen fungsi secara berurutan: RDI, RSI, RDX, RCX, R8, R9. Memahami ini penting saat membaca assembly.'
  }
};
