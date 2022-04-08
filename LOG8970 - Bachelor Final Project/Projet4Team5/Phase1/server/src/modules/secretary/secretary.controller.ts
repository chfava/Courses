import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Permissions } from "../../decorators/permissions.decorator";
import { CheckLoggedInGuard } from "../../guards/check-logged-in.guard";
import { PermissionsGuard } from "../../guards/permissions.guard";
import { CreateSecretaryDto } from "./dto/create-secretary.dto";
import { UpdateSecretaryDto } from "./dto/update-secretary.dto";
import { SecretaryService } from "./secretary.service";

@Controller("secretaries")
@UseGuards(AuthGuard("jwt"), PermissionsGuard)
export class SecretaryController {
  constructor(private readonly secretaryService: SecretaryService) {}

  @Post()
  @Permissions("meditrinae-api:secretaries:create")
  public createSecretary(@Body() createSecretaryDto: CreateSecretaryDto) {
    return this.secretaryService.create(createSecretaryDto);
  }

  @Get()
  @Permissions("meditrinae-api:secretaries:get")
  public getAllSecretary() {
    return this.secretaryService.find();
  }

  @Get(":id")
  @Permissions("meditrinae-api:secretaries:get")
  public getSecretaryById(@Param("id") secretaryId: string) {
    return this.secretaryService.findById(secretaryId);
  }

  @Put()
  @Permissions("meditrinae-api:secretaries:update")
  public updateSecretary(@Body() updateSecretaryDto: UpdateSecretaryDto) {
    return this.secretaryService.update(updateSecretaryDto);
  }

  @Delete(":id")
  @UseGuards(CheckLoggedInGuard)
  @Permissions("meditrinae-api:secretaries:delete")
  public deleteSecretary(@Param("id") secretaryId: string) {
    return this.secretaryService.delete(secretaryId);
  }
}
