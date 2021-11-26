import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError('Token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const { sub: id } = verify(
            token,
            'd6d8746c1bc2f46df24ce4aa010c6e76',
        ) as IPayload;

        const usersRepository = new UsersRepository();

        const user = await usersRepository.findById(id);

        if (!user) {
            throw new AppError('User does not Exists', 401);
        }

        next();
    } catch (error) {
        throw new AppError('Invalid Token', 401);
    }
}
