export type Product = {
  id: string
  name: string
  price: number
  imageUrl: string
}

// Temporary sample catalog; replace with real data/assets
export const products: Product[] = [
  {
    id: 'tee-navy',
    name: 'Signature Tee – Navy',
    price: 29,
    imageUrl: 'https://picsum.photos/id/51/640/480',
  },
  {
    id: 'hoodie-oat',
    name: 'Everyday Hoodie – Oat',
    price: 68,
    imageUrl: 'https://picsum.photos/id/58/640/480',
  },
  {
    id: 'cap-forest',
    name: 'Minimal Cap – Forest',
    price: 24,
    imageUrl: 'https://picsum.photos/id/64/640/480',
  },
  {
    id: 'wallet-espresso',
    name: 'Slim Wallet – Espresso',
    price: 42,
    imageUrl: 'https://picsum.photos/id/1062/640/480',
  },
]

