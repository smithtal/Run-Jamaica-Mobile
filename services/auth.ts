import axios from 'axios';

export interface SignupRequestBody {
  name: string;
  emailAddress: string;
  password: string;
}

export async function signup(
  signupRequestBody: SignupRequestBody,
): Promise<{accessToken: string}> {
  const {data} = await axios.post<{accessToken: string}>(
    'http://localhost:3000/auth/signup',
    signupRequestBody,
  );

  return data;
}
