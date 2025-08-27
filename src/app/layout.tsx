import type { Metadata } from 'next';
import { Inter, Playfair_Display, Space_Grotesk, Bebas_Neue } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  variable: '--font-bebas',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'TattooAI - AI-Powered Tattoo Design Generator',
    template: '%s | TattooAI',
  },
  description:
    'Create unique, personalized tattoo designs using advanced AI technology. Generate custom tattoo art in seconds with our intelligent design tool.',
  keywords: [
    'tattoo',
    'AI',
    'artificial intelligence',
    'design',
    'generator',
    'custom',
    'art',
    'body art',
    'ink',
    'tattoo ideas',
  ],
  authors: [{ name: 'TattooAI Team' }],
  creator: 'TattooAI',
  publisher: 'TattooAI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tattooai.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tattooai.com',
    siteName: 'TattooAI',
    title: 'TattooAI - AI-Powered Tattoo Design Generator',
    description:
      'Create unique, personalized tattoo designs using advanced AI technology. Generate custom tattoo art in seconds.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TattooAI - AI Tattoo Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TattooAI - AI-Powered Tattoo Design Generator',
    description:
      'Create unique, personalized tattoo designs using advanced AI technology.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable} ${bebasNeue.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
