import { Generated, Insertable, Selectable } from 'kysely';

export interface Database {
  users: UsersTable;
  categories: CategoriesTable;
  credentials: CredentialsTable;
}

export interface UsersTable {
  user_id: Generated<number>;
  username: string;
  user_password: string;
  unique_key: string;
}

export interface CategoriesTable {
  category_id: Generated<number>;
  category_name: string;
  user_id: number;
}

export interface CredentialsTable {
  credential_id: Generated<number>;
  site_url: string;
  username: string;
  user_password: string; 
  site_notes: string | null;
  user_email: string | null;
  category_id: number;
  user_id: number;
}

export type NewUser = Insertable<UsersTable>;
export type Users = Selectable<UsersTable>;

export type NewCategory = Insertable<CategoriesTable>;
export type Categories = Selectable<CategoriesTable>;

export type NewCredential = Insertable<CredentialsTable>;
export type Credentials = Selectable<CredentialsTable>;

