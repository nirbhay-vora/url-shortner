// errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the full error

  if(err instanceof AppError){
    return res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
  }

  //fallback for unhandled errors
  console.log(err)
  res.status(500).json({
    success:false,
    message: err.message || "Internal server error"
  })
}


// errors/index.js
export class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
      super(message, 404);
    }
  }
  
  export class ConflictError extends AppError {
    constructor(message = 'Conflict occurred') {
      super(message, 409);
    }
  }
  
  export class BadRequestError extends AppError {
    constructor(message = 'Bad request') {
      super(message, 400);
    }
  }
  
  export class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized') {
      super(message, 401);
    }
  }
  