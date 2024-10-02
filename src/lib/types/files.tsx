export type FileDocument = {
  id: string;
  name: string;
  status: "generated" | "pending";
  added: string;
  created_at: string;
  total_items: number;
  csv_url: string;
  cleaned_csv_url: string;
};

export type FileDetail = {
  id: string;
  name: string;
  status: "generated" | "pending";
  added: string;
  created_at: string;
  total_items: number;
  csv_url: string;
  cleaned_csv_url: string;
  csv_data: {
    print_sku: string; // "1234-SIZE-COLOR"
    store_sku: string; // "STORE-SKU-1234-SIZE-COLOR"
    type: "shirt" | "hoodie";
  }[];
};
