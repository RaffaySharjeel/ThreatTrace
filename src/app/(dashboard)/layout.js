
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-shell">
      <Sidebar />

      <main className="main-area">
        <Header />

        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
}
