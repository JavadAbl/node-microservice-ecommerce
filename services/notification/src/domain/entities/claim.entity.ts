export type ClaimType = 'SERVICE' | 'CONTROLLER' | 'ACTION';

export interface Claim {
  id: string;
  name: string;
  description?: string;
  type: ClaimType;
  parentId?: string;
  children?: Claim[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateClaimInput {
  name: string;
  description?: string;
  type: ClaimType;
  parentId?: string;
}

export interface UpdateClaimInput {
  name?: string;
  description?: string;
  type?: ClaimType;
  parentId?: string;
}

export interface ClaimsTree {
  [serviceName: string]: {
    [controllerName: string]: string[];
  };
}