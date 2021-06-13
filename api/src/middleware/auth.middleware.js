const jwt = require('jsonwebtoken');
const { roles } = require('../roles');
const User = require('../models/user.model');

module.exports = {
    isAuthenticated: async (request, response, next) => {
        try {
            if (request.headers['authorization']) {
                const token = request.headers['authorization'];
                const { exp } = await jwt.verify(token, process.env.JWT_SECRET);
                if (exp < Date.now().valueOf() / 1000) {
                    return response.status(401).json({
                        error: 'Your session has ended, please consider logging in again.'
                    });
                }
                next();
            } else {
                return response.status(401).json({
                    error: 'You must be logged in in order to retrieve data.'
                });
            }
        } catch (error) {
            return response.status(401).json({
                error: 'Your session has ended, please consider logging in again.'
            });
        }
    },

    isAuthorized: (action, resource) => {
        return async (request, response, next) => {
            try {
                const token = request.headers['authorization'];
                const { userId } = await jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(userId);
                const permission = roles.can(user.role)[action](resource);
                if (!permission.granted) {
                    return response.status(403).json({
                        error: "You do not have a sufficient permission to perform this action."
                    });
                }
                next();
            } catch (error) {
                next(error);
            }
        }
    }
}