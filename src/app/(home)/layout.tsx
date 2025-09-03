import Footer from "@/components/layout/Home/Shared/Footer/Footer";
import Navbar from "@/components/layout/Home/Shared/Navbar/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-ink-black">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
