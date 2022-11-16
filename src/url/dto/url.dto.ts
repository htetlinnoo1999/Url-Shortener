import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateUrlDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
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
  readonly originalUrl?: string;

  @IsDateString()
  @IsOptional()
  readonly expired_at?: Date;

  @IsString()
  @IsOptional()
  readonly shortenUrl?: string;

  @IsNumber()
  @IsOptional()
  readonly count?: number;
}
