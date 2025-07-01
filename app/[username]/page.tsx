import { StickyNavbar } from '@/components/shared/sticky-navbar'
import { ProfilePage } from '@/src/features/users/components/profile-page'
import type { Metadata } from 'next'

interface ProfileRouteProps {
  params: Promise<{
    username: string
  }>
}

export async function generateMetadata({ params }: ProfileRouteProps): Promise<Metadata> {
  const { username } = await params
  const cleanUsername = decodeURIComponent(username).startsWith('@') ? decodeURIComponent(username).slice(1) : username
  
  return {
    title: `@${cleanUsername}`,
    description: `View ${cleanUsername}'s profile and recipes on Recipe Hub`,
  }
}

export default async function ProfileRoute({ params }: ProfileRouteProps) {
  const { username } = await params
  const cleanUsername = decodeURIComponent(username)
  
  // Remove the @ symbol if it's included in the username
  const validUsername = cleanUsername.startsWith('@') ? cleanUsername.slice(1) : cleanUsername

  return (
    <div className="min-h-screen bg-gray-900">
      <StickyNavbar isVisible={true} />
      <ProfilePage username={validUsername} />
    </div>
  )
} 