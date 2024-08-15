import { IsOptional, IsInt, Min, IsString } from 'class-validator';

export class GetRequestsInputModel {
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @IsString()
  shopName: string;

  // Add more filter and search fields as needed
}
