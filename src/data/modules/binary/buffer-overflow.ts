import { CyberSecModule } from '../../../types';

export const bufferOverflowModule: CyberSecModule = {
  id: 'buffer-overflow',
  slug: 'buffer-overflow',
  title: 'Buffer Overflow',
  category: 'Binary Exploitation',
  description: 'Memahami bagaimana pengisian data yang melebihi kapasitas memori yang dialokasikan dapat membajak eksekusi program.',
  sections: [
    {
      id: 'concept',
      title: 'Mengenal Stack dan Buffer',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Dalam bahasa C/C++, programmer harus mengatur memori secara manual. "Buffer" adalah ruang memori sementara. Jika program mengalokasikan 10 byte untuk menampung input nama, tetapi user memasukkan 20 karakter, apa yang terjadi?'
        },
        {
          id: '2',
          type: 'text',
          content: 'Karakter berlebih (overflow) tersebut akan tumpah dan menimpa (overwrite) data penting lain di dalam RAM (Stack), salah satunya adalah **Instruction Pointer (EIP/RIP)**, yaitu penunjuk "kode apa yang harus dijalankan selanjutnya".'
        }
      ]
    },
    {
      id: 'anatomy',
      title: 'Kode C yang Rentan',
      blocks: [
        {
          id: '3',
          type: 'text',
          content: 'Perhatikan penggunaan fungsi `gets()`. Fungsi ini dikenal sangat berbahaya karena tidak mengecek panjang input sebelum memindahkannya ke dalam buffer.'
        },
        {
          id: '4',
          type: 'code',
          content: `#include <stdio.h>\n\nvoid secret_function() {\n    printf("FLAG: INIT0{B0F_1s_Aw3s0m3}\\n");\n}\n\nvoid login() {\n    char buffer[16];\n    printf("Enter password: ");\n    gets(buffer); // VULNERABLE: Tidak ada pengecekan batas!\n}\n\nint main() {\n    login();\n    return 0;\n}`,
          metadata: { language: 'c' }
        }
      ]
    },
    {
      id: 'interactive-simulator',
      title: 'Lab Interaktif: Source Code Analyzer',
      blocks: [
        {
          id: '5',
          type: 'text',
          content: 'Identifikasi baris mana pada kode C berikut yang menyebabkan kerentanan Buffer Overflow.'
        },
        {
          id: '6',
          type: 'interactive',
          content: 'MockCodeAnalyzer',
          metadata: {
            component: 'MockCodeAnalyzer',
            title: 'C Code Analyzer (login.c)',
            codeLines: [
              "void login() {",
              "    int access_granted = 0;",
              "    char buffer[16];",
              "",
              "    printf(\"Enter password: \");",
              "    gets(buffer);",
              "",
              "    if(strcmp(buffer, \"password123\") == 0) {",
              "        access_granted = 1;",
              "    }",
              "}"
            ],
            vulnerableLines: [5],
            explanation: "Fungsi gets() tidak melakukan bounds-checking. Jika user memasukkan 30 huruf 'A', isi variabel access_granted akan ikut tertimpa menjadi nilai selain 0 (True), sehingga menghasilkan kerentanan Authentication Bypass.",
            flag: "INIT0{N3v3r_Us3_g3ts_In_C}"
          }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_bof_1',
    type: 'flag_submission',
    question: 'Berdasarkan Lab Analisis Kode di atas, submit flag yang didapat setelah memilih baris yang rentan:',
    flag: 'INIT0{N3v3r_Us3_g3ts_In_C}',
    explanation: 'Selalu gunakan fungsi yang lebih aman dengan bounds-checking seperti fgets(buffer, sizeof(buffer), stdin) dalam bahasa C.'
  }
};
