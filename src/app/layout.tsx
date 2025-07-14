import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ConditionalLayout from "./components/ConditionalLayout";
import Providers from "./components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "LogynPay - Digital Transformation for Payment Systems",
  description: "A complete payment solution with high-level security and a seamless user experience for your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet" />
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white antialiased`}
      >
        {/* Bubbles Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500 rounded-full opacity-20 filter blur-3xl bubble"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full opacity-20 filter blur-3xl bubble bubble-2"></div>
          <div className="absolute bottom-1/2 right-1/3 w-60 h-60 bg-green-400 rounded-full opacity-10 filter blur-2xl bubble bubble-3"></div>
        </div>

        <Providers>
          <ConditionalLayout>{children}</ConditionalLayout>
        </Providers>

        <Script src="https://unpkg.com/aos@2.3.1/dist/aos.js" strategy="beforeInteractive" />
        <Script id="aos-init">
          {`AOS.init({ duration: 800, once: true });`}
        </Script>
        <Script id="mobile-menu">
          {`
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenuButton) {
              mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
              document.addEventListener('click', (e) => {
                if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                  mobileMenu.classList.add('hidden');
                }
              });
            }
          `}
        </Script>
        <Script id="faq-script">
          {`
            document.querySelectorAll('.faq-question').forEach(button => {
              button.addEventListener('click', () => {
                const answerWrapper = button.nextElementSibling;
                const icon = button.querySelector('i');
                const isOpening = answerWrapper.style.maxHeight === '0px' || !answerWrapper.style.maxHeight;
                
                document.querySelectorAll('.faq-question').forEach(b => {
                  if (b !== button) {
                    b.nextElementSibling.style.maxHeight = '0px';
                    b.querySelector('i').classList.remove('rotate-180');
                  }
                });
            
                if(isOpening) {
                  answerWrapper.style.maxHeight = answerWrapper.scrollHeight + 'px';
                  icon.classList.add('rotate-180');
                } else {
                  answerWrapper.style.maxHeight = '0px';
                  icon.classList.remove('rotate-180');
                }
              });
            });
          `}
        </Script>
      </body>
    </html>
  );
}
