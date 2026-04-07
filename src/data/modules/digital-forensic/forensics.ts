import { CyberSecModule } from '../../../types';

export const fileCarvingModule: CyberSecModule = {
  id: 'file-carving',
  slug: 'file-carving',
  title: 'File Carving',
  category: 'Digital Forensic',
  description: 'Mengekstrak file tersembunyi atau terhapus dari raw data (seperti image disk atau file biner) menggunakan struktur file signature (magic bytes).',
  sections: [
    {
      id: 'magic-bytes',
      title: 'Apa itu Magic Bytes?',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Sistem operasi sebenarnya tidak terlalu mempedulikan ekstensi file (seperti `.jpg` atau `.pdf`). Untuk mengenali jenis file yang sebenarnya, OS dan aplikasi membaca byte pertama di file tersebut, yang disebut sebagai **Magic Bytes** (File Signature).'
        },
        {
          id: '2',
          type: 'alert',
          content: 'Contoh Magic Bytes umum (dalam Hex):\n- JPEG: `FF D8 FF E0`\n- PNG: `89 50 4E 47 0D 0A 1A 0A`\n- PDF: `25 50 44 46` (%PDF)',
          metadata: { type: 'info' }
        }
      ]
    },
    {
      id: 'carving-tools',
      title: 'Tools: Binwalk, Foremost, dan PhotoRec',
      blocks: [
        {
          id: '3',
          type: 'text',
          content: '**File Carving** adalah proses membaca file mentah (seperti file dump firmware, atau file `.pcap`, atau disk image), mencari magic bytes di dalamnya, lalu mengekstrak datanya.'
        },
        {
          id: '4',
          type: 'code',
          content: `# Binwalk sering digunakan untuk mengekstrak firmware\nbinwalk -e firmware.bin\n\n# Foremost hebat dalam mengekstrak gambar/dokumen dari disk image\nforemost -i sda.img -o output_dir`,
          metadata: { language: 'bash' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_carving_1',
    type: 'mcq',
    question: 'Jika Anda menemukan ekstensi file bernama "rahasia.txt" tetapi ketika dibaca menggunakan tool hexdump, byte awalnya menunjukkan "89 50 4E 47". Sebenarnya format file apakah itu?',
    options: [
      { id: '1', text: 'Text File (.txt)', isCorrect: false },
      { id: '2', text: 'JPEG Image', isCorrect: false },
      { id: '3', text: 'PNG Image', isCorrect: true },
      { id: '4', text: 'PDF Document', isCorrect: false }
    ],
    explanation: '89 50 4E 47 adalah representasi hex dari file signature PNG.'
  }
};

export const networkForensicModule: CyberSecModule = {
  id: 'network-forensic',
  slug: 'network-forensic',
  title: 'Network Forensic (PCAP)',
  category: 'Digital Forensic',
  description: 'Menganalisis file Packet Capture (PCAP) untuk merekonstruksi ulang serangan atau aktivitas di jaringan.',
  sections: [
    {
      id: 'pcap',
      title: 'Packet Capture',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Tools seperti Wireshark dan tcpdump digunakan untuk menangkap lalu lintas jaringan dan menyimpannya dalam format `.pcap` atau `.pcapng`.'
        },
        {
          id: '2',
          type: 'text',
          content: 'Dalam Network Forensics, Anda akan membuka file PCAP ini untuk melihat persis data apa yang dikirimkan. Misalnya, membaca password HTTP POST yang tidak terenkripsi, mengekstrak file (Export Objects), atau membedah komunikasi Command & Control (C2) dari Malware.'
        }
      ]
    },
    {
      id: 'wireshark-filters',
      title: 'Filter Esensial Wireshark',
      blocks: [
        {
          id: '3',
          type: 'code',
          content: `http.request.method == "POST"   # Hanya tampilkan POST request\nhttp.cookie contains "session" # Cari cookie tertentu\ntcp.port == 21                 # Lihat trafik FTP (port 21)`,
          metadata: { language: 'bash' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_netfor_1',
    type: 'mcq',
    question: 'Anda sedang menganalisis file PCAP dan ingin mengekstrak (Export) sebuah gambar yang didownload oleh korban melalui HTTP. Fitur Wireshark apa yang paling tepat digunakan?',
    options: [
      { id: '1', text: 'Follow TCP Stream', isCorrect: false },
      { id: '2', text: 'File -> Export Objects -> HTTP', isCorrect: true },
      { id: '3', text: 'Statistics -> Endpoint', isCorrect: false },
      { id: '4', text: 'Apply as Filter -> Selected', isCorrect: false }
    ],
    explanation: 'Export Objects -> HTTP memungkinkan Anda mengunduh/menyimpan kembali file-file utuh yang ditransfer selama sesi HTTP yang direkam.'
  }
};

export const memoryForensicModule: CyberSecModule = {
  id: 'memory-forensic',
  slug: 'memory-forensic',
  title: 'Memory Forensic',
  category: 'Digital Forensic',
  description: 'Menganalisis Memory (RAM) dump untuk menemukan proses tersembunyi, malware, dan kunci enkripsi menggunakan Volatility.',
  sections: [
    {
      id: 'volatile-data',
      title: 'Sifat Volatile RAM',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'RAM adalah *Volatile Memory*, artinya datanya akan hilang begitu komputer dimatikan. Banyak malware tingkat lanjut (seperti Rootkit atau Fileless Malware) HANYA beroperasi di RAM untuk menghindari deteksi Antivirus berbasis disk.'
        },
        {
          id: '2',
          type: 'text',
          content: 'Oleh karena itu, tindakan pertama saat merespons insiden (Incident Response) pada komputer yang masih menyala adalah melakukan Memory Dump (contoh ekstensi `.vmem` atau `.raw` atau `.mem`).'
        }
      ]
    },
    {
      id: 'volatility',
      title: 'The Volatility Framework',
      blocks: [
        {
          id: '3',
          type: 'text',
          content: '**Volatility** adalah standar industri untuk analisis memori. Anda dapat menjalankan command/plugin untuk membedah dump RAM.'
        },
        {
          id: '4',
          type: 'code',
          content: `python3 vol.py -f dump.mem windows.pslist     # Lihat daftar proses\npython3 vol.py -f dump.mem windows.netscan    # Lihat koneksi jaringan yang aktif\npython3 vol.py -f dump.mem windows.hashdump   # Ekstrak password hash NT dari memori`,
          metadata: { language: 'bash' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_mem_1',
    type: 'mcq',
    question: 'Kenapa Analis Forensik harus melakukan Memory Dump *sebelum* mematikan (shutdown) komputer korban yang dicurigai terinfeksi?',
    options: [
      { id: '1', text: 'Karena hard disk akan terkunci secara otomatis.', isCorrect: false },
      { id: '2', text: 'Untuk mencegah kerusakan fisik pada motherboard.', isCorrect: false },
      { id: '3', text: 'Data di dalam RAM (seperti proses malware yang berjalan dan kunci dekripsi) akan hilang saat power diputus.', isCorrect: true },
      { id: '4', text: 'Untuk mempercepat proses imaging hard disk.', isCorrect: false }
    ],
    explanation: 'RAM adalah memori volatile. Mematikannya akan menghapus semua bukti berharga yang hanya ada di memori.'
  }
};
