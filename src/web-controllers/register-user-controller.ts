/* eslint-disable consistent-return */
import { UserData } from "@/entities";
import RegisterUserOnMainList from "@/usecases/register-user-on-mailinglist/register-user-on-mainlist";
import { HttpRequest, HttpResponse } from "./ports";
import { created } from "./util";

// eslint-disable-next-line import/prefer-default-export
export class RegisterUserController {
  private readonly usecase: RegisterUserOnMainList;

  constructor(usecase: RegisterUserOnMainList) {
    this.usecase = usecase;
  }

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    const userData: UserData = request.body;

    const response = await this.usecase.registerUserOnMainlist(userData);

    if (!response.isLeft()) {
      return created(response.value);
    }
  }
}
