import {
	Controller,
	Get,
	Query,
	UseGuards,
	UseInterceptors,
	Post,
	Body,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { ParseIntPipe } from 'src/conception/pipe';
import { AuthGuards } from 'src/conception/guard';
import { LoggingInterceptor } from 'src/conception/interceptor';
import { CreateFlowersDto } from './flower.dto';

@Controller('flowers')
// @UseInterceptors(LoggingInterceptor)
export class FlowersController {
	constructor(private readonly flowersService: FlowersService) {}

	@Get()
	// @UseGuards(AuthGuards)
	findAll() {
		return this.flowersService.findAll();
	}

	@Post()
	@UsePipes(new ValidationPipe())
	// @UseGuards(AuthGuards)
	create(@Body() dto: CreateFlowersDto) {
		return this.flowersService.create(dto);
	}
}
