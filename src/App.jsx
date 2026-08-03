import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";
import { ReviewProvider } from "./context/ReviewContext.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import QuickAccessSidebar from "./components/layout/QuickAccessSidebar.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <OrderProvider>
              <ReviewProvider>
                <div className="min-h-screen flex bg-ivory font-body text-ink">
                  <ScrollToTop />
                  <QuickAccessSidebar />
                  <div className="flex-1 flex flex-col min-w-0">
                    <Navbar />
                    <main className="flex-1">
                      <AppRoutes />
                    </main>
                    <Footer />
                  </div>
                </div>
              </ReviewProvider>
            </OrderProvider>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
