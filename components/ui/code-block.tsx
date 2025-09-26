import { cn } from '@/lib/styles';

interface CodeBlockProps {
  code: string;
  className?: string;
}

export function CodeBlock({ code, className }: CodeBlockProps) {
  return (
    <pre className={cn('bg-neutral-50 border p-4 rounded-lg overflow-x-auto', className)}>
      <code className="text-sm">{code}</code>
    </pre>
  );
}
