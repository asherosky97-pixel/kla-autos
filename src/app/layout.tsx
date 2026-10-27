import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KlaAutos Uganda | Carwow-Style Auto Marketplace & URA Car Tax Calculator',
  description: "Kampala's premier reverse-bidding automotive marketplace. Tell verified car bonds what you want, calculate exact URA import taxes, and swap your car with transparent cash top-ups.",
  keywords: [
    'Carwow Uganda',
    'URA Car Tax Calculator',
    'Uganda car bonds',
    'Nakawa car bond',
    'Pine car bond Kampala',
    'Reverse bidding cars Uganda',
    'Buy Japanese cars Uganda',
    'Toyota Harrier Uganda',
    'Subaru Forester Kampala',
    'Car swap top up Uganda',
    'Anti broker car marketplace'
  ],
  openGraph: {
    title: 'KlaAutos Uganda | Reverse-Bidding & Verified Auto Marketplace',
    description: 'Stop paying street broker markups in Kampala. Let vetted car bonds bid for your business with transparent landed pricing.',
    url: 'https://klaautos.ug',
    siteName: 'KlaAutos Uganda',
    locale: 'en_UG',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
