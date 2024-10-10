interface Variant {
  id: string;
  sku: string;
  title: string;
  price: {
    amount: string;
  };
  image: {
    url: string;
  };
}

interface ProductNode {
  id: string;
  title: string;
  variants: {
    edges: {
      node: Variant;
    }[];
  };
}

interface ProductEdge {
  node: ProductNode;
}

interface ProductsResponseData {
  products: {
    edges: ProductEdge[];
  };
}

export interface ProductsResponse {
  data: ProductsResponseData;
  status: number;
  message?: string;
  errors?: {
    message: string;
    extensions?: {
      code: string;
    };
  }[];
}
