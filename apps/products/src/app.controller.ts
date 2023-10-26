import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AppService } from './app.service';
import { Product, ProductDTO } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  getVersion() {
    return '0.0.1';
  }

  @MessagePattern({ cmd: 'new_product' })
  newProduct(product: ProductDTO): Product {
    const result = this.appService.newProduct(product);

    if (!result) {
      throw new Error('Product already exists');
    } else {
      return result;
    }
  }

  @MessagePattern({ cmd: 'get_product' })
  getBook(productId: string): ProductDTO {
    return this.appService.getProductByID(productId);
  }

  @MessagePattern({ cmd: 'get_products' })
  getBooks(): ProductDTO[] {
    return this.appService.getAllProducts();
  }
}
