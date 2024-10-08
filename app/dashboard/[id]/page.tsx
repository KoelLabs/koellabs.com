'use client';
import { usePathname } from 'next/navigation';

// dummy data to represent user's data of videos
const accountVideos = [
  {
    id: 'YjkWz3Tv5gEAoe93Dg',
    title: 'Getting Started',
  },
];

export default function Page() {
  const pathname = usePathname();
  return (
    <div className="h-full rounded-md relative p-4">
      <h1 className="text-xl font-semibold tracking-tighter">Page Route: {pathname}</h1>
    </div>
  );
}
