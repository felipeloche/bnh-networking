import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Intention } from './entities/intention.entity';
import { UsersService } from '../users/users.service';
import { CreateIntentionDto } from './dto/create-intention.dto';
import * as crypto from 'crypto';

@Injectable()
export class IntentionsService {
  constructor(
    @InjectRepository(Intention)
    private intentionsRepository: Repository<Intention>,
    private usersService: UsersService,
  ) {}

  async create(createIntentionDto: CreateIntentionDto) {
    const existingUser = await this.usersService.findByEmail(createIntentionDto.email);

    if (existingUser) {
      throw new ConflictException('Email já cadastrado');
    }

    const user = await this.usersService.create({
      email: createIntentionDto.email,
      name: createIntentionDto.name,
      company: createIntentionDto.company,
      phone: createIntentionDto.phone,
      status: 'PENDING',
      role: 'USER',
    });

    const intention = this.intentionsRepository.create({
      user,
      reason: createIntentionDto.reason,
      status: 'PENDING',
    });

    await this.intentionsRepository.save(intention);

    return {
      message: 'Intenção enviada com sucesso',
      intention: {
        id: intention.id,
        status: intention.status,
      },
    };
  }

  async findAll(status?: string) {
    const where = status ? { status } : {};
    return this.intentionsRepository.find({
      where,
      relations: ['user'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string) {
    return this.intentionsRepository.findOne({
      where: { id },
      relations: ['user', 'reviewed_by'],
    });
  }

  async approve(id: string, adminId: string) {
    const intention = await this.findOne(id);
    const admin = await this.usersService.findById(adminId);

    if (!intention || !admin) {
      throw new ConflictException('Intenção ou admin não encontrado');
    }

    const token = crypto.randomBytes(32).toString('hex');

    intention.status = 'APPROVED';
    intention.reviewed_by = admin;
    intention.reviewed_at = new Date();

    await this.intentionsRepository.save(intention);

    await this.usersService.update(intention.user.id, {
      status: 'APPROVED',
      token,
    });

    return {
      message: 'Intenção aprovada',
      token,
    };
  }

  async reject(id: string, adminId: string) {
    const intention = await this.findOne(id);
    const admin = await this.usersService.findById(adminId);

    if (!intention || !admin) {
      throw new ConflictException('Intenção ou admin não encontrado');
    }

    intention.status = 'REJECTED';
    intention.reviewed_by = admin;
    intention.reviewed_at = new Date();

    await this.intentionsRepository.save(intention);

    await this.usersService.update(intention.user.id, {
      status: 'REJECTED',
    });

    return {
      message: 'Intenção recusada',
    };
  }
}
