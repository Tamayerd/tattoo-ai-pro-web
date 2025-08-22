import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import GalleryGrid from '@/components/GalleryGrid';

export const metadata: Metadata = {
  title: 'Gallery - AI Generated Tattoo Designs',
  description:
    'Browse our collection of unique AI-generated tattoo designs. Get inspired by thousands of creative tattoo ideas created with artificial intelligence.',
  openGraph: {
    title: 'Gallery - AI Generated Tattoo Designs | Tattoo Pro AI',
    description:
      'Browse our collection of unique AI-generated tattoo designs. Get inspired by thousands of creative tattoo ideas.',
  },
};

export default function Gallery() {
  return (
    <main>
      <Navigation />
      <div className="pt-16">
        <GalleryGrid />
      </div>
    </main>
  );
}