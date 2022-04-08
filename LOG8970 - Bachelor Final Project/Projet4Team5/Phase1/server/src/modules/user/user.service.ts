import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { Model, ModelPopulateOptions } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateSelfPasswordDto } from "./dto/update-self-password.dto";
import { UserInterface } from "./user.interface";
import { RoleService } from "../role/role.service";

@Injectable()
export class UserService {
  constructor(
    @Inject("UserModelToken") private readonly userModel: Model<UserInterface>,
    private readonly roleService: RoleService
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // Hash the password with a salt.
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.role = (await this.roleService.findOne({ name: createUserDto.role }))._id;

    return await this.userModel.create(createUserDto);
  }

  public async updateSelfPassword(userId: string, updateUserPasswordDto: UpdateSelfPasswordDto) {
    const user = await this.userModel.findById(userId).exec();

    if (!user || !bcrypt.compareSync(updateUserPasswordDto.actualPassword, user.password)) {
      throw new BadRequestException("Invalid credentials.");
    }

    return await this.updateUserPassword(userId, updateUserPasswordDto.newPassword, false);
  }

  public async updateUserPassword(userId: string, password: string, firstLogIn: boolean) {
    return await this.userModel.findByIdAndUpdate(userId, {
      firstLogIn,
      password: bcrypt.hashSync(password, 10)
    });
  }

  async findById(userId: string, populate?: ModelPopulateOptions | ModelPopulateOptions[]) {
    let query = this.userModel.findById(userId);

    if (populate) {
      query = query.populate(populate);
    }

    return await query.exec();
  }

  async find(options?: any) {
    return await this.userModel.find(options).exec();
  }

  async login(credentials: { username: string; password: string }) {
    const user = await this.userModel
      .findOne({ username: credentials.username })
      .populate("role")
      .exec();

    if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
      throw new BadRequestException("Invalid credentials.");
    }

    return user;
  }

  public async delete(userId: string) {
    return await this.userModel.findByIdAndDelete(userId).exec();
  }
}
