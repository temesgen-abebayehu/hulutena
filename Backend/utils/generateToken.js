import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: "10d"
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //mili second
        httpOnly: true, //prevent XSS(cros-site scripting) attacks
        sameSite: "strict", //CSRF attack cross-site request forgery attacks
    })
}