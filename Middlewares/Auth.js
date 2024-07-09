import jwt from 'jsonwebtoken';
const ensureAuthenticated =  ( req, res, next)=>{
    // const auth = req.headers['Authorization'];
    const auth = req.params.userInfo;
    
    if(!auth){
        return res.status(403).json ({message: 'Unauthorized, JWT token is required'});
    }
    try {
        const decoded = jwt.verify(auth,process.env.JWT_SECRET);
        req.user =decoded;
        next();
    }catch(error){
        return res.status(403).json ({message: 'Unauthorized, JWT token wrong or expired'})
    }
}
export default ensureAuthenticated;
