import { Injectable } from '@nestjs/common';

import { Product, ProductDTO } from './types';

const products: Product[] = [
  {
    id: '1',
    name: 'Fish',
  },
  {
    id: '2',
    name: 'Porky',
  },
  {
    id: '1',
    name: 'Beef',
  },
];

@Injectable()
export class AppService {
  getProductByID(productID: string) {
    return products.find((b: Product) => b.id == productID);
  }

  getAllProducts() {
    return products;
  }

  newProduct(product: ProductDTO): Product {
    const exists = products.find((usr: ProductDTO) => {
      return usr.name == product.name;
    });

    if (exists) {
      throw new Error('Product already exists');
    }

    const newProduct = {
      id: `${products.length + 1}`,
      ...product,
    };

    products.push(newProduct);

    return newProduct;
  }
}
