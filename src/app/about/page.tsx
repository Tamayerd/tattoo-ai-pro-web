import { Metadata } from 'next';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'About - AI-Powered Tattoo Design Technology',
  description:
    'Learn about Tattoo Pro AI, the revolutionary platform using artificial intelligence to create unique, personalized tattoo designs.',
};

export default function About() {
  return (
    <main>
      <Navigation />
      <div className="pt-16">
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              About{' '}
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                Tattoo Pro AI
              </span>
            </h1>
            <div className="prose prose-lg mx-auto dark:prose-invert">
              <p className="text-xl leading-relaxed mb-6">
                We&apos;re revolutionizing the tattoo industry by combining the artistry of traditional tattooing with the power of artificial intelligence.
              </p>
              <p>
                Our mission is to democratize tattoo artistry by providing an AI-powered platform that generates unique, personalized designs in seconds. Whether you&apos;re a first-time tattoo enthusiast or a seasoned collector, our technology helps you explore endless creative possibilities.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}