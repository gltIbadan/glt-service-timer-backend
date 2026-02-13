import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";

interface GuestRequest extends Request {
    guestId: string;
}

export const guestMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let guestId = req.cookies.guestId;

    if (!guestId) {
        guestId = randomUUID();

        res.cookie('guestId', guestId, {
            httpOnly: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24,
            secure: true
        })
    }

    req.guestId = guestId;
    next();
}