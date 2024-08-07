import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

describe('FlowerController (e2e)', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleMixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleMixture.createNestApplication();
		app.useGlobalPipes(new ValidationPipe());
		await app.init();
	});

	it('/flowers (GET)', async () => {
		return request(app.getHttpServer())
			.get('/flowers')
			.expect(200)
			.expect([
				{
					id: 1,
					name: 'Rose',
					color: 'Red',
					price: 10,
					createdAt: '2024-08-04T13:27:14.879Z',
					updatedAt: '2024-08-04T13:27:14.879Z',
				},
				{
					id: 2,
					name: 'Lily',
					color: 'White',
					price: 12.5,
					createdAt: '2024-08-04T13:50:05.939Z',
					updatedAt: '2024-08-04T13:50:05.939Z',
				},
				{
					id: 3,
					name: 'Tulip',
					color: 'Yellow',
					price: 8.59,
					createdAt: '2024-08-04T13:50:26.408Z',
					updatedAt: '2024-08-04T13:50:26.408Z',
				},
			]);
	});

	it('/flowers (POST)', async () => {
		return request(app.getHttpServer())
			.post('/flowers')
			.send({
				name: 'Orchid',
				color: 'Purple',
				price: 15,
			})
			.expect(201)
			.expect(response => {
				return response.body.name === 'Orchid';
			});
	});

	afterAll(async () => {
		await app.close();
	});
});
