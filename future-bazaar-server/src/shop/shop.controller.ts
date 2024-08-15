import { Controller } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('shop')
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  
}
