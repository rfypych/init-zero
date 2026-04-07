import { LKSModule } from '../../../types';

export const directoryTraversalModule: LKSModule = {
  id: 'directory-traversal',
  slug: 'directory-traversal',
  title: 'Directory Traversal & File Inclusion',
  category: 'Web Exploitation',
  description: 'Mengeksploitasi fitur baca file untuk mengakses file sensitif di luar direktori web.',
  sections: [
    {
      id: 'concept',
      title: 'Keluar dari Kandang',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Directory Traversal (atau Path Traversal) terjadi ketika aplikasi membaca file berdasarkan parameter input pengguna tanpa memvalidasi path-nya.'
        },
        {
          id: '2',
          type: 'text',
          content: 'Dalam sistem Linux/Unix, notasi `../` berarti "naik satu direktori ke atas". Hacker menggunakan notasi ini berulang kali untuk "keluar" dari folder aplikasi web (misal: `/var/www/html`) dan menuju ke root sistem ( `/` ).'
        },
        {
          id: '3',
          type: 'code',
          content: 'http://example.com/getImage?file=../../../etc/passwd',
          metadata: { language: 'http' }
        }
      ]
    },
    {
      id: 'interactive-simulator',
      title: 'Lab Interaktif: File Viewer',
      blocks: [
        {
          id: '4',
          type: 'text',
          content: 'Aplikasi ini dirancang untuk menampilkan gambar. Bisakah Anda mengubah path-nya untuk membaca file `/etc/passwd` Linux?'
        },
        {
          id: '5',
          type: 'interactive',
          content: 'MockDirTraversal',
          metadata: { component: 'MockDirTraversal' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_dt_1',
    type: 'flag_submission',
    question: 'Berdasarkan file /etc/passwd yang berhasil Anda baca di lab atas, temukan dan masukkan flag yang tersembunyi!',
    flag: 'INIT0{P4th_Tr4v3rs4l_M4st3r}',
    explanation: 'Sempurna. Mencegah kerentanan ini bisa dilakukan dengan memvalidasi path (memastikan file berada di dalam base directory) atau menggunakan referensi indirect (misal file id berupa angka, bukan nama file).'
  }
};
