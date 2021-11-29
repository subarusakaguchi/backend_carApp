import { getRepository, Repository } from 'typeorm';

import { ICreateUsersDTO } from '../../dtos/ICreateUsersDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({ id });

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });

        return user;
    }

    async createUser({
        name,
        email,
        driver_license,
        password,
        id,
        avatar,
    }: ICreateUsersDTO): Promise<void> {
        const newUser = await this.repository.create({
            name,
            email,
            driver_license,
            password,
            avatar,
            id,
        });

        await this.repository.save(newUser);
    }
}

export { UsersRepository };
