import { AiOutlineMenu, AiFillProduct } from "react-icons/ai";

const Header = () => {
  /**
   * TSX
   */
  return (
    <div className="w-full flex justify-between items-center h-[5rem] px-[50px]">
      {/* left  */}
      <div className="flex justify-center items-center gap-6">
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
