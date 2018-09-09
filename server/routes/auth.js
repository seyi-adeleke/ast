import controllers from '../controllers';

import {
    validateCreateUserRequest,
    validateCreateCompanyRequest
} from '../middleware';

const {
    authController,
} = controllers;


const routes = (router) => {
    router.route('/auth/users')
        .post(validateCreateUserRequest, authController.userSignUp);
        
    router.route('/auth/signin')
        .post(authController.signIn);

};

export default routes;
