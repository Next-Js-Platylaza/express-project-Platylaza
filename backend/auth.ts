import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload }  from "jsonwebtoken";

export interface CustomRequest extends Request {
    user?: {
        id: string
        email: string
    }
}

export default async function auth(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")
        if (!token) throw new Error("Not logged in");

        const {id, email} = jwt.verify(token, process.env.AUTH_SECRET as string) as JwtPayload;
        (req as CustomRequest).user = { id, email }

        next();
    } catch (err) {
        console.log("error");
        console.log(err);

        res.status(401).send(`Authentication failed: ${err}`);
    }
}