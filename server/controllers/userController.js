import models from '../models';
import utitlity from '../utils/Utilities';
import httpUtilities from '../utils/httpUtilites';

// eslint-disable-next-line
const { User, Company} = models;

export default {
    getUsers: (request, response) => {
        User.findAll({
            attributes: { exclude: ['password'] },
        }).then(users => httpUtilities.constructOkResponse(200, 'Users found', users, null, response))
            .catch(error => response.status(400).send({
                message: `message: ${error.name}`,
                data: error,
                code: 400,
            }));
    },

    createCompany: (request, response) => {
        const {
            email,
            name,
            phone_number,
            street,
            office_address,
            postal_address,
        } = request.body;
        const  { id } = request.decoded;
        Company.findOne({
            where: {
                $or: [{ email }, { name }],
            },
        }).then((company) => {
            if (company) {
                return httpUtilities.constructInvalidRequest(422, 'name and email must be unique', response);
            }
            const payload = utitlity.trim({
                email,
                name,
                phone_number,
                street,
                office_address,
                postal_address
            });
            Company.create(payload).then((newCompany) => {
                User.findOne({
                    id,
                }).then((user) => {
                    if (user) {
                        user.update({
                            updatedAt: Date.now(),
                            company: newCompany.id
                        })
                    }
                })
                const data = {
                    email: newCompany.email,
                    name: newCompany.name,
                    phone_number: newCompany.phone_number,
                    street: newCompany.street,
                };
                return httpUtilities.constructOkResponse(201, 'Company Created successfully', data, null, response);
            }).catch(error => response.status(400).send({
                message: `message: ${error.name}`,
                data: error,
                code: 400,
            }));
            return null;
        }).catch(error => console.log(error));
    },

    updateUser: (request, response) => {
        User.findOne({
            where: {
                id: request.params.id,
            },
        }).then((user) => {
            if (!user) {
                return httpUtilities.constructOkResponse(200, 'This resource does not exist', [], null, response);
            }
            if (user.id !== request.decoded.id) {
                return httpUtilities.constructInvalidRequest(403, 'You do not have access to this resource', response);
            }
            user.update({
                updatedAt: Date.now(),
                email: request.body.email
                    ? request.body.email
                    : user.email,
                name: request.body.name ? request.body.name : user.name,
                title: request.body.title ? request.body.title : user.title,
                postal_address: request.body.postal_address ? request.body.postal_address : user.postal_address,
                phone_number: request.body.phone_number ? request.body.phone_number : user.phone_number,
                street: request.body.street ? request.body.street : user.street,
                home_address: request.body.home_address ? request.body.home_address : user.home_address
            }).then((user) => httpUtilities.constructOkResponse(200, 'Resource successfully updated', {user}, null, response));
            return null;
        }).catch(error => httpUtilities.constructBadResponse(error.code, 'There was an error processing this request', error.message, response));
    },

    deleteUser: (request, response) => {
        User.findOne({
            where: {
                id: request.params.id,
            },
        }).then((user) => {
            if (user) {
                user.destroy();
                return httpUtilities.constructOkResponse(200, 'Resource successfully deleted', [], null, response)
            }
            return httpUtilities.constructInvalidRequest(409, 'This resource has been deleted already', response);
        }).catch(error => httpUtilities.constructBadResponse(error.code, 'There was an error processing this request', error.message, response));
  
    }

};
