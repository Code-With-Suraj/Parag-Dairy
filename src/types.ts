export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number; // estimated average price
  unit: string;  // e.g., "1 Litre", "500g"
  imageUrl: string;
  popular: boolean;
  benefits: string[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  avatarLetter: string;
}

export interface InquiryItem {
  productId: string;
  quantity: number;
}
