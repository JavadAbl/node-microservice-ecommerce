export interface Role {
  id: string;
  name: string;
  description?: string;
  claims: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRoleInput {
  name: string;
  description?: string;
  claims: string[];
}

export interface UpdateRoleInput {
  name?: string;
  description?: string;
  claims?: string[];
}