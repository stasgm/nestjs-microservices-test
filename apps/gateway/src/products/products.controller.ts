import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { ProductDTO } from '../types';

@Controller('products')
export class ProductsController {
  constructor(@Inject('PRODUCTS_SERVICE') private client: ClientProxy) {}

  @Get()
  getAllProducts() {
    return this.client.send({ cmd: 'get_products' }, {});
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.client.send({ cmd: 'get_product' }, id);
  }

  @Post()
  createNewProduct(@Body() product: ProductDTO) {
    return this.client.emit({ cmd: 'new_product' }, product);
  }
}
