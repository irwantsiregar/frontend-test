import instance from "@/lib/axios/instance";
import endpoint from "./endpoint.constants";
import { IInventoryForm } from "@/types/Inventory";

const inventoryServices = {
  getInventories: (params?: string) =>
    instance.get(`${endpoint.INVENTORY}?${params}`),
  deleteInventory: (id: string) =>
    instance.delete(`${endpoint.INVENTORY}/${id}`),
  addInventory: (payload: IInventoryForm) =>
    instance.post(endpoint.INVENTORY, payload),
  updateInventory: (id: string, payload: IInventoryForm) =>
    instance.put(`${endpoint.INVENTORY}/${id}`, payload),
};

export default inventoryServices;
