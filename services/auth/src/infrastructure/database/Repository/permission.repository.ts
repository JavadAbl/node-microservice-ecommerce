import { Repository } from "./common-repository.js";

export class PermissionRepository extends Repository<"permission"> {
  constructor() {
    super("permission");
  }
}
