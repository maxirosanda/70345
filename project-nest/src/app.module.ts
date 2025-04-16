import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FirstMiddleware } from './middlewares/firstMiddleware';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
            UsersModule,
            PetsModule,
            ConfigModule.forRoot({isGlobal:true}),
            MongooseModule.forRootAsync({
              imports:[ConfigModule],
              inject:[ConfigService],
              useFactory: async(configService:ConfigService)=>({uri:configService.get<string>("MONGO_URI")}),
            }),
            ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirstMiddleware).forRoutes({path:"users",method:RequestMethod.ALL},{path:"pets",method:RequestMethod.POST});
  }
}
