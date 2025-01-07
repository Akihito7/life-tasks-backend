import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class SignupDTO {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  name: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;
}

export class SignlnDTO {
  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;
}
