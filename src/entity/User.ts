import Tag from "./Tag";
type  User = {
  id?: string;

  email: string;

  password: string;

  name: string;

  avatar?: string;

  tags?: Tag[];
}


export default User;