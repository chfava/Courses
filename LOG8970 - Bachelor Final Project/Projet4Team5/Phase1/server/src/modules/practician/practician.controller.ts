import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Permissions } from "../../decorators/permissions.decorator";
import { CheckLoggedInGuard } from "../../guards/check-logged-in.guard";
import { PermissionsGuard } from "../../guards/permissions.guard";
import { CreatePracticianDto } from "./dto/create-practician.dto";
import { UpdatePracticianDto } from "./dto/update-practician.dto";
import { PracticianService } from "./practician.service";

@Controller("practicians")
@UseGuards(AuthGuard("jwt"), PermissionsGuard)
export class PracticianController {
  constructor(private readonly practicianService: PracticianService) {}

  @Post()
  @Permissions("meditrinae-api:practicians:create")
  public async createPractician(@Body() createPracticianDto: CreatePracticianDto) {
    return this.practicianService.create(createPracticianDto);
  }

  @Get()
  @Permissions("meditrinae-api:practicians:get")
  public async getAllPracticians() {
    return this.practicianService.find();
  }

  @Get(":id")
  @Permissions("meditrinae-api:practicians:get")
  public async getPracticianById(@Param("id") practicianId: string) {
    return this.practicianService.findById(practicianId);
  }

  @Put()
  @Permissions("meditrinae-api:practicians:update")
  public async updatePractician(@Body() updatePracticianDto: UpdatePracticianDto) {
    return this.practicianService.update(updatePracticianDto);
  }

  @Delete(":id")
  @UseGuards(CheckLoggedInGuard)
  @Permissions("meditrinae-api:practicians:delete")
  public async deletePractician(@Param("id") practicianId: string) {
    return this.practicianService.deleteById(practicianId);
  }
}
