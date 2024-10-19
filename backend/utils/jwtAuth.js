const jwt = require("jsonwebtoken")

exports.jwtAuth = (req,res,next)=>{
    const token = req.header("Authorization")?.split(' ')[1];

    if(!token) return res.status(401).json({ error: 'Access denied!' });
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) return res.status(403).json({ error: 'Invalid token!' });
        next();
    });
}
