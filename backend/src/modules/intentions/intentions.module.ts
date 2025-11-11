import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Intention } from './entities/intention.entity';
import { IntentionsService } from './intentions.service';
import { IntentionsController } from './intentions.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Intention]), UsersModule],
  providers: [IntentionsService],
  controllers: [IntentionsController],
})
export class IntentionsModule {}
