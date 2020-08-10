import { IsString, IsInt, Length, Min, Max } from 'class-validator';

class ApartmentDto {
  @Length(1, 30)
  @IsString()
  public neighbourhoodName: string;

  @Length(1, 10)
  @IsString()
  public building: string;

  @IsInt()
  @Min(1)
  @Max(20)
  public apartmentNumber: number;
}

export default ApartmentDto;
