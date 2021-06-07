import axios from 'axios';
import {API_BASE_URL} from '../config';
import {SignInCredentials} from '../types/sign-in-credentials';

export interface SignupRequestBody {
  name: string;
  emailAddress: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export async function signup(
  signupRequestBody: SignupRequestBody,
): Promise<AuthResponse> {
  const {data} = await axios.post<AuthResponse>(
    `${API_BASE_URL}/auth/signup`,
    signupRequestBody,
  );

  return data;
}

export async function refreshCredentials(
  refreshToken: string,
): Promise<{accessToken: string}> {
  const {data} = await axios.post<{accessToken: string}>(
    `${API_BASE_URL}/auth/refresh`,
    {refreshToken},
  );

  return data;
}

export async function signIn(
  credentials: SignInCredentials,
): Promise<AuthResponse> {
  const {data} = await axios.post<AuthResponse>(
    `${API_BASE_URL}/auth/signin`,
    credentials,
  );

  return data;
}
