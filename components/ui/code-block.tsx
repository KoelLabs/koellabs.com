interface CodeBlockProps {
  code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
      <code className="text-sm">{code}</code>
    </pre>
  );
}
