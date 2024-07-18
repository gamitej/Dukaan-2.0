import { AiOutlineMenu, AiFillProduct } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  /**
   * TSX
   */
  return (
    <div className="w-full sticky top-0 bg-dark z-[10] flex justify-between items-center h-[5rem] px-[50px]">
      {/* left  */}
      <div
        className="flex justify-center items-center gap-6 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <AiOutlineMenu className="text-white text-2xl" />
        <h2 className="text-white text-2xl">DASHBOARD</h2>
      </div>
      {/* right  */}
      <div>
        <AiFillProduct className="text-white text-4xl" />
      </div>
    </div>
  );
};

export default Header;
