import { jwtDecode } from 'jwt-decode';

interface IDecodedJwt {
  email: string;
  [key: string]: unknown;
}

const isJwtValid = (jwt: string, email: string): boolean => {
  const decoded = jwtDecode<IDecodedJwt>(jwt);

  return decoded.email === email;
};

export default isJwtValid;
