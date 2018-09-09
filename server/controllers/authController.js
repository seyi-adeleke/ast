import jwt from 'jsonwebtoken';

import models from '../models';
import utitlity from '../utils/Utilities';
import httpUtilities from '../utils/httpUtilites';

// eslint-disable-next-line
const { User, Company } = models;
const env = process.env.NODE_ENV || 'development';
const config = require("../../server/config/config")[env];

export default {
    userSignUp: (request, response) => {
        const {
            email,
            name,
            title,
            phone_number,
            password,
            street,
            home_address,
            postal_address,
        } = request.body;
        User.findOne({
            where: {
                $or: [{ email }, { name }],
            },
        }).then((user) => {
            if (user) {
                return httpUtilities.constructInvalidRequest(422, 'name and email must be unique', response);
            }
            const payload = utitlity.trim({
                email,
                name,
                title,
                phone_number,
                password,
                street,
                home_address,
                postal_address
            });
            User.create(payload).then((newUser) => {
                const data = {
                    email: newUser.email,
                    name: newUser.name,
                    phone_number: newUser.phone_number,
                    street: newUser.street,
                };
                return httpUtilities.constructOkResponse(201, 'User Created successfully', data, null, response);
            }).catch(error => response.status(400).send({
                message: `message: ${error.name}`,
                data: error,
                code: 400,
            }));
            return null;
        }).catch(error => console.log(error));
    },

    signIn: (request, response) => {
        const {
            email,
            password,
        } = request.body;

        User.findOne({
            where: {
                email,
            },
            attributes: ['name', 'email', 'street', 'role', 'password', 'id'],
        }).then((entity) => {
            if (!entity) {
                return response.status(404).send({
                    message: 'This user does not exist',
                    code: 404,
                });
            }
            utitlity.comparePassword(password, entity.password).then((result) => {
                if (result) {
                    const token = jwt.sign({ id: entity.id, role: entity.role }, config.jwt_secret, { expiresIn: '24h' });
                    return httpUtilities.constructOkResponse(200, 'Login succesfull', entity, { token }, response);
                }
                return httpUtilities.constructInvalidRequest(401, 'Invalid username/password', response);
            });
            return null;
        }).catch(error => response.status(400).send({
            message: `message: ${error.name}`,
            data: error,
            code: 400,
        }));
    },

};
