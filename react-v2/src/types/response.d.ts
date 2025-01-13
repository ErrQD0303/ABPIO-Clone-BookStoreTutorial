// ../types/response.d.ts

import { PermissionGroup } from "./entity";

export interface ResponseBody {
  totalCount: number;
  items: Array;
}

export interface GetPermissionResponseBody {
  entityDisplayName: string;
  groups: Array<PermissionGroup>;
}
