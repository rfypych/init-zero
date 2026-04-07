import { SyllabusItem, LKSModule } from '../types';

// Import Web
import { sqlInjectionModule } from './modules/web/sql-injection';
import { commandInjectionModule } from './modules/web/command-injection';
import { directoryTraversalModule } from './modules/web/directory-traversal';
import { idorModule, xssModule } from './modules/web/idor';
import { csrfModule, fileUploadModule, jwtModule, sstiModule } from './modules/web/web-part2';

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
      createPlaceholder('Attack on AES', 'Offensive / Red Team Based CTF', 'attack-on-aes'),
      createPlaceholder('Attack on ECC', 'Offensive / Red Team Based CTF', 'attack-on-ecc'),
      createPlaceholder('Attack on DSA', 'Offensive / Red Team Based CTF', 'attack-on-dsa'),
      createPlaceholder('Hashing', 'Offensive / Red Team Based CTF', 'hashing-length-extension'),
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
      createPlaceholder('Account Takeover', 'Web Exploitation', 'account-takeover'),
      createPlaceholder('Business Logic Errors', 'Web Exploitation', 'business-logic-errors'),
      createPlaceholder('CVE Exploits', 'Web Exploitation', 'cve-exploits'),
      createPlaceholder('Dependency Confusion', 'Web Exploitation', 'dependency-confusion'),
      createPlaceholder('GraphQL Injection', 'Web Exploitation', 'graphql-injection'),
      createPlaceholder('HTTP Parameter Pollution', 'Web Exploitation', 'http-parameter-pollution'),
      createPlaceholder('Insecure Deserialization', 'Web Exploitation', 'insecure-deserialization'),
      createPlaceholder('NoSQL Injection', 'Web Exploitation', 'nosql-injection'),
      createPlaceholder('Prototype Pollution', 'Web Exploitation', 'prototype-pollution'),
      createPlaceholder('Race Condition', 'Web Exploitation', 'race-condition'),
      createPlaceholder('Request Smuggling', 'Web Exploitation', 'request-smuggling'),
      createPlaceholder('Type Juggling', 'Web Exploitation', 'type-juggling'),
      createPlaceholder('Web Sockets', 'Web Exploitation', 'web-sockets'),
      createPlaceholder('XXE Injection', 'Web Exploitation', 'xxe'),
      createPlaceholder('OWASP API Security Top 10', 'Web Exploitation', 'owasp-api-top-10'),
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
      createPlaceholder('Type Confusion', 'Binary Exploitation', 'type-confusion'),
      createPlaceholder('Uninitialized Memory', 'Binary Exploitation', 'uninitialized-memory'),
    ]
  },
  {
    id: 'reverse-engineering',
    title: 'Reverse Engineering',
    modules: [
      createPlaceholder('Static Analysis (Reconstruct Algorithm)', 'Reverse Engineering', 'static-analysis'),
      createPlaceholder('Dynamic Analysis (Tracing, GDB)', 'Reverse Engineering', 'dynamic-analysis'),
      createPlaceholder('Low Level File Formats', 'Reverse Engineering', 'low-level-file-formats'),
      createPlaceholder('Anti RE', 'Reverse Engineering', 'anti-re'),
      createPlaceholder('Compiled Language Syntax Format', 'Reverse Engineering', 'compiled-language-syntax'),
      createPlaceholder('Arsitektur: x86_64, x64, ARM', 'Reverse Engineering', 'architecture'),
      createPlaceholder('Special Framework', 'Reverse Engineering', 'special-frameworks'),
      createPlaceholder('Obfuscation & Binary Patching', 'Reverse Engineering', 'obfuscation-patching'),
      createPlaceholder('Mobile Reverse Engineering', 'Reverse Engineering', 'mobile-re'),
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
