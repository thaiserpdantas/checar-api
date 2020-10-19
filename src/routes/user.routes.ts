import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';

const userRoutes = Router();

userRoutes.get('/', async (request, response) => {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find();

    return response.json(users);
});

userRoutes.post('/', async (request, response) => {
    try {
        const { name, email } = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name,
            email
        })

        const { body } = request;
        console.log(body);

        return response.json(user);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

export default userRoutes;
