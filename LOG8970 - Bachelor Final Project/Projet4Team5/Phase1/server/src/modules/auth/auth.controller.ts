import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateTokenDto } from "./dto/create-token.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("token")
  public async createToken(@Body() createTokenDto: CreateTokenDto) {
    return this.authService.createToken(createTokenDto);
  }
}
