import { Request, Response, NextFunction } from 'express';

export async function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authHeader = req.headers.authorization;
}
