interface InventoryItem {
  id: string;
  name: string;
  description: string;
  stockQuantity: number;
  code: string;
  image?: string | File;
}

interface IInventoryForm extends Omit<InventoryItem, "id"> {
  id?: string;
}

type InventoryList = InventoryItem[];

export type { InventoryItem, IInventoryForm, InventoryList };
