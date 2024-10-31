export interface FloorPlan {
  id: string;
  name: string;
  price: number;
  dimensions: {
    [key: string]: number;
  };
  image?: string;
}

export interface InteriorOption {
  id: string;
  name: string;
  color: string;
  price: number;
  image?: string;
}

export interface ExteriorOption {
  id: string;
  name: string;
  color: string;
  price: number;
  image?: string;
}

export interface Upgrade {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
}

export interface Configuration {
  floorPlan: string;
  kitchen: string;
  floor: string;
  facade: string;
  upgrades: string[];
  basePrice: number;
}