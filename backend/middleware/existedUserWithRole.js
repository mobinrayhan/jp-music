const userModel = require('../models/userModel');

module.exports = existedUserWithRole = (
  options = { from: 'JWT', checkIsActive: true, accessibleRole: '' }
) => {
  return async (req, res, next) => {
    let userEmail;
    let userId;

    if (options.from === 'body') userEmail = req.body.email;
    if (options.from === 'params') userId = req.params.userId;
    if (options.from === 'query') userId = req.query.userId;
    if (options.from === 'JWT') userId = req.user.id;

    try {
      console.log(req.user, req.body, userEmail, userId, 'FROM HERE');

      const isExistUser = await userModel.checkUserExists(userId || userEmail);
      if (!isExistUser) {
        const error = new Error('User not Found!');
        error.statusCode = 401;
        throw error;
      }

      const activeStatus = await userModel.getActiveStatus(userId || userEmail);
      if (!activeStatus.isActive) {
        const error = new Error('This user is currently unavailable!');
        error.statusCode = 401;
        throw error;
      }

      if (options.accessibleRole) {
        const userRole = await userModel.getUserRole(userId || userEmail);

        if (userRole.role === options.accessibleRole) return next();

        const error = new Error(
          `Access denied! You need the ${options.accessibleRole} to access this resource.`
        );
        error.statusCode = 401;
        throw error;
      }

      return next();
    } catch (e) {
      next(e);
    }
  };
};
