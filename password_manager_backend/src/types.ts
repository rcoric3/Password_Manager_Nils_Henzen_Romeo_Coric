import { Generated, Insertable, Selectable } from 'kysely';

export interface Database {
  users: Users;
  categories: Categories;
  credentials: Credentials;
}

export interface Users {
  user_id: Generated<number>;
  username: string;
  user_password: string;
  unique_key: string;
}

export interface Categories {
  category_id: Generated<number>;
  category_name: string;
  user_id: number;
}

export interface Credentials {
  credential_id: Generated<number>;
  site_url: string;
  username: string;
  user_password: string; 
  site_notes: string | null;
  user_email: string | null;
  category_id: number;
  user_id: number;
}

export type NewUser = Insertable<Users>;
export type User = Selectable<Users>;

export type NewCategory = Insertable<Categories>;
export type Category = Selectable<Categories>;

export type NewCredential = Insertable<Credentials>;
export type Credential = Selectable<Credentials>;

