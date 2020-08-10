import { IsString, Length, ValidateNested, IsNumber, IsArray } from 'class-validator';
import { Type } from 'class-transformer/decorators';
import { BuildingDto } from './Building';
import { isNonPrimitiveArray } from './IsNonPrimitiveArray';

class NeighbourHoodDto {
  @Length(1, 30)
  @IsString()
  public neighbourhood: string;

  @IsNumber()
  // tslint:disable-next-line: variable-name
  public apartments_height: number;

  @ValidateNested({ each: true })
  @isNonPrimitiveArray()
  @IsArray()
  @Type(() => BuildingDto)
  public buildings: BuildingDto[];
}

export default NeighbourHoodDto;
