import { Repository } from "./common-repository.js";

export class UserRepository extends Repository<"user"> {
  constructor() {
    super("user");
  }
}
