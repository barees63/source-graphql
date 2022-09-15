import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class TalentSubmission {
  @Field({ nullable: true })
  elementId?: number;
  @Field({ nullable: true })
  elementName?: string;
  @Field({ nullable: true })
  folderId?: number;
  @Field({ nullable: true })
  folderName?: string;
  @Field({ nullable: true })
  jobTypeDescr?: string;
  @Field({ nullable: true })
  jobId?: number;
  @Field({ nullable: true })
  jobName?: string;
  @Field({ nullable: true })
  postedOn?: string;
  @Field({ nullable: true })
  seekingSubmissionFrom?: string;
  @Field(() => [String],{ nullable: true, })
  seekingSubmissionFromArray?: string[];
  @Field({ nullable: true })
  firstShootDate?: string;
  @Field({ nullable: true })
  firstShootDateTimezone?: string;
  @Field({ nullable: true })
  unionStatus?: string;
  @Field({ nullable: true })
  roleRate?: string;
  @Field({ nullable: true })
  roleNote?: string;
  @Field({ nullable: true })
  roleGender?: string;
  @Field(() => [String],{ nullable: true, })
  roleGenders?: string[];
  @Field({ nullable: true })
  roleEthnicity?: string;
  @Field(() => [String], { nullable: true, })
  roleEthnicities?: string[];
  @Field({ nullable: true })
  roleFromAge?: number;
  @Field({ nullable: true })
  roleToAge?: number;
  @Field({ nullable: true })
  expiryDate?: string;
  @Field({ nullable: true })
  rushCallInd?: number;
  @Field({ nullable: true })
  lastViewedOn?: string;
  @Field({ nullable: true })
  extraTypeNo?: number;
  @Field({ nullable: true })
  standInInd?: number;
  @Field({ nullable: true })
  briefDetail?: string;
  @Field({ nullable: true })
  newJobInd?: number;
  @Field({ nullable: true })
  folderElementInstanceId?: number;
  @Field({ nullable: true })
  dateApplied?: string;
  @Field({ nullable: true })
  dateLastRequest?: string;
  @Field({ nullable: true })
  dateLastRequestOrApplied?: string;
  @Field({ nullable: true })
  generalNoticeReadCount?: number;
  @Field({ nullable: true })
  generalNoticeUnreadCount?: number;
  @Field({ nullable: true })
  infoRequestsRespondedCount?: number;
  @Field({ nullable: true })
  infoRequestsPendingCount?: number;
  @Field({ nullable: true })
  availabilityRequestsCount?: number;
  @Field({ nullable: true })
  availabilityRequestsAvailableCount?: number;
  @Field({ nullable: true })
  availabilityRequestsPendingCount?: number;
  @Field({ nullable: true })
  bookingRequestsCount?: number;
  @Field({ nullable: true })
  bookingRequestsAvailableCount?: number;
  @Field({ nullable: true })
  bookingRequestsPendingCount?: number;
  @Field({ nullable: true })
  callTimesUnread?: number;
  @Field({ nullable: true })
  callTimesRead?: number;
  @Field({ nullable: true })
  callTimesCancelled?: number;
}


@ObjectType()
export class TalentProfile {
  @Field({ nullable: true })
  elementId?: number;
  @Field({ nullable: true })
  elementName?: string;
  @Field({ nullable: true })
  firstName?: string;
  @Field({ nullable: true })
  lastName?: string;
  @Field({ nullable: true })
  legalName?: string;
  @Field({ nullable: true })
  gender?: string;
  @Field({ nullable: true })
  modelDOB?: string;
  @Field({ nullable: true })
  playingAge?: number;
  @Field({ nullable: true })
  destinationID?: number;
  @Field({ nullable: true })
  unionNo?: number;
  @Field({ nullable: true })
  notificationsViaEmail?: boolean;
  @Field({ nullable: true })
  notificationsViaApp?: boolean;
  @Field({ nullable: true })
  marketingViaEmail?: boolean;
  @Field({ nullable: true })
  hair?: number;
  @Field({ nullable: true })
  eye?: number;
  @Field({ nullable: true })
  heightCentimeters?: number;
  @Field({ nullable: true })
  heightInches?: number;
  @Field({ nullable: true })
  ethnicity?: string;
  @Field(()=> [String],{ nullable: true })
  ethnicityList?: string[];
  @Field({ nullable: true })
  inSeam?: number;
  @Field({ nullable: true })
  outSeam?: number;
  @Field({ nullable: true })
  clothingSize?: number;
  @Field({ nullable: true })
  chest?: number;
  @Field({ nullable: true })
  bust?: number;
  @Field({ nullable: true })
  collar?: number;
  @Field({ nullable: true })
  sleeve?: number;
  @Field({ nullable: true })
  unionRegistrationNo?: string;
  @Field({ nullable: true })
  unionRegistrationName?: string;
  @Field({ nullable: true })
  suit?: number;
  @Field({ nullable: true })
  suitCut?: string;
  @Field({ nullable: true })
  cupSize?: string;
  @Field({ nullable: true })
  waist?: number;
  @Field({ nullable: true })
  weight?: number;
  @Field({ nullable: true })
  mobileNumber?: string;
  @Field({ nullable: true })
  googlePlaceCountry?: string;
  @Field({ nullable: true })
  googlePlaceState?: string;
  @Field({ nullable: true })
  googlePlaceCity?: string;
  @Field({ nullable: true })
  googlePlaceLatitude?: string;
  @Field({ nullable: true })
  googlePlaceLongitude?: string;
  @Field({ nullable: true })
  googlePlaceAddress?: string;
  @Field({ nullable: true })
  googlePlaceID?: string;
  @Field({ nullable: true })
  dressSize?: number;
  @Field({ nullable: true })
  hips?: number;
  @Field({ nullable: true })
  shoe?: number;
  @Field({ nullable: true })
  medicalCovidTestExempt?: boolean;
  @Field({ nullable: true })
  looksLike?: string;
  @Field(()=>[String],{ nullable: true })
  looksLikeList?: string[];
}

@ObjectType()
export class Talent {
  @Field()
  accountID!: number;
  @Field()
  ymcO_ElementID!: number;
  @Field({ nullable: true })
  parent_YMCO_ElementID?: number;
  @Field({ nullable: true })
  linkCode?: string;
  @Field({ nullable: true })
  linkStatus?: number;
  @Field()
  elementName!: string;
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: true })
  ymcO_SupplierID?: number;
  @Field({ nullable: true })
  supplierName?: string;
  @Field()
  email!: string;
  @Field()
  dateCreated!: string;
  @Field({ nullable: true })
  ymcO_ElementTypeNo?: number;
  @Field({ nullable: true })
  syngency_ModelID?: number;
  @Field({ nullable: true })
  syngency_UserID?: number;
  @Field({ nullable: true })
  stripe_Customer?: string;

  @Field({ nullable: true })
  profile?: TalentProfile;

  @Field(() => [TalentSubmission])
  submissions?: TalentSubmission[];
}
