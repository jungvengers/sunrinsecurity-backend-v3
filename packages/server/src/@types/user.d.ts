// Todo
// 1. Extend User type with custom fields
declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface User extends ExtendUser {}
  }
}

export interface ExtendUser {
  googleId: string;
  email: string;
  username: string;
  department: string;
  grade: number;
  class: number;
  number: number;
}
