import DashboardSidebar from "@/components/layout/dashboard/shared/Sidebar";
import AdminRoute from "@/components/layout/routes/AdminRoute";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminRoute>
        <DashboardSidebar>{children}</DashboardSidebar>
      </AdminRoute>
    </div>
  );
};

export default DashboardLayout;
