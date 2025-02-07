import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "./provider";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <Provider>
          <header>
            {" "}
            <Header />
          </header>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
