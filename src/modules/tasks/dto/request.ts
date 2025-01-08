import { status_enum, mission_type_enum } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddTaskRequestDTO {
  @IsNumber()
  user_id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(status_enum)
  status: status_enum;

  @IsDateString()
  start_date: Date;

  @IsDateString()
  end_date: Date;

  @IsNumber()
  xp_reward: number;

  @IsNumber()
  penalty: number;

  @IsString()
  @IsOptional()
  related_attribute?: string;

  @IsNumber()
  progress: number;

  @IsBoolean()
  is_recurring: boolean;

  @IsDateString()
  created_at: Date;

  @IsDateString()
  updated_at: Date;

  @IsEnum(mission_type_enum)
  mission_type: mission_type_enum;
}
