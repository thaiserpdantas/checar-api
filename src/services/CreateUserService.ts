import { getCustomRepository } from 'typeorm';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface UserRequest {
    name: string,
    email: string
}

class CreateUserService {
    public async execute({ name, email }: UserRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository)

        const userEmailAlreadyExists = await usersRepository.findOne({ where: { email: email } });

        if (userEmailAlreadyExists) {
            throw Error(`User already registered with email: ${email}`);
        }

        const user = usersRepository.create({
            name,
            email
        });

        await usersRepository.save(user);
        return user;
    }
}

export default CreateUserService;