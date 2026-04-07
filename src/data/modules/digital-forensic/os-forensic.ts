import { CyberSecModule } from '../../../types';

export const osForensicModule: CyberSecModule = {
  id: 'os-forensic',
  slug: 'os-forensic',
  title: 'OS Forensic',
  category: 'Digital Forensic',
  description: 'Menggali jejak digital (artifacts) yang ditinggalkan oleh pengguna dan sistem pada sistem operasi Windows dan Linux.',
  sections: [
    {
      id: 'artifacts',
      title: 'Digital Artifacts',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Sistem Operasi tanpa sadar merekam banyak hal yang Anda lakukan. "Jejak" ini disebut Digital Artifacts. Ini sangat berguna untuk membuktikan kapan pengguna membuka file tertentu atau perangkat USB apa yang pernah ditancapkan.'
        }
      ]
    },
    {
      id: 'windows-artifacts',
      title: 'Windows Artifacts',
      blocks: [
        {
          id: '2',
          type: 'alert',
          content: 'Lokasi forensik kunci di Windows:\n- Prefetch (`C:\\Windows\\Prefetch\\`): Bukti kapan terakhir sebuah aplikasi dijalankan.\n- Registry (`NTUSER.DAT` / `SOFTWARE` / `SYSTEM`): Pengaturan, daftar software, USB History.\n- Event Logs (`.evtx`): Catatan login dan error sistem.\n- LNK Files / Jump Lists: Bukti file atau folder yang baru saja dibuka pengguna.',
          metadata: { type: 'info' }
        }
      ]
    },
    {
      id: 'browser-forensic',
      title: 'Browser Forensic',
      blocks: [
        {
          id: '3',
          type: 'text',
          content: 'Browser modern (Chrome, Firefox, Edge) umumnya menggunakan database SQLite untuk menyimpan riwayat (history), cookies, daftar unduhan, dan cache.'
        },
        {
          id: '4',
          type: 'code',
          content: `# Lokasi history Chrome di Windows:\n%LOCALAPPDATA%\\Google\\Chrome\\User Data\\Default\\History\n\n# Buka file tersebut dengan DB Browser for SQLite untuk melihat isinya.`,
          metadata: { language: 'bash' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_os_1',
    type: 'mcq',
    question: 'Di OS Windows, lokasi Artifact mana yang paling tepat untuk diperiksa jika analis ingin mengetahui aplikasi (executable) apa saja yang telah dieksekusi (dijalankan) oleh user beserta waktu pelaksanaannya?',
    options: [
      { id: '1', text: 'C:\\Windows\\System32\\', isCorrect: false },
      { id: '2', text: 'Recycle Bin', isCorrect: false },
      { id: '3', text: 'Prefetch Files', isCorrect: true },
      { id: '4', text: 'Browser Cookies', isCorrect: false }
    ],
    explanation: 'Windows OS secara otomatis membuat file Prefetch (.pf) saat sebuah aplikasi dijalankan untuk mempercepat load time di masa depan. Ini adalah ladang emas bagi analis forensik.'
  }
};
