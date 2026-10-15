import type { Metadata } from "next";
import { AtelierProvider } from "@/components/atelier-provider";
import { Booking } from "@/components/booking";
import "./globals.css";
export const metadata: Metadata = {
  title: "SIHEM — L’Atelier des Mariées | Concept Kairo Dev",
  description:
    "Composez votre expérience de mariée. Concept de démonstration non officiel pour Sihem Beauty Center, Regueb, Tunisie.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <AtelierProvider>
          <a className="skip-link" href="#contenu">
            Aller au contenu
          </a>
          {children}
          <Booking />
        </AtelierProvider>
      </body>
    </html>
  );
}
