const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

let validatePassword = (password, stored) => {
  return password === stored;
};

module.exports = {
  login: async (request, response, next) => {
    try {
      const { username, password } = request.body;
      const user = await User.findOne({ username });

      if (!user) {
        return next(new Error("The username does not exist"));
      }

      const validPassword = validatePassword(password, user.password);

      if (!validPassword) {
        return next(new Error("The password is incorrect"));
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1 minute"
      });

      await User.findByIdAndUpdate(user._id, { token });
      response.status(200).json({
        username: user.username,
        token: token
      });
    } catch (error) {
      next(error);
    }
  },

  resetPassword: async (request, response, next) => {
    try {
      const { username, password, newPassword } = request.body;
      let user = await User.findOne({ username });

      if (!user) {
        return next(new Error("The username does not exist"));
      }

      const validPassword = validatePassword(password, user.password);

      if (!validPassword) {
        return next(new Error("The password is incorrect"));
      }

      user.password = newPassword;
      await user.save();
      response.status(200).json({
        user: user,
        updated: true,
        message: "Password has been successfully changed"
      });
    } catch (error) {
      next(error);
    }
  },

  getUser: async (request, response, next) => {
    try {
      const username = request.params.username;
      const user = await User.findOne({ username });
      if (!user) {
        return next(new Error("User does not exist"));
      }

      response.status(200).json({
        username: user.username,
        role: user.role,
        password: user.password
      });
    } catch (error) {
      next(error);
    }
  },

  createUser: async (request, response, next) => {
    try {
      delete request.body._id;
      const user = new User(request.body);
      user.save((error, savedUser) => {
        if (error) {
          response.status(500).json({
            message: "A user with the same username exists"
          });
        } else {
          response.status(200).json({
            user: {
              _id: savedUser._id,
              username: savedUser.username,
              role: savedUser.role,
              password: savedUser.password
            },
            message: "User has been successfully created"
          });
        }
      });
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (request, response, next) => {
    try {
      const userId = request.params.userId;
      await User.findByIdAndDelete(userId);
      response.status(200).json({
        deleted: true,
        message: "User has been successfully deleted"
      });
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (request, response, next) => {
    try {
      const updatedUser = request.body;
      const userId = request.params.userId;
      await User.findByIdAndUpdate(userId, updatedUser);
      const user = await User.findById(userId);
      response.status(200).json({
        user: user,
        updated: true,
        message: "User has been successfully updated"
      });
    } catch (error) {
      next(error);
    }
  },

  getAllUsers: async (request, response, next) => {
    const token = request.headers["authorization"];
    const users = await User.find(
      { token: { $ne: token } },
      { username: 1, password: 1, role: 1 }
    );
    response.status(200).json({
      users: users
    });
  }
};
