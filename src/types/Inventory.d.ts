interface InventoryItem {
  id: string;
  name: string;
  description: string;
  stockQuantity: number;
  code: string;
  image: string | FileList;
}

interface IInventoryForm extends InventoryItem<Pick<"id">> {
  id?: string;
}

export type { InventoryItem, IInventoryForm };
