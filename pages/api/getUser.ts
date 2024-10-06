import { getAndSetVerifiedUser } from '@/utils/authServer';

export default async function handler(req, res) {
    const idtoken = req.cookies.idtoken;
    if (!idtoken) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
    }
    const user = await getAndSetVerifiedUser(idtoken);
    if (!user) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
    }
    res.status(200).json(user);
}
