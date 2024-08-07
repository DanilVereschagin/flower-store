import { Test } from '@nestjs/testing';
import { FlowersController } from './flowers.controller';
import { FlowersService } from './flowers.service';

describe('FlowerController', () => {
	let controller: FlowersController;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			controllers: [FlowersController],
			providers: [
				{
					provide: FlowersService,
					useValue: {
						findAll: jest.fn().mockResolvedValue([
							{
								id: 1,
								name: 'Rose',
								color: 'Red',
								price: 10,
							},
						]),
						create: jest.fn().mockResolvedValue({
							id: 4,
							name: 'Carnation',
							color: 'Red',
							price: 5.99,
						}),
					},
				},
			],
		}).compile();

		controller = module.get<FlowersController>(FlowersController);
	});

	it('should return all flowers', async () => {
		expect(await controller.findAll()).toEqual([
			{
				id: 1,
				name: 'Rose',
				color: 'Red',
				price: 10,
			},
			// {
			// 	id: 2,
			// 	name: 'Lily',
			// 	color: 'Blue',
			// 	price: 8.99,
			// },
			// {
			// 	id: 3,
			// 	name: 'Tulip',
			// 	color: 'Yellow',
			// 	price: 7.5,
			// },
			// {
			// 	id: 4,
			// 	name: 'Carnation',
			// 	color: 'Red',
			// 	price: 5.99,
			// },
		]);
	});

	it('should return all flowers', async () => {
		expect(
			await controller.create({
				name: 'Carnation',
				color: 'Red',
				price: 5.99,
			})
		).toEqual({
			id: 4,
			name: 'Carnation',
			color: 'Red',
			price: 5.99,
		});
	});
});
