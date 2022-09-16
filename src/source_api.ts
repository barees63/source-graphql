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
  Job
} from "./job/job.schema";

const baseUrl = "https://source-api.syngency.com";

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
  console.log(response.status);
  if (response.status === 200) {
    return response.data;
  }
  return [];
};

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
): Promise<Job|null> => {
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
  folderElementInstanceId: number,
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
  folderElementInstanceId: number,
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
  folderElementInstanceId: number,
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
  folderElementInstanceId: number,
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
  folderElementInstanceId: number,
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
  folderElementInstanceId: number,
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
