import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../modules/users/users.service';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  const adminEmail = 'admin@bnh.com';
  const existingAdmin = await usersService.findByEmail(adminEmail);

  if (!existingAdmin) {
    const password_hash = await bcrypt.hash('admin123', 10);

    await usersService.create({
      email: adminEmail,
      password_hash,
      name: 'Admin',
      company: 'BNH',
      phone: '(00) 00000-0000',
      role: 'ADMIN',
      status: 'APPROVED',
    });

    console.log('✅ Admin criado: admin@bnh.com / admin123');
  } else {
    console.log('⚠️ Admin já existe');
  }

  await app.close();
}

bootstrap();
