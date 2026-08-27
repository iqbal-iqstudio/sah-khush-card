export type Brand = "Charizma" | "Bin Hameed" | "Firdous";
export type Fabric = "Lawn" | "Chiffon" | "Organza" | "Silk";
export type PieceType = "1-Piece" | "2-Piece" | "3-Piece";
export type Availability = "stock" | "preorder";

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
  brand: Brand;
  fabric: Fabric;
  pieceType: PieceType;
  price: number;
  compareAtPrice?: number;
  availability: Availability;
  stockSlots?: number;
  rating: number;
  sold: number;
  badge?: "Original" | "New Season" | "Trending" | "Low Stock";
  image: string;
  lifestyle: string;
  gallery: string[];
  colors: ColorVariant[];
  fabricBreakdown: FabricBreakdown;
  description: string;
  stitchingPrice: number;
}
