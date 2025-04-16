import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule, PetsModule,MongooseModule.forRoot('mongodb://localhost:27017/nest')],
  controllers: [],
  providers: [],
})
export class AppModule {}
