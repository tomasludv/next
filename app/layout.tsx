import '../styles/global.css';
import '@rainbow-me/rainbowkit/styles.css';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Providers } from './providers';
import Topbar from './topbar'
import Sidebar from './sidebar'

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className="h-full">
        <Providers>
          <div className="min-h-full">
            <Topbar />
            <header className="bg-white shadow">
              <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Properties</h1>
              </div>
            </header>
            <main>
              <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
            </main>
          </div>
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}

export default RootLayout;
