// ../types/auth.d.ts

export interface IAuth {
  access_token: string | null;
  expires_in: number | null;
  id_token: string | null;
  refresh_token: string | null;
  scope: string | null;
  token_type: string | null;
}
