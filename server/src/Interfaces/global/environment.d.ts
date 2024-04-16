/* eslint-disable @typescript-eslint/naming-convention */

declare global {
  namespace Express {
    interface Request {
      user: Partial<IUsers>;
      // file?: File | undefined;
      file?: Multer.File | undefined;
      requestTime: string;
      rateLimit: { remaining: string };
    }
  }

  namespace NodeJS {
    interface ProcessEnv extends ProcessEnv {
      NODE_ENV: 'development' | 'production';
      CLIENT_URL: string;
      PORT: number;
      HOST: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      // JWT / Cookie
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      JWT_COOKIE_EXPIRES_IN: string;
      // Send emails with Mailtrap in development environment
      EMAIL_USERNAME: string;
      EMAIL_PASSWORD: string;
      EMAIL_HOST: string;
      EMAIL_PORT: number;
      // Send emails with Sendgrid in production environment
      EMAIL_FROM: string;
      SENDINBLUE_USERNAME: string;
      SENDINBLUE_SMTP_KEY: string;
      SENDINBLUE_HOST: string;
      SENDINBLUE_PORT: number;
    }
  }
}

export {};
