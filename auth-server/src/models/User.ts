export interface PostMember {
  id: string;
  password: string;
  salt: string;
  name: string;
  role: number;
}

export interface GetMember {
  id: string;
  name: string;
  role: number;
}
