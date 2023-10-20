import {forwardRef, Module} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from './users.model'
import {UserRoles} from "../roles/user-roles.model";
import {Role} from "../roles/roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports:[
      SequelizeModule.forFeature([User, Role, UserRoles]),
      RolesModule,
      forwardRef(()=>AuthModule)
  ],
    exports: [
        UsersService,
    ]
})
export class UsersModule {}
