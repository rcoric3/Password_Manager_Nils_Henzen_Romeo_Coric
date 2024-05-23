import { Generated, Insertable, Selectable } from 'kysely';

export interface Database {
    users: Users;
    password_entries: PasswordEntry;
  }

export interface Users {
    id: Generated<number>;
    username: string;
    password: string;
    secret_key: string;
    created_at: Generated<Date>;
    updated_at: Generated<Date>;
  }


export interface PasswordEntry {
    id: Generated<number>;
    user_id: number;
    site: string;
    username: string;
    password: string; 
    created_at: Generated<Date>;
    updated_at: Generated<Date>;
  }
