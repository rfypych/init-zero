import { CyberSecModule } from '../../../types';

export const networkSecurityModule: CyberSecModule = {
  id: 'network-service-security',
  slug: 'network-service-security',
  title: 'Network Service Security',
  category: 'Infrastructure Hardening',
  description: 'Menerapkan protokol komunikasi yang aman seperti SSH dan menonaktifkan protokol jadul (Telnet, FTP).',
  sections: [
    {
      id: 'concept',
      title: 'Clear Text vs Encrypted',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Protokol lama seperti FTP, Telnet, dan HTTP biasa mengirimkan data dalam bentuk *clear-text*. Ini berarti siapa pun yang berada di jaringan yang sama dapat melakukan *Sniffing* (menggunakan Wireshark/tcpdump) dan membaca username serta password Anda secara langsung.'
        },
        {
          id: '2',
          type: 'alert',
          content: 'Solusinya selalu gunakan versi enkripsinya:\n- Telnet -> SSH\n- FTP -> SFTP / FTPS\n- HTTP -> HTTPS (TLS)\n- POP3/IMAP -> POP3S/IMAPS',
          metadata: { type: 'info' }
        }
      ]
    },
    {
      id: 'ssh-hardening',
      title: 'Hardening Konfigurasi SSH',
      blocks: [
        {
          id: '3',
          type: 'text',
          content: 'Walaupun SSH sudah dienkripsi, konfigurasi default-nya masih bisa diperkuat. Edit file `/etc/ssh/sshd_config`:'
        },
        {
          id: '4',
          type: 'code',
          content: `PermitRootLogin no        # Cegah root login langsung\nPasswordAuthentication no # Wajibkan penggunaan SSH Key\nPort 2222                 # (Opsional) Ubah port default untuk mengurangi noise log`,
          metadata: { language: 'bash' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_netsec_1',
    type: 'mcq',
    question: 'Konfigurasi SSH mana yang sangat direkomendasikan untuk mencegah serangan Brute Force terhadap user root?',
    options: [
      { id: '1', text: 'MaxAuthTries 100', isCorrect: false },
      { id: '2', text: 'PermitRootLogin no', isCorrect: true },
      { id: '3', text: 'Port 22', isCorrect: false },
      { id: '4', text: 'UsePAM no', isCorrect: false }
    ],
    explanation: 'Dengan "PermitRootLogin no", penyerang tidak bisa langsung menebak password akun root yang notabene adalah akun dengan privilege absolut.'
  }
};

export const linuxLoggingModule: CyberSecModule = {
  id: 'linux-logging',
  slug: 'linux-logging',
  title: 'Linux Logging System',
  category: 'Infrastructure Hardening',
  description: 'Memahami rsyslog, journalctl, dan lokasi log krusial di sistem Linux.',
  sections: [
    {
      id: 'concept',
      title: 'Centralized Logging',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Log adalah jejak digital. Di Linux, sebagian besar log sistem disimpan di `/var/log/`.'
        },
        {
          id: '2',
          type: 'text',
          content: 'Beberapa file penting:\n- `/var/log/auth.log` (Debian/Ubuntu) atau `/var/log/secure` (RHEL/CentOS): Mencatat aktivitas login dan sudo.\n- `/var/log/syslog` atau `/var/log/messages`: Log sistem umum.\n- `/var/log/dmesg`: Log kernel saat booting.'
        }
      ]
    },
    {
      id: 'journalctl',
      title: 'Menggunakan Journalctl',
      blocks: [
        {
          id: '3',
          type: 'text',
          content: 'Sistem modern menggunakan `systemd` yang mengelola log secara terpusat melalui `journald`. Anda dapat membacanya menggunakan perintah `journalctl`.'
        },
        {
          id: '4',
          type: 'code',
          content: `journalctl -u sshd.service --since "1 hour ago"\njournalctl -p err -b`,
          metadata: { language: 'bash' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_log_1',
    type: 'mcq',
    question: 'File log mana di keluarga Debian/Ubuntu yang harus Anda periksa jika Anda mencurigai ada percobaan login SSH yang gagal?',
    options: [
      { id: '1', text: '/var/log/dmesg', isCorrect: false },
      { id: '2', text: '/var/log/boot.log', isCorrect: false },
      { id: '3', text: '/var/log/auth.log', isCorrect: true },
      { id: '4', text: '/var/log/dpkg.log', isCorrect: false }
    ],
    explanation: 'auth.log mencatat semua event terkait autentikasi, termasuk SSH login success dan failure, serta penggunaan sudo.'
  }
};
