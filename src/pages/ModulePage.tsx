import React, { useMemo, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getModuleBySlug } from '../data/syllabus';
import { TableOfContents } from '../components/layout/TableOfContents';
import { QuizSystem } from '../components/quiz/QuizSystem';
import { ModuleNavigation } from '../components/layout/ModuleNavigation';
import { AlertCircle, Code, Info, Terminal, ShieldCheck, Target, Zap, Wrench } from 'lucide-react';
import { MockSQLiForm } from '../components/simulators/MockSQLiForm';
import { MockCmdInjection } from '../components/simulators/MockCmdInjection';
import { MockDirTraversal } from '../components/simulators/MockDirTraversal';
import { MockPAMConfig } from '../components/simulators/MockPAMConfig';
import { MockCipherSolver } from '../components/simulators/MockCipherSolver';
import { MockLogAnalyzer } from '../components/simulators/MockLogAnalyzer';
import { MockTerminal } from '../components/simulators/MockTerminal';
import { MockCodeAnalyzer } from '../components/simulators/MockCodeAnalyzer';
import { ContentBlock } from '../types';
import { useProgressStore } from '../store/progressStore';
import { enhanceText } from '../utils/highlight';

const ComponentMap: Record<string, React.FC<any>> = {
  MockSQLiForm,
  MockCmdInjection,
  MockDirTraversal,
  MockPAMConfig,
  MockCipherSolver,
  MockLogAnalyzer,
  MockTerminal,
  MockCodeAnalyzer,
};

const renderBlock = (block: ContentBlock) => {
  switch (block.type) {
    case 'text':
      return (
        <div
          key={block.id}
          className="text-zinc-300 leading-relaxed mb-6 text-[15px] sm:text-base tracking-wide prose-p:mb-4 last:prose-p:mb-0"
          dangerouslySetInnerHTML={{ __html: enhanceText(block.content) }}
        />
      );

    case 'alert':
      const isWarning = block.metadata?.type === 'warning';
      const isDanger = block.metadata?.type === 'danger';

      const alertClass = isDanger
        ? 'bg-red-500/10 border-red-500/20 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.05)]'
        : isWarning
          ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-200 shadow-[0_0_15px_rgba(234,179,8,0.05)]'
          : 'bg-blue-500/10 border-blue-500/20 text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.05)]';

      const Icon = isDanger ? Zap : isWarning ? AlertCircle : Info;
      const title = isDanger ? 'CRITICAL VULNERABILITY' : isWarning ? 'WARNING' : 'INTELLIGENCE';

      return (
        <div key={block.id} className={`p-6 rounded-2xl border flex gap-4 mb-8 ${alertClass}`}>
          <Icon className="w-6 h-6 flex-shrink-0 mt-1 opacity-80" />
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1.5">{title}</div>
            <div
              className="text-[15px] leading-relaxed font-medium"
              dangerouslySetInnerHTML={{ __html: enhanceText(block.content) }}
            />
          </div>
        </div>
      );

    case 'code':
      return (
        <div key={block.id} className="mb-8 rounded-2xl overflow-hidden border border-zinc-800 bg-[#0a0a0c] shadow-2xl">
          <div className="flex items-center justify-between px-5 py-3 bg-zinc-900 border-b border-zinc-800">
             <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono font-bold uppercase tracking-wider">
               {block.metadata?.language === 'bash' ? <Terminal className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
               {block.metadata?.language || 'text'}
             </div>
             <div className="flex gap-1.5 opacity-50">
               <div className="w-2.5 h-2.5 rounded-full bg-zinc-600"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-zinc-600"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-zinc-600"></div>
             </div>
          </div>
          <pre className="p-6 overflow-x-auto custom-scrollbar text-sm font-mono text-zinc-300 whitespace-pre leading-relaxed">
            {block.content}
          </pre>
        </div>
      );

    case 'interactive':
      const Component = ComponentMap[block.metadata?.component];
      if (!Component) return <div key={block.id} className="text-red-500 p-4 border border-red-500 rounded my-4">Component {block.metadata?.component} not found</div>;

      return (
        <div key={block.id} className="mb-10 relative">
          <div className="absolute -inset-x-4 -inset-y-4 z-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-3xl blur-xl opacity-50 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-widest mb-3 ml-2">
              <Wrench className="w-4 h-4" /> Interactive Lab Environment
            </div>
            <Component {...block.metadata} />
          </div>
        </div>
      );

    default:
      return null;
  }
};

export const ModulePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const module = useMemo(() => slug ? getModuleBySlug(slug) : null, [slug]);
  const { isModuleCompleted } = useProgressStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!module) {
    return <Navigate to="/" replace />;
  }

  const isCompleted = isModuleCompleted(module.slug);

  if (module.isPlaceholder) {
    return (
      <div className="flex-1 w-full max-w-4xl pt-8 lg:pt-12">
        <h1 className="text-3xl font-bold mb-4">{module.title}</h1>
        <div className="p-12 border border-dashed border-zinc-700 rounded-2xl flex flex-col items-center justify-center text-center text-zinc-500 bg-zinc-900/30">
          <Terminal className="w-12 h-12 mb-4 opacity-50" />
          <h2 className="text-xl font-semibold text-zinc-300 mb-2">Work In Progress</h2>
          <p>{module.description}</p>
        </div>
      </div>
    );
  }

  // Determine an icon for the section based on title keywords to make it look like a "Mission Briefing"
  const getSectionIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('lab') || t.includes('simulator')) return <Wrench className="w-5 h-5 text-indigo-400" />;
    if (t.includes('attack') || t.includes('eks') || t.includes('vuln')) return <Zap className="w-5 h-5 text-red-400" />;
    return <Target className="w-5 h-5 text-blue-400" />;
  };

  return (
    <>
      <div className="flex-1 w-full max-w-4xl pt-4 lg:pt-10 pb-24">
        {/* Modern Mission Briefing Header */}
        <header className="mb-16 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="flex items-center gap-3 mb-6 flex-wrap relative z-10">
            <div className="px-4 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-sm">
              {module.category}
            </div>
            {isCompleted && (
              <div className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                Secured
              </div>
            )}
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.1] relative z-10">
            {module.title}
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed font-light relative z-10 max-w-2xl">
            {module.description}
          </p>
        </header>

        <div className="space-y-20 relative z-10">
          {module.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8 border-b border-zinc-800/50 pb-4">
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 shadow-sm">
                  {getSectionIcon(section.title)}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-2">
                {section.blocks.map(renderBlock)}
              </div>
            </section>
          ))}
        </div>

        <QuizSystem quiz={module.quiz} />

        <ModuleNavigation currentSlug={module.slug} />
      </div>

      <TableOfContents module={module} />
    </>
  );
};
