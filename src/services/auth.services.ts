import instance from "@/lib/axios/instance";
import { ILogin } from "@/types/Auth";
import endpoint from "./endpoint.constants";

const authServices = {
  login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),
  refreshToken: () => instance.post(`${endpoint.AUTH}/refresh-token`),
  me: () => instance.get(`${endpoint.AUTH}/check-token`),
};

export default authServices;
