export type Testimonial = {
  id: string
  name: string
  rating: number
  review: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ayesha K.',
    rating: 5,
    review:
      'FriKing is my go-to. The broast is unreal and the service is super fast.',
  },
  {
    id: 't2',
    name: 'Hamza R.',
    rating: 5,
    review: 'That King Crunch Burger? Straight up legendary. 10/10.',
  },
  {
    id: 't3',
    name: 'Sara M.',
    rating: 4,
    review:
      'Loved the pizza and dips. Everything felt premium — would order again.',
  },
]
