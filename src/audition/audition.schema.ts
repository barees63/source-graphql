import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Audition {
  @Field ()
  success!: boolean;
  @Field(() => [String], { nullable: true })
  errors?: string[];
  @Field()
  id!: number;
  @Field()
  jobDateId!: number;
  @Field()
  jobId!: number;
  @Field()
  jobName!: string;
  @Field()
  eventDate!: string;
  @Field()
  eventDescription!: string;
  @Field()
  city!: string;
  @Field()
  country!: string;
  @Field()
  jobDestinationID!: number;
  @Field()
  jobDateDestinationId!: number;
  @Field()
  timezone!: string;
  @Field()
  jobDateTimeZone!: string;
  @Field()
  jobTimeZone!: string;
}
