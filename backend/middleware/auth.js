import jwt from 'jsonwebtoken';
import config from 'config';

export default function auth(req, res, next) {
    // get the token from the header
    const token = req.header('x-auth-token');

    // check if no token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'});
    }

    // verify the token if there is one
    try {
        jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
            if(error) {
                return res.status(401).json({ msg: 'Token is not valid' });
            } else {
                req.user = decoded.user;
                next();
            }
        });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}