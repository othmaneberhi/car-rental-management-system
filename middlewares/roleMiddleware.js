const jwt = require("jsonwebtoken");

exports.isAdmin =(req,res,next)=> {
   try{
       let token = req.headers.authorization;
       if (!token) {
           return res.status(401).json({ message: 'No token provided' });
       }
       token = token.split(' ')[1];
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       const isAdmin = decoded.isAdmin;
       console.log(isAdmin)
       if (isAdmin) {
           next();
       } else {
           res.status(401).json({ message: "Unauthorized" });
       }
   } catch (error){
       return res.status(500).json({
           success:false,
           message: error.message });
   }

}