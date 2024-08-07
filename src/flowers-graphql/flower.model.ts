import { Field, Float, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class FlowerModel {
	@Field(() => Int)
	id: number;

	@Field(() => String)
	name: string;

	@Field(() => String)
	color: string;

	@Field(() => Float)
	price: number;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;
}
