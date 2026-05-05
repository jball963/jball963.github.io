import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Joseph Ball — Full-Stack Software Developer",
  description:
    "Joseph Ball — full-stack software developer in Altoona, PA. Builds and owns production Node.js and C#/.NET applications end-to-end.",
  authors: [{ name: "Joseph Ball" }],
  openGraph: {
    title: "Joseph Ball — Full-Stack Software Developer",
    description:
      "Full-stack developer with hands-on experience building and owning production systems end-to-end.",
    url: "https://jball963.github.io/",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Joseph Ball — Full-Stack Software Developer",
    description:
      "Full-stack developer with hands-on experience building and owning production systems end-to-end.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
