import User from "./User";

interface Comment {
    id: string;

    content: string;

    user?: User;
}

export default Comment;