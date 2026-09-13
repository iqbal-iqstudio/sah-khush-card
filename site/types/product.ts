export type PieceType = "1-Piece" | "2-Piece" | "3-Piece";
export type Availability = "stock" | "preorder" | "stockout";
export type Badge = "Original" | "New Season" | "Trending" | "Low Stock" | "";

export interface ColorVariant {
  name: string;
  hex: string;
  image: string;
}

export interface FabricBreakdown {
  shirt: string;
  dupatta: string;
  trouser: string;
  aesthetic: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  fabric: string;
  pieceType: PieceType;
  price: number;
  compareAtPrice?: number;
  availability: Availability;
  stockSlots?: number;
  rating: number;
  sold: number;
  badge?: Badge;
  image: string;
  lifestyle: string;
  gallery: string[];
  colors: ColorVariant[];
  fabricBreakdown: FabricBreakdown;
  description: string;
  stitchingPrice: number;
}
