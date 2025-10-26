import React, { PropsWithChildren } from 'react';

export default function BlogSubheading({ children }: PropsWithChildren) {
  return <h2 className="text-2xl font-semibold mt-8 mb-4 font-sans">{children}</h2>;
}
