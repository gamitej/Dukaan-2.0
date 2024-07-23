import { useGlobleStore } from "@/store/globalStore";
import { AiOutlineMenu, AiFillProduct } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const { setIsModelOpen } = useGlobleStore();

  /**
   * TSX
   */
  return (
    <div className="w-full sticky top-0 bg-lightDark shadow-md z-[10] flex justify-between items-center h-[5rem] px-[50px]">
      {/* left  */}
      <div
        className="flex justify-center items-center gap-6 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <AiOutlineMenu className="text-white text-2xl" />
        <h2 className="text-white text-2xl">DUKAAN</h2>
      </div>
      {/* right  */}
      <div>
        <AiFillProduct
          onClick={setIsModelOpen}
          className="text-white text-4xl cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
