const PRODUCTS = [
  {
    id: "p1",
    name: "Blue Slim Jeans",
    price: 1200,
    salePrice: 999, // optional discount
    category: "Bottoms",
    tags: ["denim", "slim-fit", "casual"],
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    desc: "Comfortable slim-fit blue jeans made from stretch denim.",
    rating: 4.5, // out of 5
    stock: 15,
    sizes: ["S", "M", "L", "XL"],
    colors: ["blue", "dark blue"],
    reviews: [
      { user: "Alice", comment: "Great fit and quality!", rating: 5 },
      { user: "Bob", comment: "Comfortable but a bit long.", rating: 4 }
    ]
  },
  {
    id: "p2",
    name: "Casual Cotton T-Shirt",
    price: 500,
    category: "Tops",
    tags: ["cotton", "casual", "summer"],
    img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
    desc: "Soft cotton tee, everyday essential. Breathable and comfortable.",
    rating: 4.2,
    stock: 30,
    sizes: ["S", "M", "L", "XL"],
    colors: ["white", "black", "grey", "blue"],
    reviews: [
      { user: "Charlie", comment: "Nice material and fit.", rating: 4 },
      { user: "Dana", comment: "Good for summer wear.", rating: 4 }
    ]
  },
  {
    id: "p3",
    name: "Elegant Hoodie",
    price: 1800,
    salePrice: 1499,
    category: "Tops",
    tags: ["hoodie", "warm", "casual"],
    img: "/data/products/elegant hoodie.jpg", // ✅ Local image from public
    desc: "Soft, warm hoodie with a relaxed fit. Perfect for winter days.",
    rating: 4.8,
    stock: 10,
    sizes: ["M", "L", "XL"],
    colors: ["black", "grey", "navy"],
    reviews: [
      { user: "Eve", comment: "Super comfortable!", rating: 5 },
      { user: "Frank", comment: "Nice hoodie, good value.", rating: 4.5 }
    ]
  },
  {
    id: "p4",
    name: "Classic Sneakers",
    price: 2500,
    category: "Footwear",
    tags: ["sneakers", "casual", "comfortable"],
    img: "/data/products/Classic Sneakers.jpg", // ✅ Local image from public
    desc: "Lightweight and comfortable sneakers for everyday wear.",
    rating: 4.7,
    stock: 20,
    sizes: ["6", "7", "8", "9", "10"],
    colors: ["white", "black"],
    reviews: [
      { user: "Grace", comment: "Very comfortable for daily use.", rating: 5 },
      { user: "Hank", comment: "Good design and quality.", rating: 4.5 }
    ]
  },
  {
    id: "p5",
    name: "Formal Leather Belt",
    price: 800,
    category: "Accessories",
    tags: ["leather", "formal", "belt"],
    img: "/data/products/Formal Leather Belt.jpg", // ✅ Local image from public
    desc: "Premium leather belt to complete your formal attire.",
    rating: 4.6,
    stock: 25,
    colors: ["black", "brown"],
    reviews: [
      { user: "Ian", comment: "Elegant and durable.", rating: 5 },
      { user: "Jane", comment: "Good quality for price.", rating: 4 }
    ]
  }
];

export default PRODUCTS;
