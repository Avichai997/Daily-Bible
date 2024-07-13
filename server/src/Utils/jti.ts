import { jwtDecode } from 'jwt-decode';

export const isJwtValid = (jwt: string, email: string) => {
  return (jwtDecode(jwt) as any).email === email;
}