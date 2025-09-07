export interface Product {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  description: string;
  category: string;
  dimensions: string;
  medium: string;
  year: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
}