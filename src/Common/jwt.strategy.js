import 'dotenv/config'
import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";

const opt = {
    secretOrKey: process.env.AUTH_HS256_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    issuer: `${process.env.AUTH_ISSUER_URL}`, 
    algorithms: ["HS256"],
};

const jwtStrategy = new Strategy(opt, (jwt_payload, done) =>{
    if(!jwt_payload){
        done(true);
    } else{
        done(null, jwt_payload);
    }
});

export const Authenticate = (req,res,next) =>{
    passport.authenticate(jwlStrategy, (err, user)=>{
        console.log(user);
        if(err) res.status(401).send({ message: "Unauthorized"});
        if (!user) res.status(401).send({ message: "Unautherized"});
        else{
            next();
        }
    })(req, res, next);
};

