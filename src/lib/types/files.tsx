export type FileDocument = {
  id: string;
  name: string;
  status: "generated" | "pending";
  added: string;
  created_at: number;
  uodated_at: number;
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

export type CleanedCSVType = {
  base_sku: string;
  size_category: string;
  item_sku: string;
  color: string;
  size: string;
  type: "HD" | "TS" | "HAT";
};

export type FetchAndParsedCleanCSV = {
  name: string;
  id: string;
  status: "generated" | "pending";
  cleaned: CleanedCSVType[];
};
