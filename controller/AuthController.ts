import {Request, Response, NextFunction} from 'express'
import * as jwt from 'jsonwebtoken'


export class AuthController{
    public verifyJwt(req: Request, res: Response, next: NextFunction){
        const {authorization} = req.headers;
    
        if(!authorization){
             return res.status(401).send({status: 'error', message: 'unauthorized'});
        }
    
        try {
            const token=authorization?.split(' ')[1];
            if(typeof token !== undefined){
                const payload= jwt.verify(token as string, process.env.JWT_SECRET_KEY || "backendchallenge" as string);
                if(!!payload)
                    return next();
            }
        } catch (err) {
            res.status(401);
        }
        res.status(401).send({status: 'error', message: 'unauthorized'});
    }
}
