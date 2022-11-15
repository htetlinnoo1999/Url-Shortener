import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUrlDto {
  @IsString()
  @IsNotEmpty()
  readonly originalUrl: string;

  @IsDateString()
  @IsOptional()
  readonly expired_at: Date;

  @IsString()
  @IsOptional()
  readonly shortenUrl: string;
}

export class UpdateUrlDto {
  @IsString()
  @IsOptional()
  readonly originalUrl: string;

  @IsDateString()
  @IsOptional()
  readonly expired_at: Date;

  @IsString()
  @IsOptional()
  readonly shortenUrl: string;
}
