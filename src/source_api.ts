import axios from "axios";
import qs from "querystring";
import {
  Talent,
  TalentProfile,
  TalentSubmission,
} from "./talent/talent.schema";
import {
  AvailabilityRequest,
  BookingRequest,
  CallTime,
  CallTimeItem,
  GeneralNotice,
  InformationRequest,
  Job,
} from "./job/job.schema";
import {
  YouMeCoNotification,
  YouMeCoTalent,
  YouMeCoTalentOverview,
} from "./youmeco/youmeco_talent.schema";
import {
  Audition
} from "./audition/audition.schema";
import {
  AuditionTalent,
  AuditionTalentMedia,
} from "./audition-talent/audition-talent.schema";
import {
  AuditionRole,
} from "./audition-role/audition-role.schema";
import {
  StudioSettings
}  from "./studio-settings/studio-settings.schema";
import {
  SourceUser,
  SourceUserAuth
} from "./source-user/source-user.schema";
import {
  GenericMutationResult,
} from "./generic/generic.schema";

const baseUrl = "https://source-api.syngency.com";
const baseSourceApiV3Url = "https://api.youmeandco.com/v3";

class LoginResponse {
  success!: boolean;
  token?: string;
  error?: string;

  constructor(success: boolean, token?: string, error?: string) {
    this.success = success;
    this.token = token;
    this.error = error;
  }
}

class LoginSourceUserResponse {
  success!: boolean;
  token?: string;
  id?: number;
  errors?: string[];

  constructor(success: boolean, token?: string, errors?: string[], id?: number) {
    this.success = success;
    this.token = token;
    this.errors = errors;
    this.id = id;
  }
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const body = {
    grant_type: "password",
    username: email,
    password,
  };
  try {
    const response = await axios.post(`${baseUrl}/token`, qs.stringify(body), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      validateStatus: function () {
        return true;
      },
    });
    if (response.status === 200) {
      const token = response.data.access_token;
      console.log(token);
      return new LoginResponse(true, token);
    } else {
      const e = response.data.error_description;
      console.error(e);
      return new LoginResponse(false, e);
    }
  } catch (e) {
    console.error(e);
    return new LoginResponse(false, `${e}`);
  }
};


export const loginSourceUser = async (email: string, password: string): Promise<SourceUserAuth | null> => {
  const response = await axios.post(`${baseSourceApiV3Url}/authenticate`, {
    email,
    password,
  }, {
    validateStatus: function () {
      return true;
    },
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
  });
  console.log('email', email, 'password', password);
  if (response.status === 200) {
    const rsp = response.data as SourceUserAuth;
    if(rsp.errors && rsp.errors.length > 0) {
      rsp.success = false;
      //console.log("loginResponse", response)
    } else {
      rsp.success = true;
    }
    return rsp;
  }
  return null;
};

export const apiGetTalent = async (token: string): Promise<Talent[]> => {
  const response = await axios.get(`${baseUrl}/api/userelements`, {
    validateStatus: function () {
      return true;
    },
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
  return [];
};

// Source Studio endpoints
export const apiGetStudioSettings = async (token: string): Promise<StudioSettings | null> => {
  const response = await axios.get(`${baseSourceApiV3Url}/studio/v2/settings/`, {
    validateStatus: function () {
      return true;
    },
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  } else {
    console.log('apiGetStudioSettings error', response.status, response.statusText, response.data);
    if(response.status === 401){
      throw new Error("UNAUTHORIZED");
    }
  }
  return null;
};

export const apiUpdateStudioSettings = async (token: string, cropPhotoToPortrait: boolean): Promise<StudioSettings | null> => {
  const response = await axios.put(`${baseSourceApiV3Url}/studio/v2/settings`, {
    cropPhotoToPortrait,
  }, {
    validateStatus: function () {
      return true;
    },
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    const rsp = response.data as StudioSettings;
    if(rsp.errors && rsp.errors.length > 0) {
      rsp.success = false;
    } else {
      rsp.success = true;
    }
    return rsp;
  } else {
    console.log('apiUpdateStudioSettings error', response.status, response.statusText, response.data);
    if(response.status === 401){
      throw new Error("UNAUTHORIZED");
    }
  }
  return null;
};

export const apiGetAuditions = async (token: string, jobDateId: number, searchString: string): Promise<Audition[]> => {
  const response = await axios.get(`${baseSourceApiV3Url}/studio/v2/auditions/${jobDateId}?searchString=${searchString}`, {
    validateStatus: function () {
      return true;
    },
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    console.log('apiGetAuditions', response.data);
    return response.data;
  } else {
    console.log('apiGetAuditions error', response.status, response.statusText, response.data);
    if(response.status === 401){
      throw new Error("UNAUTHORIZED");
    }
  }
  return [];
};

export const apiGetAuditionRoles = async (token: string, jobDateId: number): Promise<AuditionRole[]> => {
  const response = await axios.get(`${baseSourceApiV3Url}/studio/v2/auditions/${jobDateId}/roles/`, {
    validateStatus: function () {
      return true;
    },
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  } else {
    console.log('apiGetAuditionRoles error', response.status, response.statusText, response.data);
    if(response.status === 401){
      throw new Error("UNAUTHORIZED");
    }
  }
  return [];
};

export const apiGetAuditionTalent = async (token: string, jobDateId: number, searchString: string, statuses: string, roles: string): Promise<AuditionTalent[]> => {
  const response = await axios.get(`${baseSourceApiV3Url}/studio/v2/auditions/${jobDateId}/talent/?searchString=${searchString ? searchString : ''}&statuses=${statuses ? statuses : ''}&roles=${roles ? roles : ''}`, {
    validateStatus: function () {
      return true;
    },
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  } else {
    console.log('apiGetAuditionTalent error', response.status, response.statusText, response.data);
    if(response.status === 401){
      throw new Error("UNAUTHORIZED");
    }
  }
  return [];
};

export const apiGetAuditionTalentMedia = async (token: string, jobDateId: number, jobBriefSupplierElementId: number): Promise<AuditionTalentMedia[]> => {
  const response = await axios.get(`${baseSourceApiV3Url}/studio/v2/auditions/${jobDateId}/talent/${jobBriefSupplierElementId}/media`, {
    validateStatus: function () {
      return true;
    },
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  } else {
    console.log('apiGetAuditionTalentMedia error', response.status, response.statusText, response.data);
    if(response.status === 401){
      throw new Error("UNAUTHORIZED");
    }
  }
  return [];
};

export const apiUpdateAuditionTalentSeen = async (token: string, jobDateId: number, jobBriefSupplierElementId: number, isSeen: boolean, seenTime: string): Promise<AuditionTalent | null> => {
  const response = await axios.put(`${baseSourceApiV3Url}/studio/v2/auditions/${jobDateId}/talent/${jobBriefSupplierElementId}/seen`, {
    isSeen,
    seenTime,
  }, {
    validateStatus: function () {
      return true;
    },
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    const rsp = response.data as AuditionTalent;
    if(rsp.errors && rsp.errors.length > 0) {
      rsp.success = false;
    } else {
      rsp.success = true;
      rsp.id = jobBriefSupplierElementId;
      rsp.castingSeen = isSeen;
    }
    return rsp;
  } else {
    console.log('apiUpdateAuditionTalentSeen error', response.status, response.statusText, response.data);
    if(response.status === 401){
      throw new Error("UNAUTHORIZED");
    }
  }
  return null;
};

export const apiUpdateAuditionTalentReady = async (token: string, jobDateId: number, jobBriefSupplierElementId: number, isReady: boolean): Promise<AuditionTalent | null> => {
  const response = await axios.put(`${baseSourceApiV3Url}/studio/v2/auditions/${jobDateId}/talent/${jobBriefSupplierElementId}/ready`, {
    isReady
  }, {
    validateStatus: function () {
      return true;
    },
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    const rsp = response.data as AuditionTalent;
    if(rsp.errors && rsp.errors.length > 0) {
      rsp.success = false;
    } else {
      rsp.success = true;
      rsp.id = jobBriefSupplierElementId;
      rsp.castingReady = isReady;
    }
    return rsp;
  } else {
    console.log('apiUpdateAuditionTalentReady error', response.status, response.statusText, response.data);
    if(response.status === 401){
      throw new Error("UNAUTHORIZED");
    }
  }
  return null;
};

export const apiUpdateAuditionTalentImageArchived = async (token: string, jobDateId: number, jobBriefSupplierElementId: number, folderElementImageInstanceId: number, isArchived: boolean): Promise<AuditionTalentMedia | null> => {
  const response = await axios.put(`${baseSourceApiV3Url}/studio/v2/auditions/${jobDateId}/talent/${jobBriefSupplierElementId}/media/images/${folderElementImageInstanceId}/archive`, {
    isArchived
  }, {
    validateStatus: function () {
      return true;
    },
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    const rsp = response.data as AuditionTalentMedia;
    if(rsp.errors && rsp.errors.length > 0) {
      rsp.success = false;
    } else {
      rsp.success = true;
      rsp.id = folderElementImageInstanceId;
      rsp.archived = isArchived;
    }
    return rsp;
  } else {
    console.log('apiUpdateAuditionTalentImageArchived error', response.status, response.statusText, response.data);
    if(response.status === 401){
      throw new Error("UNAUTHORIZED");
    }
  }
  return null;
};

export const apiUpdateAuditionTalentVideoArchived = async (token: string, jobDateId: number, jobBriefSupplierElementId: number, folderElementVideoInstanceId: number, isArchived: boolean): Promise<AuditionTalentMedia | null> => {
  const response = await axios.put(`${baseSourceApiV3Url}/studio/v2/auditions/${jobDateId}/talent/${jobBriefSupplierElementId}/media/videos/${folderElementVideoInstanceId}/archive`, {
    isArchived
  }, {
    validateStatus: function () {
      return true;
    },
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    const rsp = response.data as AuditionTalentMedia;
    if(rsp.errors && rsp.errors.length > 0) {
      rsp.success = false;
    } else {
      rsp.success = true;
      rsp.id = folderElementVideoInstanceId;
      rsp.archived = isArchived;
    }
    return rsp;
  } else {
    console.log('apiUpdateAuditionTalentVideoArchived error', response.status, response.statusText, response.data);
    if(response.status === 401){
      throw new Error("UNAUTHORIZED");
    }
  }
  return null;
};

export const apiUpdateAuditionTalentVideoStitchPending = async (token: string, elementId: number, elementVideoId: number, videos: string): Promise<GenericMutationResult | null> => {
  const response = await axios.put(`${baseSourceApiV3Url}/studio/v2/element/${elementId}/videos/${elementVideoId}/stitchpending`, {
    videos: videos ? videos : []
  }, {
    validateStatus: function () {
      return true;
    },
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    const rsp = response.data as GenericMutationResult;
    if(rsp.errors && rsp.errors.length > 0) {
      rsp.success = false;
    } else {
      rsp.success = true;
    }
    return rsp;
  } else {
    console.log('apiUpdateAuditionTalentVideoStitchPending error', response.status, response.statusText, response.data);
    if(response.status === 401){
      throw new Error("UNAUTHORIZED");
    }
  }
  return null;
};

export const apiUpdateAuditionTalentMediaRanks = async (token: string, jobDateId: number, jobBriefSupplierElementId: number, images: string, videos: string): Promise<GenericMutationResult | null> => {
  const response = await axios.put(`${baseSourceApiV3Url}/studio/v2/auditions/${jobDateId}/talent/${jobBriefSupplierElementId}/media/rank`, {
    images: images ? JSON.parse(images) : [],
    videos: videos ? JSON.parse(videos) : []
  }, {
    validateStatus: function () {
      return true;
    },
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    const rsp = response.data as GenericMutationResult;
    if(rsp.errors && rsp.errors.length > 0) {
      rsp.success = false;
    } else {
      rsp.success = true;
    }
    return rsp;
  } else {
    console.log('apiUpdateAuditionTalentMediaRanks error', response.status, response.statusText, response.data);
    if(response.status === 401){
      throw new Error("UNAUTHORIZED");
    }
  }
  return null;
};
// End: Source Studio endpoints

export const apiGetTalentProfiles = async (
  token: string
): Promise<TalentProfile[]> => {
  const response = await axios.get(`${baseUrl}/api/userelementprofiledetails`, {
    validateStatus: function () {
      return true;
    },
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  console.log(response.status);
  if (response.status === 200) {
    return response.data;
  }
  return [];
};
export const apiGetTalentSubmissions = async (
  token: string,
  talentId: number
): Promise<TalentSubmission[]> => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/talentportal/submissions/${talentId}?pagenumber=1`,
      {
        validateStatus: function () {
          return true;
        },
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data.recordset ?? [];
    }
  } catch (e) {
    console.error(e);
  }
  return [];
};

export const apiGetJob = async (
  token: string,
  talentId: number,
  jobId: number
): Promise<Job | null> => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/talentportal/roles/${jobId}/element/${talentId}`,
      {
        validateStatus: function () {
          return true;
        },
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data.recordset[0];
    }
  } catch (e) {
    console.error(e);
  }
  return null;
};

export const apiGetInformationRequests = async (
  token: string,
  folderElementInstanceId: number
): Promise<InformationRequest[]> => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/talentportal/submissions/${folderElementInstanceId}/inforequests`,
      {
        validateStatus: function () {
          return true;
        },
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data.recordset;
    }
  } catch (e) {
    console.error(e);
  }
  return [];
};

export const apiGetAvailabilityRequests = async (
  token: string,
  folderElementInstanceId: number
): Promise<AvailabilityRequest[]> => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/talentportal/submissions/${folderElementInstanceId}/availabilityrequests`,
      {
        validateStatus: function () {
          return true;
        },
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data.recordset;
    }
  } catch (e) {
    console.error(e);
  }
  return [];
};

export const apiGetBookingRequests = async (
  token: string,
  folderElementInstanceId: number
): Promise<BookingRequest[]> => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/talentportal/submissions/${folderElementInstanceId}/bookingrequests`,
      {
        validateStatus: function () {
          return true;
        },
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data.recordset;
    }
  } catch (e) {
    console.error(e);
  }
  return [];
};

export const apiGetGeneralNotices = async (
  token: string,
  folderElementInstanceId: number
): Promise<GeneralNotice[]> => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/talentportal/submissions/${folderElementInstanceId}/generalnotices/0`,
      {
        validateStatus: function () {
          return true;
        },
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data.recordset;
    }
  } catch (e) {
    console.error(e);
  }
  return [];
};

export const apiGetCallTimes = async (
  token: string,
  folderElementInstanceId: number
): Promise<CallTime[]> => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/talentportal/submissions/${folderElementInstanceId}/calltimes`,
      {
        validateStatus: function () {
          return true;
        },
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data.recordset;
    }
  } catch (e) {
    console.error(e);
  }
  return [];
};

export const apiGetCallTimeItems = async (
  token: string,
  folderElementInstanceId: number
): Promise<CallTimeItem[]> => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/talentportal/submissions/${folderElementInstanceId}/calltimeitems`,
      {
        validateStatus: function () {
          return true;
        },
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data.recordset;
    }
  } catch (e) {
    console.error(e);
  }
  return [];
};
export const apiGetYouMeCoNotifications = async (
  token: string,
  elementId: number,
  supplierId: number
): Promise<YouMeCoNotification[]> => {
  try {
    const response = await axios.get(
      `https://source-api.syngency.com/api/supplierelementnotifications?ymco_supplierId=${supplierId}&ymco_elementId=${elementId}`,
      {
        validateStatus: function () {
          return true;
        },
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      //console.log(JSON.stringify(response.data))
      return response.data;
    }
  } catch (e) {
    console.error(e);
  }
  return [];
};

export const apiGetYouMeCoTalentOverview = async (
  token: string,
  elementId: number
): Promise<YouMeCoTalentOverview | null> => {
  try {
    const response = await axios.get(
      `https://www.youmeandco.com/api/2/mobile/elements.asp?api-key=d459fdf9-5891-4561-b88a-a8567a3438ef&method=getprofileoverview&elementId=${elementId}`,
      {
        validateStatus: function () {
          return true;
        },
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      //console.log(JSON.stringify(response.data))
      return response.data;
    }
  } catch (e) {
    console.error(e);
  }
  return null;
};
export const apiGetYouMeCoTalents = async (
  token: string
): Promise<[YouMeCoTalent] | null> => {
  try {
    const response = await axios.get(
      `https://source-api.syngency.com/api/userelements`,
      {
        validateStatus: function () {
          return true;
        },
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.error(e);
  }
  return null;
};
