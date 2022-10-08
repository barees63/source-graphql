import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class YouMeCoTalentOverview {
  @Field({ nullable: true })
  ProfileImage_Headshot?: string;
  @Field({ nullable: true })
  ProfileImage_Headshot_AgencyApproveStatus?: number;
  @Field({ nullable: true })
  ProfileImage_BodyShot?: string;
  @Field({ nullable: true })
  ProfileImage_BodyShot_AgencyApproveStatus?: number;
  @Field({ nullable: true })
  Availability?: string;
  @Field({ nullable: true })
  ProfileDetailsComplete?: number;
  @Field({ nullable: true })
  AbilityCount?: number;
  @Field({ nullable: true })
  ContactDetailsComplete?: number;
  @Field({ nullable: true })
  CreditCount?: number;
  @Field({ nullable: true })
  Supplier_Name?: string;
  @Field({ nullable: true })
  Supplier_Logo?: string;
}

@ObjectType()
export class YouMeCoTalent {
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
  @Field({ nullable: true })
  elementName?: string;
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: true })
  ymcO_SupplierID?: number;
  @Field({ nullable: true })
  supplierName?: string;
  @Field({ nullable: true })
  batchNo?: number;
  @Field({ nullable: true })
  lastInviteDate?: string;
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  dateCreated?: string;
  @Field({ nullable: true })
  ymcO_ElementTypeNo?: number;
  @Field({ nullable: true })
  syngency_ModelID?: number;
  @Field({ nullable: true })
  syngency_UserID?: number;
  @Field({ nullable: true })
  stripe_Customer?: string;
  @Field({ nullable: true })
  matchedElementsSupplierNameList?: string;

  @Field(() => YouMeCoTalentOverview, { nullable: true })
  overview?: YouMeCoTalentOverview;
}

@ObjectType()
export class YouMeCoNotification {
  @Field({ nullable: true })
  notificationID?: number;
  @Field({ nullable: true })
  ymcO_SupplierID?: number;
  @Field({ nullable: true })
  ymcO_ElementID?: number;
  @Field({ nullable: true })
  notificationTypeID?: number;
  @Field({ nullable: true })
  notificationTypeDescr?: string;
  @Field({ nullable: true })
  elementName?: string;
  @Field({ nullable: true })
  subject?: string;
  @Field({ nullable: true })
  message1?: string;
  @Field({ nullable: true })
  message2?: string;
  @Field({ nullable: true })
  message3?: string;
  @Field({ nullable: true })
  notificationResponseID?: number;
  @Field({ nullable: true })
  responseDescr?: string;
  @Field({ nullable: true })
  createdOn?: string;
  @Field({ nullable: true })
  deliveredOn?: string;
  @Field({ nullable: true })
  readOn?: string;
  @Field({ nullable: true })
  responseOn?: string;
  @Field({ nullable: true })
  responseText?: string;
  @Field({ nullable: true })
  responsePositiveInd?: number;
  @Field({ nullable: true })
  ymcO_LinkID?: number;
  @Field({ nullable: true })
  ymcO_LinkID2?: number;
}
