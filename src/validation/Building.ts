import { IsString, Length, IsNumber } from 'class-validator';
export class BuildingDto {
  @Length(1, 30)
  @IsString()
  public name: string;

  @IsNumber()
  // tslint:disable-next-line: variable-name
  public apartments_count: number;

  @IsNumber()
  public distance: number;
}

export default BuildingDto;
