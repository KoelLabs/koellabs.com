import { getVerifiedUid } from '@/utils/authServer';

export default function handler(req, res) {
    const { authorization } = req.headers;
    const idtoken = authorization.split('Bearer ')[1];
    const uid = getVerifiedUid(idtoken);
    res.status(200).json(!!uid);
}
