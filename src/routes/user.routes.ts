import { Router } from 'express';

import { v4 as uuid } from 'uuid';

const userRoutes = Router();

// userRoutes.post('/', (request, response) => {
//     return response.json({ message: 'Hello World' });
// });

const users: any[] = [];

userRoutes.get('/', (request, response) => {
    const { title } = request.query;

    const results = title
        ? users.filter(user => user.title.includes(title))
        : users;

    return response.json(results);
});

userRoutes.post('/', (request, response) => {
    const { name, email } = request.body;

    const user = { id: uuid(), name, email };
    users.push(user);

    const { body } = request;
    console.log(body);

    return response.json(user);
});

export default userRoutes;
