import type { Metadata } from "next"
import type React from "react"
import "@/styles/globals.css"
import ClientLayout from "@/components/shared/client-layout"

export const metadata: Metadata = {
  title: {
    default: "RecipeHub - Premium Culinary Recipes & Cooking Guide",
    template: "%s | RecipeHub"
  },
  description: "Discover extraordinary flavors and create culinary masterpieces with our premium collection of chef-approved recipes. Search through thousands of recipes, filter by cooking time, and find your next favorite dish.",
  keywords: [
    "recipes",
    "cooking",
    "food",
    "culinary",
    "chef",
    "ingredients",
    "cooking guide",
    "meal planning",
    "kitchen",
    "gourmet",
    "cuisine",
    "cooking tips",
    "food preparation",
    "recipe collection"
  ],
  authors: [{ name: "Gabriel Catimbang" }],
  creator: "Gabriel Catimbang",
  publisher: "RecipeHub",
  metadataBase: new URL("https://recipes.gab-cat.me"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://recipes.gab-cat.me",
    siteName: "RecipeHub",
    title: "RecipeHub - Premium Culinary Recipes & Cooking Guide",
    description: "Discover extraordinary flavors and create culinary masterpieces with our premium collection of chef-approved recipes.",
    images: [
      {
        url: "/recipe-hub-og.png",
        width: 1200,
        height: 630,
        alt: "RecipeHub - Premium Recipe Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RecipeHub - Premium Culinary Recipes & Cooking Guide",
    description: "Discover extraordinary flavors and create culinary masterpieces with our premium collection of chef-approved recipes.",
    images: ["/recipe-hub-og.png"],
    creator: "@recipehub",
    site: "@recipehub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "food",
  classification: "Food & Cooking",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  generator: "Next.js",
  applicationName: "RecipeHub",
  appleWebApp: {
    capable: true,
    title: "RecipeHub",
    statusBarStyle: "default",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  other: {
    "theme-color": "#1f2937",
    "color-scheme": "dark",
    "msapplication-TileColor": "#1f2937",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#1f2937" />
        <meta name="color-scheme" content="dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-gray-900 font-inter">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
