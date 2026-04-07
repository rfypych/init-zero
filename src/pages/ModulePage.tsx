import React, { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getModuleBySlug } from '../data/syllabus';
import { TableOfContents } from '../components/layout/TableOfContents';
import { QuizSystem } from '../components/quiz/QuizSystem';
import { AlertCircle, Code, Info, Terminal } from 'lucide-react';
import { MockSQLiForm } from '../components/simulators/MockSQLiForm';
import { MockCmdInjection } from '../components/simulators/MockCmdInjection';
import { MockDirTraversal } from '../components/simulators/MockDirTraversal';
import { MockPAMConfig } from '../components/simulators/MockPAMConfig';
import { MockCipherSolver } from '../components/simulators/MockCipherSolver';
import { MockLogAnalyzer } from '../components/simulators/MockLogAnalyzer';
import { MockTerminal } from '../components/simulators/MockTerminal';
import { MockCodeAnalyzer } from '../components/simulators/MockCodeAnalyzer';
import { ContentBlock } from '../types';

const ComponentMap: Record<string, React.FC> = {
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
      // Basic markdown parsing for bold and inline code
      const parsedContent = block.content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`(.*?)`/g, '<code class="bg-zinc-800 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');
      return (
        <p
          key={block.id}
          className="text-zinc-300 leading-relaxed mb-4 text-[15px]"
          dangerouslySetInnerHTML={{ __html: parsedContent }}
        />
      );

    case 'alert':
      const isWarning = block.metadata?.type === 'warning';
      const isDanger = block.metadata?.type === 'danger';

      const alertClass = isDanger
        ? 'bg-red-500/10 border-red-500/20 text-red-200'
        : isWarning
          ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-200'
          : 'bg-blue-500/10 border-blue-500/20 text-blue-200';

      const Icon = isDanger || isWarning ? AlertCircle : Info;

      return (
        <div key={block.id} className={`p-4 rounded-lg border flex gap-3 mb-6 ${alertClass}`}>
          <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="text-sm leading-relaxed whitespace-pre-line">{block.content}</div>
        </div>
      );

    case 'code':
      return (
        <div key={block.id} className="mb-6 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-xs text-zinc-400 font-mono">
            {block.metadata?.language === 'bash' ? <Terminal className="w-4 h-4" /> : <Code className="w-4 h-4" />}
            {block.metadata?.language || 'text'}
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-sm font-mono text-zinc-300 whitespace-pre">
              {block.content}
            </code>
          </pre>
        </div>
      );

    case 'interactive':
      const Component = ComponentMap[block.metadata?.component];
      if (!Component) return <div key={block.id} className="text-red-500 p-4 border border-red-500 rounded my-4">Component {block.metadata?.component} not found</div>;
      return <Component key={block.id} />;

    default:
      return null;
  }
};

export const ModulePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const module = useMemo(() => slug ? getModuleBySlug(slug) : null, [slug]);

  if (!module) {
    return <Navigate to="/" replace />;
  }

  if (module.isPlaceholder) {
    return (
      <div className="flex-1 max-w-3xl pt-12">
        <h1 className="text-3xl font-bold mb-4">{module.title}</h1>
        <div className="inline-block px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full text-xs font-semibold uppercase tracking-wider mb-8">
          {module.category}
        </div>
        <div className="p-12 border border-dashed border-zinc-700 rounded-xl flex flex-col items-center justify-center text-center text-zinc-500 bg-zinc-900/30">
          <Terminal className="w-12 h-12 mb-4 opacity-50" />
          <h2 className="text-xl font-semibold text-zinc-300 mb-2">Work In Progress</h2>
          <p>{module.description}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 max-w-3xl pt-8 pb-24">
        <header className="mb-12">
          <div className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            {module.category}
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">{module.title}</h1>
          <p className="text-lg text-zinc-400 leading-relaxed">{module.description}</p>
        </header>

        <div className="space-y-16">
          {module.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-zinc-100 mb-6 border-b border-zinc-800 pb-2">
                {section.title}
              </h2>
              <div className="space-y-2">
                {section.blocks.map(renderBlock)}
              </div>
            </section>
          ))}
        </div>

        {module.quiz && <QuizSystem quiz={module.quiz} />}
      </div>
      <TableOfContents module={module} />
    </>
  );
};
