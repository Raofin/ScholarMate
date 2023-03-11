import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const logMessage = `${new Date()} ${req.method} ${req.originalUrl}\n`;
    fs.appendFile('./log.txt', logMessage, (err) => {
      if (err) throw err;
    });
    next();
  }
}
