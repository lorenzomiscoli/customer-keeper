export interface User {
  username: string;
  password: string;
}

export interface UserProfile {
  username: string;
  name: string;
  lastname: string;
  email: string;
}

export interface UserUpdate {
  name: string;
  lastname: string;
  email: string;
}
