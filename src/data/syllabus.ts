import { SyllabusItem, LKSModule } from '../types';

// Import Web
import { sqlInjectionModule } from './modules/web/sql-injection';
import { commandInjectionModule } from './modules/web/command-injection';
import { directoryTraversalModule } from './modules/web/directory-traversal';
import { idorModule, xssModule } from './modules/web/idor';
import { csrfModule, fileUploadModule, jwtModule, sstiModule } from './modules/web/web-part2';
import { logicErrorsModule, apiSecurityModule } from './modules/web/web-part3';

// Import Infrastructure
import { pamModule } from './modules/infrastructure/pam';
import { exposedServicesModule } from './modules/infrastructure/exposed-services';
import { defaultConfigsModule } from './modules/infrastructure/default-configs';
import { networkSecurityModule, linuxLoggingModule } from './modules/infrastructure/network-security';

// Import Crypto
import { classicalCiphersModule } from './modules/crypto/classical-ciphers';

// Import SOC
import { logForensicsModule } from './modules/soc/log-forensics';
import { siemModule } from './modules/soc/siem';

// Import Digital Forensic
import { fileCarvingModule, networkForensicModule, memoryForensicModule } from './modules/digital-forensic/forensics';
import { osForensicModule } from './modules/digital-forensic/os-forensic';
import { malwareAnalysisModule } from './modules/digital-forensic/malware';

// Import Binary Exploitation
import { bufferOverflowModule } from './modules/binary/buffer-overflow';
import { formatStringModule } from './modules/binary/format-string';
import { bypassProtectionModule } from './modules/binary/bypass-protection';
import { integerOverflowModule, shellcodeModule, ropChainModule } from './modules/binary/binary-part2';
import { typeConfusionModule } from './modules/binary/binary-part3';

// Import Reverse Engineering
import { staticAnalysisModule, dynamicAnalysisModule, architectureModule } from './modules/reverse-engineering/re-part1';
import { compiledLangModule, mobileReModule } from './modules/reverse-engineering/re-part2';

// Helper to create placeholder modules
const createPlaceholder = (title: string, category: LKSModule['category'], slug: string): LKSModule => ({
  id: slug,
  slug,
  title,
  category,
  description: 'Materi ini sedang dalam tahap penyusunan oleh tim kurikulum Init[0].',
  sections: [],
  isPlaceholder: true,
});

export const syllabus: SyllabusItem[] = [
  {
    id: 'infrastructure-hardening',
    title: 'Infrastructure Hardening',
    modules: [
      pamModule,
      exposedServicesModule,
      defaultConfigsModule,
      networkSecurityModule,
      linuxLoggingModule,
    ],
  },
  {
    id: 'offensive-ctf-crypto',
    title: 'Cryptography',
    modules: [
      classicalCiphersModule,
      createPlaceholder('Attack on RSA', 'Offensive / Red Team Based CTF', 'attack-on-rsa'),
      createPlaceholder('Attack on PRNG', 'Offensive / Red Team Based CTF', 'attack-on-prng'),
      createPlaceholder('Attack on AES & Block Ciphers', 'Offensive / Red Team Based CTF', 'attack-on-aes'),
      createPlaceholder('Attack on ECC & DSA', 'Offensive / Red Team Based CTF', 'attack-on-ecc-dsa'),
      createPlaceholder('Hashing (Length Extension Attack)', 'Offensive / Red Team Based CTF', 'hashing-length-extension'),
    ]
  },
  {
    id: 'web-exploitation',
    title: 'Web Exploitation',
    modules: [
      sqlInjectionModule,
      commandInjectionModule,
      directoryTraversalModule,
      idorModule,
      xssModule,
      csrfModule,
      fileUploadModule,
      jwtModule,
      sstiModule,
      logicErrorsModule,
      apiSecurityModule,
    ],
  },
  {
    id: 'binary-exploitation',
    title: 'Binary Exploitation',
    modules: [
      bufferOverflowModule,
      integerOverflowModule,
      shellcodeModule,
      formatStringModule,
      ropChainModule,
      bypassProtectionModule,
      typeConfusionModule,
    ]
  },
  {
    id: 'reverse-engineering',
    title: 'Reverse Engineering',
    modules: [
      staticAnalysisModule,
      dynamicAnalysisModule,
      architectureModule,
      compiledLangModule,
      mobileReModule,
    ]
  },
  {
    id: 'digital-forensic',
    title: 'Digital Forensic',
    modules: [
      fileCarvingModule,
      networkForensicModule,
      osForensicModule,
      memoryForensicModule,
      malwareAnalysisModule,
    ]
  },
  {
    id: 'soc',
    title: 'SOC',
    modules: [
      logForensicsModule,
      siemModule,
    ]
  }
];

export const getModuleBySlug = (slug: string): LKSModule | undefined => {
  for (const item of syllabus) {
    for (const module of item.modules) {
      if (module.slug === slug) {
        return module;
      }
    }
  }
  return undefined;
};
