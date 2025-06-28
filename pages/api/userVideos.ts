import { NextApiRequest, NextApiResponse } from 'next';
import { db, userVideos, videos } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getAndSetVerifiedUser } from '@/utils/authServer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const idtoken = req.cookies.idtoken;
  if (!idtoken) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const user = await getAndSetVerifiedUser(idtoken);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  if (req.method === 'POST') {
    try {
      const { videoId } = req.body;

      if (!videoId) {
        return res.status(400).json({ error: 'Video ID is required' });
      }

      // Check if the video exists in the videos table
      const videoExists = await db.select().from(videos).where(eq(videos.id, videoId)).limit(1);

      // If video doesn't exist in database, create a placeholder
      if (videoExists.length === 0) {
        console.log('Video not found in database, creating placeholder for:', videoId);

        // Create placeholder video data
        const placeholderVideo = {
          id: videoId,
          title: 'Jumanji: The Next Level from Sony Pictures Entertainment',
          thumbnail: '/images/thumbnails/jumanji-next-level-full-res.jpg',
          video: 'https://www.youtube.com/watch?v=pJ4c-4V9D_g',
          vtt: '/videos/jumanji-next-level.vtt',
          link: 'rBxcF-r9Ibs',
          badge: 'Medium',
          difficulty: 'Medium',
          dialect: 'US Midlands',
          dialectFlag: '🇺🇸',
          duration: '9:35',
        };

        // Insert the video
        await db.insert(videos).values(placeholderVideo);
        console.log('Placeholder video created successfully');
      }

      // Check if association already exists
      const existing = await db
        .select()
        .from(userVideos)
        .where(and(eq(userVideos.userId, user.id), eq(userVideos.videoId, videoId)))
        .limit(1);

      console.log('Checking if user already has this video:', existing.length > 0);

      if (existing.length > 0) {
        // Update last watched timestamp
        console.log('Updating existing user-video association');
        await db
          .update(userVideos)
          .set({ lastWatched: new Date() })
          .where(and(eq(userVideos.userId, user.id), eq(userVideos.videoId, videoId)));
      } else {
        // Create new association
        console.log('Creating new user-video association for user:', user.id, 'video:', videoId);
        const id = `${user.id}_${videoId}_${Date.now()}`;
        await db.insert(userVideos).values({
          id,
          userId: user.id,
          videoId,
          addedAt: new Date(),
          lastWatched: new Date(),
          completedSections: 0, // Initialize with 0 completed sections
        });
        console.log('User-video association created with ID:', id);
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error adding user video:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'GET') {
    try {
      console.log('Fetching videos for user:', user.id);

      // First check if we have any user-video associations
      const userVideoAssociations = await db
        .select()
        .from(userVideos)
        .where(eq(userVideos.userId, user.id));

      console.log('Found user-video associations:', userVideoAssociations.length);

      if (userVideoAssociations.length === 0) {
        // No videos associated with this user yet
        console.log('No videos associated with this user');
        return res.status(200).json([]);
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
        .where(eq(userVideos.userId, user.id));

      console.log('Returning user videos:', userVideoList.length);
      return res.status(200).json(userVideoList);
    } catch (error) {
      console.error('Error fetching user videos:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
