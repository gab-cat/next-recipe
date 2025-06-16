export default function RecipeDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation skeleton */}
      <div className="bg-gray-900/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="h-9 w-36 bg-gray-700/50 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section skeleton */}
          <div className="relative mb-8">
            <div className="relative h-[60vh] rounded-xl overflow-hidden bg-gray-800/50">
              {/* Image skeleton */}
              <div className="w-full h-full bg-gray-700/50 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
              
              {/* Floating elements skeleton */}
              <div className="absolute top-6 left-6">
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-gray-600/50 rounded animate-pulse"></div>
                  ))}
                </div>
                <div className="h-6 w-32 bg-gray-600/50 rounded animate-pulse"></div>
              </div>
              
              <div className="absolute top-6 right-6">
                <div className="w-14 h-14 bg-gray-600/50 rounded-2xl animate-pulse"></div>
              </div>

              {/* Main content skeleton */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="max-w-4xl">
                  {/* Title skeleton */}
                  <div className="mb-4">
                    <div className="h-16 bg-gray-700/50 rounded animate-pulse mb-2"></div>
                    <div className="h-16 bg-gray-700/50 rounded animate-pulse w-3/4"></div>
                  </div>
                  
                  {/* Description skeleton */}
                  <div className="mb-8">
                    <div className="h-6 bg-gray-700/50 rounded animate-pulse w-2/3"></div>
                  </div>
                  
                  {/* Stats skeleton */}
                  <div className="flex flex-wrap gap-4">
                    <div className="h-12 w-40 bg-gray-700/50 rounded-2xl animate-pulse"></div>
                    <div className="h-12 w-36 bg-gray-700/50 rounded-2xl animate-pulse"></div>
                    <div className="h-12 w-32 bg-gray-700/50 rounded-2xl animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid skeleton */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Ingredients skeleton */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700 p-6 sticky top-32">
                {/* Header skeleton */}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gray-600/50 rounded-2xl animate-pulse mr-3"></div>
                  <div className="h-8 w-32 bg-gray-700/50 rounded animate-pulse"></div>
                </div>

                {/* Ingredients list skeleton */}
                <div className="space-y-2">
                  {[...Array(8)].map((_, index) => (
                    <div key={index} className="flex items-center p-3 rounded-xl bg-gray-800/30 border border-gray-600">
                      <div className="w-5 h-5 rounded-full bg-gray-600/50 animate-pulse mr-3"></div>
                      <div className="h-4 bg-gray-700/50 rounded animate-pulse flex-1"></div>
                    </div>
                  ))}
                </div>

                {/* Progress section skeleton */}
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <div className="h-3 w-24 bg-gray-700/50 rounded animate-pulse mx-auto mb-3"></div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gray-600/50 h-2 rounded-full w-1/3 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions skeleton */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700 p-6">
                {/* Header skeleton */}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gray-600/50 rounded-2xl animate-pulse mr-3"></div>
                  <div className="h-8 w-36 bg-gray-700/50 rounded animate-pulse"></div>
                </div>

                {/* Instructions list skeleton */}
                <div className="space-y-4">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="flex items-start p-4 rounded-xl bg-gray-800/30 border border-gray-600">
                      <div className="w-12 h-12 rounded-xl bg-gray-600/50 animate-pulse mr-4"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-700/50 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-700/50 rounded animate-pulse w-4/5"></div>
                        {index % 2 === 0 && (
                          <div className="h-4 bg-gray-700/50 rounded animate-pulse w-3/5"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress section skeleton */}
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <div className="h-3 w-32 bg-gray-700/50 rounded animate-pulse mx-auto mb-3"></div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gray-600/50 h-2 rounded-full w-1/2 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 