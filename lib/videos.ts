'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { db, userVideos, videos } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

// authenticated server actions for managing videos
export const resetUserVideos = async () => {
  'use server';
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('Not authenticated');
  }

  console.log('Resetting video history for user:', session.user.id);

  // Delete all user-video associations for this user
  await db.delete(userVideos).where(eq(userVideos.userId, session.user.id));

  console.log('User video history reset successfully');
};

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

// TODO: when is this ever used??
export const seedVideos = async () => {
  'use server';
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('Not authenticated');
  }

  // Insert Jumanji video if it doesn't already exist
  const existing = await db.select().from(videos).where(eq(videos.id, jumanjiVideo.id)).limit(1);
  if (existing.length === 0) {
    await db.insert(videos).values(jumanjiVideo);
  }
};

export const associateUserVideo = async (videoId: string) => {
  'use server';
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('Not authenticated');
  }

  // If video doesn't exist in database, create a placeholder
  const videoExists = await db.select().from(videos).where(eq(videos.id, videoId)).limit(1);
  if (videoExists.length === 0) {
    console.log('Video not found in database, creating placeholder for:', videoId);
    await db.insert(videos).values(jumanjiVideo);
    console.log('Placeholder video created successfully');
  }

  // Check if association already exists
  const existing = await db
    .select()
    .from(userVideos)
    .where(and(eq(userVideos.userId, session.user.id), eq(userVideos.videoId, videoId)))
    .limit(1);

  console.log('Checking if user already has this video:', existing.length > 0);

  if (existing.length > 0) {
    // Update last watched timestamp
    console.log('Updating existing user-video association');
    await db
      .update(userVideos)
      .set({ lastWatched: new Date() })
      .where(and(eq(userVideos.userId, session.user.id), eq(userVideos.videoId, videoId)));
  } else {
    // Create new association
    console.log(
      'Creating new user-video association for user:',
      session.user.id,
      'video:',
      videoId,
    );
    const id = `${session.user.id}_${videoId}_${Date.now()}`;
    await db.insert(userVideos).values({
      id,
      userId: session.user.id,
      videoId,
      addedAt: new Date(),
      lastWatched: new Date(),
      completedSections: 0, // Initialize with 0 completed sections
    });
    console.log('User-video association created with ID:', id);
  }
};

export const getUserVideos = async () => {
  'use server';
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('Not authenticated');
  }

  console.log('Fetching videos for user:', session.user.id);

  // First check if we have any user-video associations
  const userVideoAssociations = await db
    .select()
    .from(userVideos)
    .where(eq(userVideos.userId, session.user.id));

  console.log('Found user-video associations:', userVideoAssociations.length);

  if (userVideoAssociations.length === 0) {
    throw new Error('No videos associated with this user');
  }

  // Get user's videos with video details
  const userVideoList = await db
    .select({
      id: videos.id,
      title: videos.title,
      thumbnail: videos.thumbnail,
      vtt: videos.vtt,
      video: videos.video,
      link: videos.link,
      badge: videos.badge,
      difficulty: videos.difficulty,
      dialect: videos.dialect,
      dialectFlag: videos.dialectFlag,
      dialectIcon: videos.dialectIcon,
      duration: videos.duration,
      completedSections: userVideos.completedSections,
      addedAt: userVideos.addedAt,
      lastWatched: userVideos.lastWatched,
    })
    .from(userVideos)
    .innerJoin(videos, eq(userVideos.videoId, videos.id))
    .where(eq(userVideos.userId, session.user.id));

  console.log('Returning user videos:', userVideoList.length);
  return userVideoList;
};
