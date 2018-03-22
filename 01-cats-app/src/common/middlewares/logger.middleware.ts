import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';

@Middleware()
export class LoggerMiddleware implements NestMiddleware {
  resolve(name: string): ExpressMiddleware {
    return (req, res, next) => {
      console.log(`Request... Module: ${name}, Method:${req.method}, Path:${req.originalUrl}.`);
      next();
    };
  }
}
