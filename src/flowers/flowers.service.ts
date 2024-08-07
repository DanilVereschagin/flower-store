import { Injectable } from '@nestjs/common';
import { Flower } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateFlowersDto } from './flower.dto';
import { ConfigService } from '@nestjs/config';
import { EnumAppMode } from '../types';

@Injectable()
export class FlowersService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly configService: ConfigService
	) {}

	findAll() {
		console.log(this.configService.get<EnumAppMode>('MODE'));
		return this.prisma.flower.findMany();
	}

	create(dto: CreateFlowersDto) {
		return this.prisma.flower.create({
			data: dto,
		});
	}
}
