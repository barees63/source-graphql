import axios from "axios";
import qs from "querystring";
import { Talent, TalentProfile } from "./talent/talent.schema";

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

export const getTalent = async (token: string): Promise<Talent[]> => {
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

export const getTalentProfiles = async (
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
export const getTalentSubmissions = async (
  token: string,
  talentId: number
): Promise<TalentProfile[]> => {
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
      return response.data.recordset??[];
    }
  } catch (e) {
    console.error(e);
  }
  return [];
};
