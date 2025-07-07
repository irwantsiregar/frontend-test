interface User {
  id: string;
  name: string;
  email: string;
  image?: string | File;
  isImmutable: boolean;
  role?: string;
}

type TPassword = string;

interface IAddUserForm extends Pick<User, "name" | "email" | "image"> {
  password: TPassword;
}

interface IUpdateUserForm extends User {}

type UserList = User[];

export type { UserList, User, IAddUserForm, IUpdateUserForm, TPassword };
