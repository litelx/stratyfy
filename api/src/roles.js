const AccessControl = require('accesscontrol');
const permission = new AccessControl();

module.exports = {
    roles: (() => {
        permission.grant('basic')
            .readOwn('user');

        permission.grant('manager')
            .extend('basic')
            .readAny('user')
            .createAny('user')
            .updateAny('user')
            .deleteAny('user');

        return permission;
    })()
};