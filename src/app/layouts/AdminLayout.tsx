"use client";
import Layout from "../components/Layout";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <main className="flex-1 p-6">{children}</main>
    </Layout>
  );
};

export default AdminLayout;
