import { Suspense } from "react";
// components
import Home from "@/pages/home";
import Navbar from "@/components/header/navbar";
import Sidebar from "@/components/header/sidebar";
// routes
import Router from "./routes/Router";

function App() {
  /**
   * TSX
   */
  return (
    <div>
      <Navbar />

      {/* main */}
      <div className="relative px-6 w-full flex gap-6">
        <div className="w-1/6 fixed left-4 top-[5rem]">
          <Sidebar />
        </div>
        <div className="w-5/6 ml-[17.5%]">
          {/* routes */}
          <Suspense fallback={<div>loading</div>}>
            <Router />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
