class UserBadRequest extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserBadRequest';
    if (!message) this.message = "Error - Bad request: check the API doc";
    this.errCode = 400;
  }
}

class UserNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserNotFoundError';
    this.message = "Error - User was not found: check your request";
    this.errCode = 400;
  }
}

class UserDbError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserDbError';
    this.message = "Error - DB error: Contact API owners for more info.";
    this.errCode = 500;
  }
}

class UserDuplicateError extends UserBadRequest {
  constructor(message) {
    super(message);
    this.name = 'UserDuplicateError';
    this.message = "Error - UserDuplicateError: The User has already been inserted.";
    this.errCode = 400;
  }
}

class UserBadRequestMissingID extends UserBadRequest {
  constructor(message) {
    super(message);
    this.name = 'UserBadRequestMissingID';
    this.message = "Error - Bad request: check the API doc";
    this.errCode = 400;
  }
}

class UserBadRequestMissingAfter extends UserBadRequest {
  constructor(message) {
    super(message);
    this.name = 'UserBadRequestMissingAfter';
    this.message = "Error - Bad request: check the API doc";
    this.errCode = 400;
  }
}

class UserNoSuchRouteError extends UserBadRequest {
  constructor(message) {
    super(message);
    this.name = 'UserNoSuchRouteError';
    this.message = "Error - Improper Route: check the API doc";
    this.errCode = 404;
  }
}

class UserAuthError extends UserBadRequest {
  constructor(message) {
    super(message);
    this.name = 'UserAuthError';
    this.message = `${message}`;
    this.errCode = 401;
  }
}


module.exports = {
  UserBadRequest,
  UserBadRequestMissingID,
  UserBadRequestMissingAfter,
  UserDbError,
  UserNotFoundError,
  UserDuplicateError,
  UserNoSuchRouteError,
  UserAuthError
};