import '../styles/global.css';
import '@rainbow-me/rainbowkit/styles.css';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Providers } from './providers';
import Sidebar from './sidebar'
import Topbar from './topbar'

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Sidebar />
          <div className="lg:pl-72">
            <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
              <Topbar />
            </div>
            <main className="py-10">
              <div className="px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}

export default RootLayout;
