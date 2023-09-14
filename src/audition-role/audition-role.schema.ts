import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AuditionRole {
  @Field ()
  success!: boolean;
  @Field(() => [String], { nullable: true })
  errors?: string[];
  @Field()
  id!: number;
  @Field()
  folderId!: number;
  @Field()
  roleName!: string;
}
