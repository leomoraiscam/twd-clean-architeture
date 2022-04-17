import { Request, Response } from 'express';

import { RegisterUserController } from '@/web-controllers';
import { HttpResponse } from '@/web-controllers/ports';
import { HttpRequest } from '@/web-controllers/ports/http-request';

export const adaptRoute = (controller: RegisterUserController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body,
    };

    const httpResponse: HttpResponse = await controller.handle(httpRequest);

    response.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
