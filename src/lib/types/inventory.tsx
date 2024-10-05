export type Images = {
  front: string;
  back: string;
  sleeve: string;
  front_mockup: string;
  back_mockup: string;
};

export type InventoryDocument = {
  location: {
    room: string;
    shelf: string;
    level: string;
  };
  qr_code: string;
  inventory_levl: number;
  id: string;
  images: Images;
  sku: string;
  size: string;
  color: string;
  type: "shirt" | "hoodie" | "hat";
  store: string;
  status: "in_stock" | "out_of_stock" | "archived";
  created_at: string;
  updated_at: string;
};
