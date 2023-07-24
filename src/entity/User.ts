import FileResponse from "./FileResponse";
import Tag from "./Tag";
type  User = {
  id?: string;

  email: string;

  password: string;

  name: string;

  avatar?: FileResponse;

  tags?: Tag[];
}


export default User;