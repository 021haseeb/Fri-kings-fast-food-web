export type MenuCategory =
  | 'Burgers'
  | 'Pizzas'
  | 'Broast'
  | 'Rolls & Parathas'
  | 'Fries & Nuggets'
  | 'Sauces'
  | 'Drinks'

export type MenuItem = {
  id: string
  category: MenuCategory
  name: string
  description: string
  price: number
  image: string
  spicy?: boolean
  popular?: boolean
}

// NOTE: These are placeholder images; replace with real product shots any time.
export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'burger-king-crunch',
    category: 'Burgers',
    name: 'King Crunch Burger',
    description: 'Crispy fillet, molten cheese, smoky sauce, toasted bun.',
    price: 649,
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
    popular: true,
  },
  {
    id: 'burger-double-smash',
    category: 'Burgers',
    name: 'Double Smash Deluxe',
    description: 'Two smashed patties, caramelized onions, secret sauce.',
    price: 799,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    popular: true,
  },
  {
    id: 'pizza-pepper-fury',
    category: 'Pizzas',
    name: 'Pepper Fury Pizza',
    description: 'Pepperoni, chili flakes, stretchy mozzarella — max heat.',
    price: 1299,
    image:
      'https://images.unsplash.com/photo-1548365328-5c4b1ae0f6a1?auto=format&fit=crop&w=900&q=80',
    spicy: true,
  },
  {
    id: 'broast-golden',
    category: 'Broast',
    name: 'Golden Broast (2pc)',
    description: 'Crispy outside, juicy inside, signature FriKing spice.',
    price: 899,
    image:
      'https://images.unsplash.com/photo-1604908176997-125f25cc500f?auto=format&fit=crop&w=900&q=80',
    popular: true,
  },
  {
    id: 'roll-zinger',
    category: 'Rolls & Parathas',
    name: 'Zinger Roll',
    description: 'Crunchy zinger, fresh slaw, creamy mayo, soft wrap.',
    price: 399,
    image:
      'https://images.unsplash.com/photo-1598514982205-f7e581b5562c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'nuggets-9',
    category: 'Fries & Nuggets',
    name: 'Nuggets (9pc)',
    description: 'Golden nuggets with your choice of dip.',
    price: 349,
    image:
      'https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'sauce-garlic',
    category: 'Sauces',
    name: 'Garlic Mayo Dip',
    description: 'Creamy, punchy, addictive.',
    price: 99,
    image:
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'drink-mango',
    category: 'Drinks',
    name: 'Mango Chill',
    description: 'Icy mango drink to cool the heat.',
    price: 219,
    image:
      'https://images.unsplash.com/photo-1528823872057-9c018a7b1b7a?auto=format&fit=crop&w=900&q=80',
  },
]

export const MENU_CATEGORIES: MenuCategory[] = [
  'Burgers',
  'Pizzas',
  'Broast',
  'Rolls & Parathas',
  'Fries & Nuggets',
  'Sauces',
  'Drinks',
]
