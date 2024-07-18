import { pageData } from "@/data/Home";
import { useNavigate } from "react-router-dom";
// import Party from "../party";
// import Stocks from "../stocks";
// import Summary from "../summary";

const Home = () => {
  const navigate = useNavigate();

  /**
   * TSX
   */
  return (
    <div className="flex gap-12 text-white mt-8">
      {pageData.map((item) => (
        <div
          key={item.label}
          onClick={() => navigate(item.link)}
          className="flex flex-col bg-mediumDark shadow-md px-4 py-6 gap-4 w-[20rem] rounded-sm hover:scale-[1.05] cursor-pointer ease-in-out duration-200"
        >
          <div className="text-blue-400 text-xl">{item.label}</div>
          <div>{item.desc}</div>
        </div>
      ))}

      {/* <Summary />
      <Party />
      <Stocks /> */}
    </div>
  );
};

export default Home;
