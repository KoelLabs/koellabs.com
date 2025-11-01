import React from 'react';
import { CodeBlock } from '@/components/ui/code-block';

export default function BlogCode({ code }: { code: string }) {
  return (
    <div className="p-2 mb-4 bg-white border rounded-2xl">
      <CodeBlock code={code} />
    </div>
  );
}
