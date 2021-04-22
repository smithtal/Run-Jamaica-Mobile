import axios from 'axios';

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
    'http://localhost:3000/auth/signup',
    signupRequestBody,
  );

  return data;
}
