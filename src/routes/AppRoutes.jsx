import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Route-level code splitting: each page loads on demand instead of
// bundling all ~25 pages (incl. recharts/jsPDF-heavy admin & receipt
// pages) into a single initial chunk.
const Home = lazy(() => import("../pages/customer/Home.jsx"));
const CategoryListing = lazy(() => import("../pages/customer/CategoryListing.jsx"));
const ProductDetail = lazy(() => import("../pages/customer/ProductDetail.jsx"));
const SearchResults = lazy(() => import("../pages/customer/SearchResults.jsx"));
const Cart = lazy(() => import("../pages/customer/Cart.jsx"));
const Wishlist = lazy(() => import("../pages/customer/Wishlist.jsx"));
const Checkout = lazy(() => import("../pages/customer/Checkout.jsx"));
const OrderConfirmation = lazy(() => import("../pages/customer/OrderConfirmation.jsx"));
const OrderHistory = lazy(() => import("../pages/customer/OrderHistory.jsx"));
const OrderTracking = lazy(() => import("../pages/customer/OrderTracking.jsx"));
const Receipt = lazy(() => import("../pages/customer/Receipt.jsx"));
const Profile = lazy(() => import("../pages/customer/Profile.jsx"));
const Login = lazy(() => import("../pages/customer/Login.jsx"));
const Register = lazy(() => import("../pages/customer/Register.jsx"));
const NotFound = lazy(() => import("../pages/customer/NotFound.jsx"));

const BrandStorefront = lazy(() => import("../pages/brand/BrandStorefront.jsx"));
const BrandDirectory = lazy(() => import("../pages/brand/BrandDirectory.jsx"));
const BrandInsights = lazy(() => import("../pages/brand/BrandInsights.jsx"));

const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard.jsx"));
const AdminProducts = lazy(() => import("../pages/admin/AdminProducts.jsx"));
const AdminInventory = lazy(() => import("../pages/admin/AdminInventory.jsx"));
const AdminOrders = lazy(() => import("../pages/admin/AdminOrders.jsx"));
const AdminCustomers = lazy(() => import("../pages/admin/AdminCustomers.jsx"));
const AdminAnalytics = lazy(() => import("../pages/admin/AdminAnalytics.jsx"));

function RouteLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-4 border-amethyst/20 border-t-amethyst animate-spin" />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        {/* Customer */}
        <Route path="/" element={<Home />} />
        <Route path="/category/:categorySlug" element={<CategoryListing />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/orders/:orderId/track" element={<OrderTracking />} />
        <Route path="/orders/:orderId/receipt" element={<Receipt />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Brands (view-only demo accounts) */}
        <Route path="/brands" element={<BrandDirectory />} />
        <Route path="/brand/:brandSlug" element={<BrandStorefront />} />
        <Route path="/brand/:brandSlug/insights" element={<BrandInsights />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/inventory" element={<AdminInventory />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
