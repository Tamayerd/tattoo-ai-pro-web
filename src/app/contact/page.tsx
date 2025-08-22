import { Metadata } from 'next';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Contact - Get in Touch with Tattoo Pro AI Team',
  description:
    'Have questions about Tattoo Pro AI? Contact our team for support, partnerships, or general inquiries.',
};

export default function Contact() {
  return (
    <main>
      <Navigation />
      <div className="pt-16">
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Get in{' '}
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <div className="text-center">
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Have questions about Tattoo Pro AI? We&apos;d love to hear from you.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Email: hello@tattooai.com</p>
                <p className="text-gray-600 dark:text-gray-300">We&apos;ll get back to you within 24 hours!</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}