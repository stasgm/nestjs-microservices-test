export interface Product {
  id: string;
  name: string;
}

export interface ProductDTO extends Omit<Product, 'id'> {}
