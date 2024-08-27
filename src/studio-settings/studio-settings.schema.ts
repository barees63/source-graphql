import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class StudioSettings {
  @Field ()
  success!: boolean;
  @Field(() => [String], { nullable: true })
  errors?: string[];
  @Field()
  producerId!: number;
  @Field()
  cropPhotoToPortrait!: boolean;
  @Field()
  highDefinitionMode!: boolean;
}
