import { ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer/decorators';
import 'reflect-metadata';
import NeighbourHoodDto from './NeighbourHoods';
import { isNonPrimitiveArray } from './IsNonPrimitiveArray';

class CityDto {

  @ValidateNested({ each: true })
  @isNonPrimitiveArray()
  @IsArray()
  @Type(() => NeighbourHoodDto)
  public neighbourhoods: NeighbourHoodDto[];
}

export default CityDto;
