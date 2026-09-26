import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import RoomDetail from "./pages/RoomDetail";
import About from "./pages/About";
import BookNow from "./pages/BookNow";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CollectionManager from "./pages/admin/CollectionManager";
import SingletonEditor from "./pages/admin/SingletonEditor";
import { AuthProvider } from "./context/AuthContext";
import { ContentProvider } from "./context/ContentContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function SiteLayout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:slug" element={<RoomDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/book-now" element={<BookNow />} />
      </Routes>
      <Footer />
    </>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="content/hotelInfo" element={<SingletonEditor collectionKey="hotelInfo" />} />
        <Route path="content/:collectionKey" element={<CollectionManager />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <AuthProvider>
      <ContentProvider>
        <div className="min-h-screen bg-primary text-white">
          <ScrollToTop />
          {isAdmin ? <AdminRoutes /> : <SiteLayout />}
        </div>
      </ContentProvider>
    </AuthProvider>
  );
}
