export class HttpException extends Error {
  public status: number
  public message: string
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(401, message);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string) {
    super(403, message);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(404, message);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string) {
    super(500, message);
  }
}

export class NotImplementedException extends HttpException {
  constructor(message: string) {
    super(501, message);
  }
}