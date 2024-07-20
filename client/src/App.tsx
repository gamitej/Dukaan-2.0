import { Suspense } from "react";
// components
import Options from "@/components/options";
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

      <Options />
    </div>
  );
}

export default App;
