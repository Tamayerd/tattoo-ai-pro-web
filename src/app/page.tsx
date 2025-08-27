import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import TattooGallery from '@/components/TattooGallery';
import AsymmetricVideoGrid from '@/components/AsymmetricVideoGrid';
import Gallery from '@/components/Gallery';
import Pricing from '@/components/Pricing';

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <TattooGallery />
      <AsymmetricVideoGrid />
      <Gallery />
      <Pricing />
    </main>
  );
}
