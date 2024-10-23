// External
import type { DefaultUser } from "next-auth";

// Internal
import type { Customer, Token } from "../services/login";
import { TOKEN_ERRORS } from "../enums";

// User, in the Session object, only has 3 props: name, email and image.
// So we augment "next-auth" interfaces to extends User definition with custom props..
// ..to access them later.

// This augmentation is necessary as we access User data with useSession hook..
// ..and it returns a Session object.
declare module "next-auth" {
  interface User extends DefaultUser, Customer {
    jwt: Token;
  }

  interface Session {
    user: User;
    access_token: string;
    refresh_token: string;
    expires_in: number;
    error?: TOKEN_ERRORS;
  }
}

// This augmentation is necessary as the user is contained in the token.
declare module "next-auth/jwt" {
  interface JWT extends DefaultUser, Customer {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    error?: TOKEN_ERRORS;
  }
}
