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
  @Field(() => [String], { nullable: true })
  seekingSubmissionFromArray?: string[];
  @Field({ nullable: true })
  firstShootDate?: string;
  @Field({ nullable: true })
  firstShootDateTimezone?: string;
  @Field({ nullable: true })
  covidTestDates?: string;
  @Field({ nullable: true })
  covidTestDatesTimezones?: string;
  @Field({ nullable: true })
  shootDates?: string;
  @Field({ nullable: true })
  shootDatesTimezones?: string;
  @Field({ nullable: true })
  unionStatus?: string;
  @Field({ nullable: true })
  roleRate?: string;
  @Field({ nullable: true })
  roleNote?: string;
  @Field(() => [String], { nullable: true })
  roleGenders?: string[];
  @Field({ nullable: true })
  workRequirements?: string;
  @Field({ nullable: true })
  siteInd?: number;
  @Field({ nullable: true })
  siteDetails?: string;
  @Field({ nullable: true })
  isPayingRoleInd?: number;
  @Field(() => [String], { nullable: true })
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
  @Field(() => [String], { nullable: true })
  roleBumps?: string[];

  @Field(() => [InformationRequest], { nullable: true })
  informationRequests?: InformationRequest[];
  @Field(() => [AvailabilityRequest], { nullable: true })
  availabilityRequests?: AvailabilityRequest[];
  @Field(() => [BookingRequest], { nullable: true })
  bookingRequests?: BookingRequest[];
  @Field(() => [GeneralNotice], { nullable: true })
  generalNotices?: GeneralNotice[];
  @Field(() => [CallTime], { nullable: true })
  callTimes?: CallTime[];
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
  @Field({ nullable: true })
  jobDateID?: number;
  @Field()
  extrasWorksheetRequestTypeNo!: number;
  @Field()
  extrasWorksheetRequestDescr!: string;
  @Field()
  updateWorksheetStatusNo!: number;
  @Field()
  updateIfRequestInd!: number;
  @Field()
  extrasWorksheetRequestDate!: string;
  @Field()
  extrasWorksheetRecipients!: number;
  @Field()
  extrasWorksheetRecipientsDone!: number;
  @Field()
  worksheetStatusNo!: number;
  @Field()
  customColumnId!: string;
  @Field()
  fieldName!: string;
  @Field()
  fieldType!: string;
  @Field()
  fieldValues!: string;
  @Field()
  savedValue!: string;
  @Field({ nullable: true })
  attachmentUrl?: string;
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

@ObjectType()
export class AvailabilityRequest {
  @Field()
  folderElementInstanceId!: number;
  @Field()
  extrasWorksheetElementId!: number;
  @Field()
  extrasWorksheetRequestId!: number;
  @Field()
  extrasWorksheetId!: number;
  @Field({ nullable: true })
  jobDateID?: number;
  @Field()
  extrasWorksheetRequestTypeNo!: number;
  @Field()
  extrasWorksheetRequestDescr!: string;
  @Field()
  updateWorksheetStatusNo!: number;
  @Field()
  updateIfRequestInd!: number;
  @Field()
  extrasWorksheetRequestDate!: string;
  @Field()
  extrasWorksheetRecipients!: number;
  @Field()
  extrasWorksheetRecipientsDone!: number;
  @Field()
  shootDate!: string;
  @Field({ nullable: true })
  shootDateTimezone?: string;
  @Field()
  worksheetStatusNo!: number;
  @Field()
  requestStatusNo!: number;
  @Field({ nullable: true })
  responseWorksheetStatusNo?: number;
  @Field({ nullable: true })
  worksheetCovidTestStatusNo?: number;
  @Field({ nullable: true })
  responseWorksheetCovidTestStatusNo?: number;
  @Field({ nullable: true })
  eventDescription?: string;
  @Field({ nullable: true })
  message?: string;
}

@ObjectType()
export class BookingRequest {
  @Field()
  folderElementInstanceId!: number;
  @Field()
  extrasWorksheetElementId!: number;
  @Field()
  extrasWorksheetRequestId!: number;
  @Field()
  extrasWorksheetId!: number;
  @Field()
  jobDateID!: number;
  @Field()
  extrasWorksheetRequestTypeNo!: number;
  @Field()
  extrasWorksheetRequestDescr!: string;
  @Field()
  updateWorksheetStatusNo!: number;
  @Field()
  updateIfRequestInd!: number;
  @Field()
  extrasWorksheetRequestDate!: string;
  @Field()
  extrasWorksheetRecipients!: number;
  @Field()
  extrasWorksheetRecipientsDone!: number;
  @Field()
  shootDate!: string;
  @Field({ nullable: true })
  shootDateTimezone?: string;
  @Field()
  worksheetStatusNo!: number;
  @Field()
  requestStatusNo!: number;
  @Field({ nullable: true })
  responseWorksheetStatusNo?: number;
  @Field({ nullable: true })
  message?: string;
}

@ObjectType()
export class GeneralNotice {
  @Field()
  extrasWorksheetRequestId!: number;
  @Field()
  extrasWorksheetRequestTypeNo!: number;
  @Field()
  extrasWorksheetRequestDescr!: string;
  @Field()
  extrasWorksheetElementId!: number;
  @Field()
  subject!: string;
  @Field()
  message!: string;
  @Field()
  sentOn!: string;
  @Field()
  sentByName!: string;
  @Field()
  sentByCompanyName!: string;
  @Field({ nullable: true })
  shootDate?: string;
  @Field()
  timezone!: string;
  @Field()
  elementName!: string;
  @Field({ nullable: true })
  elementId?: number;
  @Field()
  folderElementId!: number;
  @Field()
  folderId!: number;
  @Field()
  folderName!: string;
  @Field({ nullable: true })
  elementImage?: string;
  @Field()
  requestStatusNo!: number;
  @Field()
  delivered!: number;
  @Field({ nullable: true })
  deliveredDate?: string;
  @Field()
  opened!: number;
  @Field({ nullable: true })
  openedDate?: string;
  @Field({ nullable: true })
  responseText?: string;
  @Field({ nullable: true })
  responseSeenOn?: string;
  @Field({ nullable: true })
  responseSeenByUserId?: number;
  @Field({ nullable: true })
  respondedOn?: string;
}

@ObjectType()
export class CallTime {
  @Field()
  folderElementInstanceId!: number;
  @Field()
  extrasWorksheetElementId!: number;
  @Field({ nullable: true })
  googlePlaceID?: string;
  @Field()
  callTimeTypeNo!: number;
  @Field()
  calltimeSendInd!: number;
  @Field({ nullable: true })
  address?: string;
  @Field({ nullable: true })
  city?: string;
  @Field({ nullable: true })
  country?: string;
  @Field({ nullable: true })
  latitude?: string;
  @Field({ nullable: true })
  longitude?: string;
  @Field({ nullable: true })
  state?: string;
  @Field()
  eventDate!: string;
  @Field()
  eventDateTimezone!: string;
  @Field({ nullable: true })
  callTime?: string;
  @Field({ nullable: true })
  callTimeTo?: string;
  @Field({ nullable: true })
  checkinNumber?: number;

  @Field(() => [CallTimeItem],{nullable: true})
  items?: CallTimeItem[];
}

@ObjectType()
export class CallTimeItem {
  @Field()
  extrasWorksheetCallTimeItemId!: number;
  @Field()
  extrasWorksheetElementId!: number;
  @Field()
  extrasWorksheetID!: number;
  @Field()
  callTimeItemTypeNo!: number;
  @Field()
  callTimeTypeNo!: number;
  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  notes?: string;
  @Field({ nullable: true })
  googlePlaceID?: string;
  @Field()
  createdOn!: string;
  @Field()
  createdByUserId!: number;
  @Field()
  itemSentInd!: number;
  @Field()
  calltimeSendInd!: number;
  @Field({ nullable: true })
  fullName?: string;
  @Field({ nullable: true })
  address?: string;
  @Field({ nullable: true })
  city?: string;
  @Field({ nullable: true })
  country?: string;
  @Field({ nullable: true })
  latitude?: string;
  @Field({ nullable: true })
  longitude?: string;
  @Field({ nullable: true })
  state?: string;
  @Field({ nullable: true })
  attachmentList?: string;
  @Field({ nullable: true })
  folderList?: string;
  @Field()
  eventDate!: string;
  @Field({ nullable: true })
  eventDateTimezone?: string;
  @Field({ nullable: true })
  callTime?: string;
}

