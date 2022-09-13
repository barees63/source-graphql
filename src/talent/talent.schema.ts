import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class TalentSubmission {
  @Field()
  elementId?: number;
  @Field()
  elementName?: string;
  @Field()
  folderId?: number;
  @Field()
  folderName?: string;
  @Field()
  jobTypeDescr?: string;
  @Field()
  jobId?: number;
  @Field()
  jobName?: string;
  @Field()
  postedOn?: string;
  @Field()
  seekingSubmissionFrom?: string;
  @Field(() => [String],{ nullable: true, })
  seekingSubmissionFromArray?: string[];
  @Field()
  firstShootDate?: string;
  @Field()
  firstShootDateTimezone?: string;
  @Field()
  unionStatus?: string;
  @Field()
  roleRate?: string;
  @Field()
  roleNote?: string;
  @Field()
  roleGender?: string;
  @Field(() => [String],{ nullable: true, })
  roleGenders?: string[];
  @Field()
  roleEthnicity?: string;
  @Field(() => [String], { nullable: true, })
  roleEthnicities?: string[];
  @Field()
  roleFromAge?: number;
  @Field()
  roleToAge?: number;
  @Field()
  expiryDate?: string;
  @Field()
  rushCallInd?: number;
  @Field()
  lastViewedOn?: string;
  @Field()
  extraTypeNo?: number;
  @Field()
  standInInd?: number;
  @Field()
  briefDetail?: string;
  @Field()
  newJobInd?: number;
  @Field()
  folderElementInstanceId?: number;
  @Field()
  dateApplied?: string;
  @Field()
  dateLastRequest?: string;
  @Field()
  dateLastRequestOrApplied?: string;
  @Field()
  generalNoticeReadCount?: number;
  @Field()
  generalNoticeUnreadCount?: number;
  @Field()
  infoRequestsRespondedCount?: number;
  @Field()
  infoRequestsPendingCount?: number;
  @Field()
  availabilityRequestsCount?: number;
  @Field()
  availabilityRequestsAvailableCount?: number;
  @Field()
  availabilityRequestsPendingCount?: number;
  @Field()
  bookingRequestsCount?: number;
  @Field()
  bookingRequestsAvailableCount?: number;
  @Field()
  bookingRequestsPendingCount?: number;
  @Field()
  callTimesUnread?: number;
  @Field()
  callTimesRead?: number;
  @Field()
  callTimesCancelled?: number;
}


@ObjectType()
export class TalentProfile {
  @Field()
  elementId?: number;
  @Field()
  elementName?: string;
  @Field()
  firstName?: string;
  @Field()
  lastName?: string;
  @Field()
  legalName?: string;
  @Field()
  gender?: string;
  @Field()
  modelDOB?: string;
  @Field()
  playingAge?: number;
  @Field()
  destinationID?: number;
  @Field()
  unionNo?: number;
  @Field()
  notificationsViaEmail?: boolean;
  @Field()
  notificationsViaApp?: boolean;
  @Field()
  marketingViaEmail?: boolean;
  @Field()
  hair?: number;
  @Field()
  eye?: number;
  @Field()
  heightCentimeters?: number;
  @Field()
  heightInches?: number;
  @Field()
  ethnicity?: string;
  @Field()
  ethnicityList?: string;
  @Field()
  inSeam?: number;
  @Field()
  outSeam?: number;
  @Field()
  clothingSize?: number;
  @Field()
  chest?: number;
  @Field()
  bust?: number;
  @Field()
  collar?: number;
  @Field()
  sleeve?: number;
  @Field()
  unionRegistrationNo?: string;
  @Field()
  unionRegistrationName?: string;
  @Field()
  suit?: number;
  @Field()
  suitCut?: string;
  @Field()
  cupSize?: string;
  @Field()
  waist?: number;
  @Field()
  weight?: number;
  @Field()
  mobileNumber?: string;
  @Field()
  googlePlaceCountry?: string;
  @Field()
  googlePlaceState?: string;
  @Field()
  googlePlaceCity?: string;
  @Field()
  googlePlaceLatitude?: string;
  @Field()
  googlePlaceLongitude?: string;
  @Field()
  googlePlaceAddress?: string;
  @Field()
  googlePlaceID?: string;
  @Field()
  dressSize?: number;
  @Field()
  hips?: number;
  @Field()
  shoe?: number;
  @Field()
  medicalCovidTestExempt?: boolean;
  @Field()
  looksLike?: string;
  @Field()
  looksLikeList?: string;
}

@ObjectType()
export class Talent {
  @Field()
  accountID!: number;
  @Field()
  ymcO_ElementID!: number;
  @Field()
  parent_YMCO_ElementID?: number;
  @Field()
  linkCode?: string;
  @Field()
  linkStatus?: number;
  @Field()
  elementName!: string;
  @Field()
  description?: string;
  @Field()
  ymcO_SupplierID?: number;
  @Field()
  supplierName?: string;
  @Field()
  email!: string;
  @Field()
  dateCreated!: string;
  @Field()
  ymcO_ElementTypeNo?: number;
  @Field()
  syngency_ModelID?: number;
  @Field()
  syngency_UserID?: number;
  @Field()
  stripe_Customer?: string;

  @Field()
  profile?: TalentProfile;

  @Field(() => [TalentSubmission])
  submissions?: TalentSubmission[];
}
