import { NavLink, useNavigate } from "react-router-dom";
import { PiShoppingCartFill } from "react-icons/pi";
import { LuLeafyGreen } from "react-icons/lu";
import { AiFillProduct } from "react-icons/ai";
// store
import { useGlobleStore } from "@/store/globalStore";

const Header = () => {
  const navigate = useNavigate();

  const { setIsModelOpen, setIsStockModelOpen } = useGlobleStore();

  /**
   * TSX
   */
  return (
    <div className="w-full sticky top-0 bg-lightDark shadow-md z-[10] flex justify-between items-center h-[5rem] px-[50px]">
      {/* left  */}
      <div
        className="flex justify-center items-center gap-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <LuLeafyGreen className="text-white text-2xl" />
        <h2 className="text-white text-2xl">DUKAAN</h2>
      </div>
      {/* right  */}
      <div className="flex justify-center items-center gap-4">
        <div className="flex justify-center items-center gap-4 text-white font-[550] text-xl">
          <NavLink
            to="/parties"
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "text-white"
            }
          >
            Party
          </NavLink>
          <NavLink
            to="/sales"
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "text-white"
            }
          >
            Sales
          </NavLink>
          <NavLink
            to="/purchases"
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "text-white"
            }
          >
            Purchases
          </NavLink>
          <NavLink
            to="/expenses"
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "text-white"
            }
          >
            Expenses
          </NavLink>
        </div>
        <PiShoppingCartFill
          onClick={setIsStockModelOpen}
          className="text-white text-3xl cursor-pointer"
        />

        <AiFillProduct
          onClick={setIsModelOpen}
          className="text-white text-3xl cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
