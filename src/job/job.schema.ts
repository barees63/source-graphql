import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Job {
  @Field()
  folderObjectID!: string;
  @Field()
  folderId!: number;
  @Field()
  folderName!: string;
  @Field()
  jobId!: number;
  @Field()
  jobTypeDescr!: string;
  @Field()
  jobName!: string;
  @Field()
  postedOn!: string;
  @Field( ()=>[String],{ nullable: true })
  seekingSubmissionFromArray?: string[];
  @Field({ nullable: true })
  firstShootDate?: string;
  @Field({ nullable: true })
  firstShootDateTimezone?: string;
  @Field( { nullable: true })
  covidTestDates?: string;
  @Field( { nullable: true })
  covidTestDatesTimezones?: string;
  @Field({ nullable: true })
  shootDates?: string;
  @Field( { nullable: true })
  shootDatesTimezones?: string;
  @Field({ nullable: true })
  unionStatus?: string;
  @Field({ nullable: true })
  roleRate?: string;
  @Field({ nullable: true })
  roleNote?: string;
  @Field( () => [String],{ nullable: true })
  roleGenders?: string[];
  @Field({ nullable: true })
  workRequirements?: string;
  @Field({ nullable: true })
  siteInd?: number;
  @Field({ nullable: true })
  siteDetails?: string;
  @Field({ nullable: true })
  isPayingRoleInd?: number;
  @Field(()=>[String],{ nullable: true })
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
  @Field()
  synopsis!: string;
  @Field()
  hasApplied!: number;
  @Field({ nullable: true })
  dateApplied?: string;
  @Field({ nullable: true })
  displayOnPortal?: number;
  @Field({ nullable: true })
  talentSubmissionInstruction?: string;
  @Field({ nullable: true })
  openCallInd!: number;
  @Field( ()=>[String],{ nullable: true })
  roleBumps?: string[];
}

@ObjectType()
export class InformationRequest {
  @Field()
  folderElementInstanceId!: number;
  @Field()
  extrasWorksheetElementId!: number;
  @Field()
  extrasWorksheetRequestId!: number;
  @Field()
  extrasWorksheetId!: number;
  @Field()
  jobDateId!: number;
  @Field()
  extrasWorksheetRequestTypeNo!: number;
  @Field()
  extrasWorksheetRequestDescr!: number;
  @Field()
  updateWorksheetStatusNo!: number;
  @Field()
  updateIfRequestInd!: number;
  @Field()
  extrasWorksheetRequestDate!: number;
  @Field()
  extrasWorksheetRecipients!: number;
  @Field()
  extrasWorksheetRecipientsDone!: number;
  @Field()
  worksheetStatusNo!: number;
  @Field()
  customColumnId!: number;
  @Field()
  fieldName!: number;
  @Field()
  fieldType!: number;
  @Field()
  fieldValues!: string;
  @Field()
  savedValue!: string;
  @Field()
  attachmentUrl!: string;
  @Field()
  requestQuestion!: string;
  @Field()
  requireMediaInd!: string;
  @Field()
  requireMediaNote!: string;
  @Field()
  requestStatusNo!: number;
  @Field({ nullable: true })
  respondedOn?: string;
}

/*
        List<SourceJobInfoRequest>? infoRequests;
        List<SourceJobCallTime>? callTimes;
        List<SourceJobCallTimeItem>? callTimeItems;
        List<SourceJobAvailabilityRequest>? availabilityRequests;
        List<SourceJobBookingRequest>? bookingRequests;
        List<GeneralNotice>? notices;
 */
