import { groq } from 'next-sanity';

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`;

export const navigationQuery = groq`*[_type == "navigation"][0]{ label, items, primaryCta }`;

export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  title,
  slug,
  seoTitle,
  seoDescription,
  blocks
}`;

export const productCategoriesQuery = groq`*[_type == "productCategory"] | order(order asc){
  _id,
  name,
  label,
  thaiLabel,
  slug,
  description,
  order
}`;

export const productOptionsQuery = groq`*[_type == "productOption" && isActive == true] | order(order asc){
  _id,
  name,
  sku,
  category->{ name, label },
  tier,
  warrantyYears,
  headline,
  thaiDescription,
  badge,
  order
}`;

export const footerLegalQuery = groq`*[_type == "footerLegal"][0]`;
