import Navbar from "@/components/header/navbar";
import Sidebar from "@/components/header/sidebar";
import Home from "@/pages/home";

function App() {
  return (
    <div>
      <Navbar />
      <div className="relative px-6 w-full flex gap-6">
        <div className="w-1/6 fixed left-4 top-[5rem]">
          <Sidebar />
        </div>
        <div className="w-5/6 ml-[17.5%]">
          <Home />
        </div>
      </div>
    </div>
  );
}

export default App;
