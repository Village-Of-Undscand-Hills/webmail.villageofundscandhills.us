import type { LucideIcon } from 'lucide-react'

export interface Email {
  id: string;
  from: string;
  to: Array<string>;
  cc?: Array<string>;
  cco?: Array<string>;
  subject: string;
  date: string;
  body: string;
  read: boolean;
  folder: string;
  attachments?: Array<Attachment>;
}

export interface Attachment {
  id: string;
  name: string;
  type: 'pdf' | 'image';
  size: string;
  url: string;
}

export interface User {
  username: string;
  lastLogin: string;
  quotaUsed: number;
  quotaTotal: number;
  fullName: string;
  department: string;
  email: string;
  phoneExt: string;
}

export interface UserSession {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    email_verified: boolean;
  };
  identities: {
    identity_id: string;
    id: string;
    user_id: string;
    identity_data: {
      email: string;
      email_verified: boolean;
      phone_verified: boolean;
      sub: string;
    };
    provider: string;
    last_sign_in_at: string;
    created_at: string;
    updated_at: string;
    email: string;
  }[];
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}

export interface Session {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  user: UserSession;
}

export interface Folder {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
}