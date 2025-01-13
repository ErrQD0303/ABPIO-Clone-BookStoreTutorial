// ../types/request.d.ts

export interface PermissionChangeRequest {
  permissions: Array<PermissionChangeDto>;
}

export interface PermissionChangeDto {
  name: string;
  isGranted: boolean;
}

export interface PermissionChanges {
  providerName: string;
  providerKey: string;
  permissions: Array<PermissionChangeDto>;
}
