import { CyberSecModule } from '../../../types';

export const defaultConfigsModule: CyberSecModule = {
  id: 'default-configs',
  slug: 'default-configs',
  title: 'Common Default Configurations',
  category: 'Infrastructure Hardening',
  description: 'Mencegah kerentanan yang muncul dari kredensial bawaan pabrik dan konfigurasi awal.',
  sections: [
    {
      id: 'concept',
      title: 'Bahaya Kredensial "admin:admin"',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Banyak perangkat keras (seperti router) maupun perangkat lunak (seperti CMS, Tomcat, Jenkins) memiliki kredensial bawaan agar mudah diatur pertama kali.'
        },
        {
          id: '2',
          type: 'text',
          content: 'Jika administrator lupa mengganti konfigurasi ini, aplikasi tersebut akan menjadi target empuk bagi bot otomatis (seperti Mirai botnet) yang terus memindai internet mencari target dengan password default.'
        }
      ]
    },
    {
      id: 'mitigation',
      title: 'Tindakan Mitigasi',
      blocks: [
        {
          id: '3',
          type: 'text',
          content: 'Beberapa langkah penting yang wajib dilakukan setelah instalasi:'
        },
        {
          id: '4',
          type: 'code',
          content: `# Untuk MySQL/MariaDB, selalu jalankan:\nmysql_secure_installation\n\n# Ini akan menghapus user anonim, mendisable remote root login, dan menghapus database test.`,
          metadata: { language: 'bash' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_default_1',
    type: 'mcq',
    question: 'Mana dari perintah berikut yang paling direkomendasikan dijalankan setelah menginstal MySQL server untuk menghapus konfigurasi default yang tidak aman?',
    options: [
      { id: '1', text: 'mysql_harden_db', isCorrect: false },
      { id: '2', text: 'mysql_secure_installation', isCorrect: true },
      { id: '3', text: 'systemctl secure mariadb', isCorrect: false },
      { id: '4', text: 'mysql -u root -p default_drop', isCorrect: false }
    ],
    explanation: 'mysql_secure_installation adalah script interaktif yang menuntun Anda mengamankan MySQL server secara otomatis.'
  }
};
