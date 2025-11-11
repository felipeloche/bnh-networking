import { Controller, Post, Get, Patch, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IntentionsService } from './intentions.service';
import { CreateIntentionDto } from './dto/create-intention.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/intentions')
export class IntentionsController {
  constructor(private intentionsService: IntentionsService) {}

  @Post()
  async create(@Body() createIntentionDto: CreateIntentionDto) {
    return this.intentionsService.create(createIntentionDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Get()
  async findAll(@Query('status') status?: string) {
    return this.intentionsService.findAll(status);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.intentionsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/approve')
  async approve(@Param('id') id: string, @Request() req) {
    return this.intentionsService.approve(id, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/reject')
  async reject(@Param('id') id: string, @Request() req) {
    return this.intentionsService.reject(id, req.user.id);
  }
}
