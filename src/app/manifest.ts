import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Toraka - Your Entertainment Hub',
    short_name: 'Toraka',
    description: 'Discover, bookmark, and browse your favorite series and entertainment content with Toraka.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0F1C',
    theme_color: '#1665F4',
    orientation: 'portrait',
    categories: ['entertainment', 'lifestyle'],
    icons: [
      {
        src: '/assets/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  }
}
