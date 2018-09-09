import controllers from '../controllers';

import {
    isAdmin,
    isAuthenticated,
    validateParams,
    validateAccess,
} from '../middleware';

const {
    userController,
} = controllers;


const routes = (router) => {
    router.route('/users')
        .get(isAuthenticated, isAdmin, userController.getUsers);
    
    router.route('/users/company')
        .post(isAuthenticated, userController.createCompany);

    router.route('/users/:id')
        .put(isAuthenticated, validateParams, validateAccess, userController.updateUser)
        .delete(isAuthenticated, validateParams, validateAccess, userController.deleteUser);
};

export default routes;
