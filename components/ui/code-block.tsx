import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/styles';

interface CodeBlockProps {
  code: string;
  className?: string;
}

export function CodeBlock({ code, className }: CodeBlockProps) {
  return (
    <div className={cn('overflow-hidden rounded-lg border bg-neutral-50', className)}>
      <SyntaxHighlighter
        language="python"
        style={oneLight}
        customStyle={{
          margin: 0,
          background: 'transparent',
          padding: '1rem',
          fontSize: '0.875rem', // text-sm
        }}
        codeTagProps={{
          style: {
            fontSize: 'inherit',
            background: 'transparent',
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
