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

export interface HomeData {
  opening_hours?: Array<{ day: string }>
  phone?: string
  instagram_handle?: string
  header_image: PrismicImage & {
    Narrow: PrismicImage
    Medium: PrismicImage
    Small: PrismicImage
    Share: PrismicImage
  }
  city?: string
  address?: string
  country?: string
  text?: string
  content_image_top_left: PrismicImage & {
    Small: PrismicImage
  }
  content_image_right: PrismicImage & {
    Small: PrismicImage
  }
  content_image_bottom: PrismicImage & {
    Small: PrismicImage
  }
  footer_text?: string
  title?: string
  description?: string

  menu_title?: string
  burgers_title?: string
  burgers: Array<{
    name?: string
    description?: string
    price?: number
    diet: Diet
  }>
  burgers_extra_info_first?: string
  burgers_extra_info_second?: string
  sides_title?: string
  sides: Array<{
    name?: string
    description?: string
    price?: number
    diet: Diet
  }>
  dips_title?: string
  dips: Array<{ name?: string }>
  dips_price?: number
  grill_title?: string
  grill_subtitle?: string
  grill: Array<{
    name?: string
    description?: string
    price?: number
    diet: Diet
  }>
  drinks_title?: string
  body: Array<DrinksSection | WinesSection>
  lunch_offer?: PrismicImage
  reservation_title?: string
  reservation_body?: unknown
}
