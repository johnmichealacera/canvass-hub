import { User, Role, Product, ProductStatus, CanvassRequest, CanvassStatus, CanvassItem } from "@prisma/client";

export type { User, Role, Product, ProductStatus, CanvassRequest, CanvassStatus, CanvassItem };

export interface ProductWithItems extends Product {
  canvassItems: CanvassItem[];
}

export interface CanvassRequestWithItems extends CanvassRequest {
  canvassItems: (CanvassItem & {
    product: Product;
  })[];
  user: User;
}

export interface CanvassItemWithProduct extends CanvassItem {
  product: Product;
}

export interface CreateCanvassRequest {
  items: {
    productId: string;
    quantity: number;
  }[];
  notes?: string;
}

export interface ProductFilters {
  category?: string;
  status?: ProductStatus;
  search?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
