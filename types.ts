export interface PrismicImage {
  alt?: string
  dimensions: { width: number; height: number }
  url: string
}

export type Diet = 'Vegan (v)' | 'No specific diet' | 'Vegetarian (g)'

export interface DrinksSection {
  slice_type: 'drinks_section'
  items: Array<{
    name?: string
    description?: string
    unit?: string
    price?: number
  }>
  primary: { title?: string }
}

export interface WinesSection {
  slice_type: 'wine_section'
  items: Array<{
    name?: string
    description?: string
    glass_price?: string
    bottle_price?: number
  }>
  primary: { title?: string }
}
