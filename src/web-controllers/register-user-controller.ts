/* eslint-disable consistent-return */
import { UserData } from "@/entities";
import RegisterUserOnMainList from "@/usecases/register-user-on-mailinglist/register-user-on-mainlist";
import { MissingParamError } from "./errors";
import { HttpRequest, HttpResponse } from "./ports";
import { created, badRequest } from "./util";

// eslint-disable-next-line import/prefer-default-export
export class RegisterUserController {
  private readonly usecase: RegisterUserOnMainList;

  constructor(usecase: RegisterUserOnMainList) {
    this.usecase = usecase;
  }

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    if (!request.body.name || !request.body.email) {
      let missingParam = !request.body.name ? "name" : "";
      missingParam += !request.body.email ? "email" : "";

      return badRequest(new MissingParamError(missingParam));
    }

    const userData: UserData = request.body;

    const response = await this.usecase.registerUserOnMainlist(userData);

    if (response.isLeft()) {
      return badRequest(response.value);
    }

    if (!response.isLeft()) {
      return created(response.value);
    }
  }
}
