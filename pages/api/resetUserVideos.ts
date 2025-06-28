import { NextApiRequest, NextApiResponse } from 'next';
import { db, userVideos } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getAndSetVerifiedUser } from '@/utils/authServer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const idtoken = req.cookies.idtoken;
  if (!idtoken) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const user = await getAndSetVerifiedUser(idtoken);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    console.log('Resetting video history for user:', user.id);

    // Delete all user-video associations for this user
    await db.delete(userVideos).where(eq(userVideos.userId, user.id));

    console.log('User video history reset successfully');

    return res.status(200).json({
      success: true,
      message: 'Video history has been reset successfully',
    });
  } catch (error) {
    console.error('Error resetting user video history:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
