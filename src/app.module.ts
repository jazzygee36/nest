import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { DatabseModule } from './databse/databse.module';

@Module({
  imports: [UsersModule, ProfileModule, DatabseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
