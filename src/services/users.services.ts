import instance from "@/lib/axios/instance";
import { IAddUserForm, IUpdateUserForm, TPassword } from "@/types/Users";
import endpoint from "./endpoint.constants";

const usersServices = {
  getUsers: (params?: string) => instance.get(`${endpoint.USERS}?${params}`),
  deleteUser: (id: string) => instance.delete(`${endpoint.USERS}/${id}`),
  addUser: (payload: IAddUserForm) => instance.post(endpoint.USERS, payload),
  updateUserInfo: (id: string, payload: IUpdateUserForm) =>
    instance.put(`${endpoint.USERS}/${id}`, payload),
  updateUserPassword: (id: string, payload: TPassword) =>
    instance.put(`${endpoint.USERS}/${id}`, payload),
};

export default usersServices;
