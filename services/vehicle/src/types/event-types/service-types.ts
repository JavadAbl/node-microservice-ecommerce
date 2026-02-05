export type CreateService = { id: number; name: string; price: number };

export type UpdateService = { id: number; name?: string; price?: number };

export type Service = CreateService;
