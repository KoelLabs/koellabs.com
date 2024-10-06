export default function handler(req, res) {
    const { authorization } = req.headers;
    const idtoken = authorization.split('Bearer ')[1];
    res.setHeader('Set-Cookie', `idtoken=${idtoken}; Path=/; HttpOnly; Secure; SameSite=Strict`);
    res.status(200).json({ message: 'Logged in' });
}
