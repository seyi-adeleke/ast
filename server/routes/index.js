import auth from './auth';
import user from './user';

export default (router) => {
    auth(router);
    user(router)
};
