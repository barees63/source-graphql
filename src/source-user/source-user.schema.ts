import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class SourceUser {
  @Field()
  id!: number;
  @Field()
  supplierId!: number;
  @Field()
  producerId!: number;
  @Field()
  firstName!: string;
  @Field()
  lastName!: string;
  @Field()
  emailAddress!: string;
  @Field()
  token!: string;
}

@ObjectType()
export class SourceUserAuth {
  @Field()
  success!: boolean;
  @Field(() => [String], { nullable: true })
  errors!: string[];
  @Field({ nullable: true })
  id?: number;
  @Field({ nullable: true })
  token?: string;
}