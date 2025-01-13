// ../types/entity.d.ts

export interface Book {
  id: string;
  name: string;
  type: number;
  publishDate: string;
  price: number;
  authorId: string;
  authorName: string;
  lastModificationTime: string | null;
  lastModifierId: string | null;
  creationTime: string;
  creatorId: string | null;
}

export interface User {
  id: string;
  userName: string;
  tenantId: string | null;
  name: string;
  surname: string | null;
  email: string;
  emailConfirmed: boolean;
  phoneNumber: string | null;
  isActive: true;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  lockoutEnd: string | null;
  concurrencyStamp: string;
  entityVersion: number;
  lastPasswordChangedTime: string | null;
  isDeleted: boolean;
  deletedId: string | null;
  deletionTime: string | null;
  lastModificationTime: string | null;
  lastModifierId: string | null;
  creationTime: string;
  creatorId: string | null;
  extraProperties: Record<string, unknown>;
}

export interface UserWithPermissions {
  id: string;
  userName: string;
  tenantId: string | null;
  name: string;
  surname: string | null;
  email: string;
  emailConfirmed: boolean;
  phoneNumber: string | null;
  isActive: true;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  lockoutEnd: string | null;
  concurrencyStamp: string;
  entityVersion: number;
  lastPasswordChangedTime: string | null;
  isDeleted: boolean;
  deletedId: string | null;
  deletionTime: string | null;
  lastModificationTime: string | null;
  lastModifierId: string | null;
  creationTime: string;
  creatorId: string | null;
  extraProperties: Record<string, unknown>;
  groups: Array<PermissionGroup>;
}

export interface PermissionGroup {
  name: string;
  displayName: string;
  displayNameKey: string;
  displayNameResource: string;
  permissions: Array<Permission>;
}

export interface Permission {
  name: string;
  displayName: string;
  parentName: string | null;
  isGranted: boolean;
  allowedProviders: Array<string>;
  grantedProviders: Array<string>;
}
