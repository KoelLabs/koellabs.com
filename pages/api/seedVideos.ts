import { NextApiRequest, NextApiResponse } from 'next';
import { db, videos } from '@/db/schema';
import { eq } from 'drizzle-orm';

const jumanjiVideo = {
  id: 'Y82ck2bct8sbG',
  title: 'Jumanji: The Next Level from Sony Pictures Entertainment',
  thumbnail: '/images/thumbnails/jumanji-next-level-full-res.jpg',
  vtt: '/videos/jumanji-next-level.vtt',
  video: 'https://www.youtube.com/watch?v=pJ4c-4V9D_g',
  link: 'rBxcF-r9Ibs',
  badge: 'Medium',
  difficulty: 'Medium',
  dialect: 'US Midlands',
  dialectFlag: '🇺🇸',
  dialectIcon:
    '<svg     xmlns="http://www.w3.org/2000/svg"     width="15"     height="15"     fill="none"     viewBox="0 0 15 15"   >     <path       fill="#FFEDD5"       stroke="#9A3413"       d="M13.66 7.08A6.58 6.58 0 1 1 7.08.5c3.852 0 6.58 2.935 6.58 6.58Z"     ></path>     <path       fill="#9A3413"       d="M4.87 10v-.716L7.085 6.99q.354-.373.585-.655.232-.285.348-.54t.115-.543a1 1 0 0 0-.153-.563 1 1 0 0 0-.42-.367 1.3 1.3 0 0 0-.597-.131q-.352 0-.613.143a1 1 0 0 0-.403.406q-.14.263-.14.614h-.944q0-.597.275-1.045.276-.447.755-.694.479-.249 1.09-.249.616 0 1.086.246.473.243.738.665.266.418.266.946 0 .364-.138.713-.135.348-.47.776-.335.426-.933 1.033l-1.3 1.361v.048h2.946V10z"     ></path>   </svg>',
  duration: '9:35',
  completedSections: 0,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check if video already exists
    const existing = await db.select().from(videos).where(eq(videos.id, jumanjiVideo.id)).limit(1);

    if (existing.length === 0) {
      // Insert the video
      await db.insert(videos).values(jumanjiVideo);
      return res.status(200).json({ message: 'Jumanji video seeded successfully' });
    } else {
      return res.status(200).json({ message: 'Jumanji video already exists' });
    }
  } catch (error) {
    console.error('Error seeding video:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
