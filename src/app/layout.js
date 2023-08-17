import "./globals.css";
import "./scss/event.scss"
import { Poppins } from "next/font/google";
import Provider from "@/components/provider/Provider";
import Navigation from "@/components/navigation/Navigation";

const outfit = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: {
    default: "Admin",
    template: "%s | Admin",
  },
  description: "An admin page for the saavan event heads and admins",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html>
        <body
          className={`${outfit.className} bg-primary text-primary-content min-h-screen`}>
          <Provider>
            <Navigation />
            {children}
          </Provider>
        </body>
      </html>
    </>
  );
}
