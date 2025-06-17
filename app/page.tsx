import type { Metadata } from "next"
import HomePageClient from "@/components/home-page/home-page-client"

export const metadata: Metadata = {
  title: "RecipeHub - Premium Culinary Recipes & Cooking Guide",
  description: "Discover extraordinary flavors and create culinary masterpieces with our premium collection of chef-approved recipes. Search through thousands of recipes, filter by cooking time, and find your next favorite dish.",
  openGraph: {
    title: "RecipeHub - Premium Culinary Recipes & Cooking Guide",
    description: "Discover extraordinary flavors and create culinary masterpieces with our premium collection of chef-approved recipes.",
    url: "https://recipes.gab-cat.me",
    siteName: "RecipeHub",
    images: [
      {
        url: "/recipe-hub-og.png",
        width: 1200,
        height: 630,
        alt: "RecipeHub - Premium Recipe Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RecipeHub - Premium Culinary Recipes & Cooking Guide",
    description: "Discover extraordinary flavors and create culinary masterpieces with our premium collection of chef-approved recipes.",
    images: ["/recipe-hub-og.png"],
  },
}

export default function HomePage() {
  return <HomePageClient />
}
