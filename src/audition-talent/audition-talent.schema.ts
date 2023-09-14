import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AuditionTalent {
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
  @Field()
  folderId!: number;
  @Field()
  roleName!: string;
  @Field()
  folderElementInstanceId!: number;
  @Field()
  jobBriefSupplierElementId!: number;
  @Field()
  elementId!: number;
  @Field()
  talentFullName!: string;
  @Field({ nullable: true})
  firstName?: string;
  @Field({ nullable: true})
  lastName?: string;
  @Field({ nullable: true})
  timeSlot?: string;
  @Field({ nullable: true})
  castingNumber?: number;
  @Field({ nullable: true})
  castingStatus?: string;
  @Field({ nullable: true})
  castingReady?: boolean;
  @Field({ nullable: true})
  castingSeen?: boolean;
  @Field({ nullable: true})
  imageUrl?: string;
}

@ObjectType()
export class AuditionTalentMedia {
  @Field ()
  success!: boolean;
  @Field(() => [String], { nullable: true })
  errors?: string[];
  @Field()
  id!: number;
  @Field()
  mediaType!: string;
  @Field()
  mediaRank!: number;
  @Field()
  mediaId!: number;
  @Field()
  archived!: boolean;
  @Field({ nullable: true })
  folderElementImageId?: number;
  @Field({ nullable: true })
  folderElementVideoId?: number;
  @Field({ nullable: true })
  elementImageId?: number;
  @Field({ nullable: true })
  elementVideoId?: number;
  @Field({ nullable: true })
  url?: string;
  @Field({ nullable: true })
  thumbnailUrl?: string;
  @Field({ nullable: true })
  dateCreated?: string;
  @Field({ nullable: true })
  transcodeStatus?: string;
  @Field({ nullable: true })
  description?: string;
}

