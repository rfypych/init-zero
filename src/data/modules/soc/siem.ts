import { CyberSecModule } from '../../../types';

export const siemModule: CyberSecModule = {
  id: 'siem-utilization',
  slug: 'siem-utilization',
  title: 'SIEM Utilization',
  category: 'SOC',
  description: 'Pemanfaatan Security Information and Event Management (SIEM) untuk korelasi dan deteksi ancaman.',
  sections: [
    {
      id: 'what-is-siem',
      title: 'Apa itu SIEM?',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Menganalisis file log secara manual satu per satu sangat tidak mungkin di lingkungan enterprise besar. **SIEM (Security Information and Event Management)** hadir sebagai solusi.'
        },
        {
          id: '2',
          type: 'text',
          content: 'SIEM (seperti Splunk, Elastic Security, Wazuh) bekerja dengan cara mengumpulkan log dari ratusan server, firewall, dan aplikasi ke satu tempat sentral (Log Aggregation), lalu menormalkannya dan memberikan antarmuka pencarian yang terpadu.'
        }
      ]
    },
    {
      id: 'correlation',
      title: 'Event Correlation',
      blocks: [
        {
          id: '3',
          type: 'text',
          content: 'Kekuatan utama SIEM adalah *Korelasi Event*. SIEM dapat diatur dengan sebuah "Rule" (aturan) untuk membunyikan alarm (Alert) jika kondisi tertentu terpenuhi.'
        },
        {
          id: '4',
          type: 'alert',
          content: 'Contoh Rule:\nJIKA "Gagal login > 5 kali di Firewall VPN dari IP X"\nDAN DIIKUTI OLEH "Berhasil login di Active Directory dari IP X dalam waktu 5 menit"\nMAKA "Kirim Alert: Possible VPN Brute Force Success"',
          metadata: { type: 'warning' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_siem_1',
    type: 'mcq',
    question: 'Fungsi utama dari sistem SIEM di dalam Security Operations Center adalah...',
    options: [
      { id: '1', text: 'Melakukan patching otomatis pada kerentanan server.', isCorrect: false },
      { id: '2', text: 'Mengagregasi, mengkorelasikan log sentral, dan memicu alerting keamanan.', isCorrect: true },
      { id: '3', text: 'Mengenripsi data dalam transit pada jaringan publik.', isCorrect: false },
      { id: '4', text: 'Melakukan penetration testing otomatis secara berkala.', isCorrect: false }
    ],
    explanation: 'SIEM adalah "otak" pengumpulan log di SOC yang bertugas menghubungkan titik-titik antar log dari berbagai perangkat dan memberikan Alert.'
  }
};
