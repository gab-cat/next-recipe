import Link from "next/link"
import { ChefHat, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16 border-t border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-primary/20 border border-primary/30 rounded-xl flex items-center justify-center">
                  <ChefHat className="w-7 h-7 text-primary" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-base">+</span>
                </div>
              </div>
              <div>
                <span className="text-2xl font-black">
                  <span className="text-white">Recipe</span>
                  <span className="text-accent">Hub</span>
                </span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your ultimate destination for discovering extraordinary recipes and creating culinary masterpieces that
              bring people together.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-300 cursor-pointer">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-300 cursor-pointer">
                <Twitter className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center hover:bg-accent hover:text-black transition-colors duration-300 cursor-pointer">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-300 cursor-pointer">
                <Youtube className="w-5 h-5" />
              </div>
            </div>
          </div>
          {/* About the Author Section */}
          <div className="">
            <div className="max-w-2xl mx-auto text-left">
              <h3 className="text-2xl font-bold mb-4">About the <span className="text-accent">Author</span></h3>
              <p className="text-gray-400 mb-6">
                Created by <span className="text-white font-bold">Gabriel Catimbang</span>, a passionate developer and cooking enthusiast who loves sharing delicious recipes and culinary experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="https://github.com/gab-cat" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-gray-800 rounded-full border px-6 border-white/10 hover:border-white/50 hover:bg-gray-700 text-white py-2 transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                  </svg>
                  <span>GitHub</span>
                </Link>
                <Link 
                  href="https://linkedin.com/in/gabrielcatimbang" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-blue-600/20 hover:bg-blue-600/30 border border-white/10 hover:border-blue-600/50 text-white px-6 py-2 rounded-full transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM4.943 8.57c-.86 0-1.548-.69-1.548-1.54 0-.85.689-1.54 1.548-1.54.858 0 1.548.69 1.548 1.54 0 .85-.69 1.54-1.548 1.54zM6.277 18.339H3.61V9.75h2.667v8.589zM19.67 0H.33C.148 0 0 .148 0 .33v19.34c0 .182.148.33.33.33h19.34c.182 0 .33-.148.33-.33V.33C20 .148 19.852 0 19.67 0z"/>
                  </svg>
                  <span>LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">© 2025 RecipeHub. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-accent text-sm transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-accent text-sm transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-accent text-sm transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
