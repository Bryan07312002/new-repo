import { CRUD } from "@/api/mixins/mixins";

export interface UserProps {
  id?: number;
  username?: String;
  full_name?: String;
}

class User extends CRUD {
  data: Object;

  constructor(user: UserProps) {
    super();
    this.data = {
      id: user.id ?? -1,
      username: user.username ?? "",
      full_name: user.full_name,
    }
  }
}

User.prototype.path = "/users/";

export default User;
