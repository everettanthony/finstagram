'use client';
import { RecoilRoot } from 'recoil';
import Header from '@/components/Header';
import Provider from '@/context/Provider';
import ToasterContext from '@/context/ToasterContext';
import '@/styles/styles.scss';


export const metadata = {
  title: 'Finstagram',
  description: 'Fake Instagram built with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Finstagram</title>
        <meta name="description" content="Fake Instagram" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="h-full">
        <Provider>
          <RecoilRoot>
            <Header />
            <ToasterContext />
            <main className="flex flex-col items-center justify-center grow">
              {children}
            </main>
          </RecoilRoot>
        </Provider>
      </body>
    </html>
  )
}
