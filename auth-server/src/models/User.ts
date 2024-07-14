export interface PostMember {
  id: string;
  password: string;
  salt: string;
  name: string;
  email?: string | null;
  depart?: string | null;
  duty?: string | null;
  role: number;
}

export interface GetMember {
  id: string;
  name: string;
  email: string | null;
  depart: string | null;
  duty: string | null;
  role: number;
}