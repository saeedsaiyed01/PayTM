
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";


export const Layout = ({ children }) => {


    return (
      <div className="flex min-h-screen bg-gray-50/50">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 ml-64">
          <Navbar />
          {children}
        </main>
      </div>
    );
  };