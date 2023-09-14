import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class GenericMutationResult {
  @Field()
  id!: number;
  @Field()
  success!: boolean;
  @Field(() => [String], { nullable: true })
  errors?: string[];
}