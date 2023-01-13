import { CRUD } from "@/api/mixins/mixins";

export interface UserProps {
  id?: number;
  username?: string;
  full_name?: string;
  photo_url?: string
}

class User extends CRUD {
  data: Object;

  constructor(user: UserProps) {
    const media_folder = import.meta.env.VITE_SERVER_URL
    super();

    this.data = {
      id: user.id ?? -1,
      username: user.username ?? "",
      full_name: user.full_name ?? ""
    };

    if (user.photo_url) {
      this.data.photo = `${media_folder}${user.photo_url}`
    }

    this.old_data = { ...this.data }
  }
}

User.prototype.path = "/users/";

export default User;
