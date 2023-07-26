import Provider from '@/components/Provider';
import Header from '@/components/Header';
import '@/styles/styles.scss';

export const metadata = {
  title: 'Finstagram',
  description: 'Fake Instagram built with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body className="flex h-full flex-col">
          <Provider>
            <Header />
            <main className="flex flex-col items-center justify-center grow">
              {children}
            </main>
          </Provider>
        </body>
   
    </html>
  )
}
