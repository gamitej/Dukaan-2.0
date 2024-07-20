import { Suspense } from "react";
// components
import Filters from "@/components/filters";
import Navbar from "@/components/header/navbar";
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
      <div className="px-6 w-full flex gap-6">
        {/* routes */}
        <Suspense fallback={<div>loading</div>}>
          <Router />
        </Suspense>
      </div>

      <Filters />
    </div>
  );
}

export default App;
