const jwt = require('jsonwebtoken');

const JWT_SECRET = 'NKSSIGNEDTOKEN$';


const fetchuser = (req, res, next) => {
    //Get user from the JWT token and append id to req object.
    const token = req.header('auth-token');

    if (!token) {
        res.status(401).json({ error: 'nks Please authenticate using a valid token.' });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: 'Invalid token.' });
    }
};


module.exports = fetchuser;