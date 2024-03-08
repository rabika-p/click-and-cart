import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./store/StoreProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const jakarta = Plus_Jakarta_Sans({ weight: "400", subsets: ["cyrillic-ext"] });

export const metadata = {
  title: "Click & Cart",
  description: "Ecommerce with Integrated Blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        <div className="flex h-screen">
          <ToastContainer />
          <StoreProvider>
            <div className="flex-grow">{children}</div>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
