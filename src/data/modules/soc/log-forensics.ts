import { CyberSecModule } from '../../../types';

export const logForensicsModule: CyberSecModule = {
  id: 'log-forensics',
  slug: 'log-forensics',
  title: 'Log Forensics',
  category: 'SOC',
  description: 'Menganalisis file log sistem/web untuk menemukan jejak intrusi atau serangan.',
  sections: [
    {
      id: 'concept',
      title: 'Mata Seorang Analis SOC',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Seorang analis Security Operations Center (SOC) sering kali berhadapan dengan ribuan bahkan jutaan baris teks log. File log seperti `access.log` di Nginx/Apache adalah sumber kebenaran (source of truth) dari lalu lintas jaringan Anda.'
        },
        {
          id: '2',
          type: 'text',
          content: 'Tugas forensik melibatkan pencarian pola (Pattern Matching). Misalnya, anomali jumlah request, response code yang tidak wajar, atau payload berbahaya di URL parameter.'
        }
      ]
    },
    {
      id: 'http-codes',
      title: 'Memahami HTTP Status Code',
      blocks: [
        {
          id: '3',
          type: 'alert',
          content: 'Penting untuk mengingat arti kode status HTTP saat menganalisis log:\n- 200: OK (Berhasil)\n- 401: Unauthorized (Gagal login/akses ditolak)\n- 403: Forbidden (Hak akses tidak cukup)\n- 404: Not Found (File tidak ada)\n- 500: Internal Server Error (Aplikasi backend crash)',
          metadata: { type: 'info' }
        }
      ]
    },
    {
      id: 'interactive-simulator',
      title: 'Lab Interaktif: Brute Force Detection',
      blocks: [
        {
          id: '4',
          type: 'text',
          content: 'Sebagai analis SOC, periksa cuplikan log di bawah ini. Cari bukti kuat yang menunjukkan adanya serangan Brute Force terhadap halaman admin.'
        },
        {
          id: '5',
          type: 'interactive',
          content: 'MockLogAnalyzer',
          metadata: { component: 'MockLogAnalyzer' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_soc_1',
    type: 'flag_submission',
    question: 'Berdasarkan keberhasilan Anda mengidentifikasi pola serangan pada simulator, masukkan flag hadiah dari analisis tersebut!',
    flag: 'INIT0{L0g_Hunt3r_M4st3r}',
    explanation: 'Log Forensics membutuhkan ketelitian tinggi. Dalam skenario dunia nyata, alat SIEM seperti Splunk atau Elastic Security akan secara otomatis melakukan alerting jika mendeteksi pola 401 dalam jumlah banyak seperti ini.'
  }
};
