export default function RecipeCardSkeleton() {
  return (
    <div className="bg-gray-800 backdrop-blur-xl rounded-xl border border-gray-700 overflow-hidden h-full">
      <div className="relative overflow-hidden">
        {/* Image skeleton */}
        <div className="w-full h-52 bg-gray-700/50 animate-pulse"></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-900/40 to-transparent"></div>

        {/* Time badge skeleton */}
        <div className="absolute top-4 right-4">
          <div className="h-6 w-20 bg-gray-600/50 rounded-full animate-pulse"></div>
        </div>

        {/* Chef hat icon skeleton */}
        <div className="absolute top-4 left-4">
          <div className="w-10 h-10 bg-gray-600/50 rounded-2xl animate-pulse"></div>
        </div>
      </div>

      <div className="p-6">
        {/* Title skeleton */}
        <div className="mb-4">
          <div className="h-6 bg-gray-700/50 rounded animate-pulse mb-2"></div>
          <div className="h-6 bg-gray-700/50 rounded animate-pulse w-3/4"></div>
        </div>

        {/* Servings and premium badge skeleton */}
        <div className="flex items-center justify-between mb-6">
          <div className="h-5 w-24 bg-gray-700/50 rounded animate-pulse"></div>
          <div className="h-6 w-20 bg-gray-600/50 rounded-full animate-pulse"></div>
        </div>

        <div className="space-y-4">
          {/* Key ingredients label skeleton */}
          <div className="h-4 w-32 bg-gray-700/50 rounded animate-pulse"></div>
          
          {/* Ingredient badges skeleton */}
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-20 bg-gray-600/50 rounded-full animate-pulse"></div>
            <div className="h-6 w-16 bg-gray-600/50 rounded-full animate-pulse"></div>
            <div className="h-6 w-24 bg-gray-600/50 rounded-full animate-pulse"></div>
            <div className="h-6 w-14 bg-gray-600/50 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Footer skeleton */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="h-4 w-16 bg-gray-700/50 rounded animate-pulse"></div>
            <div className="w-10 h-10 bg-gray-600/50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
} 