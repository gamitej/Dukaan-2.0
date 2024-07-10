import Party from "../party";
import Stocks from "../stocks";
import Summary from "../summary";

const Home = () => {
  return (
    <div className="flex flex-col gap-12">
      <Summary />
      <Party />
      <Stocks />
    </div>
  );
};

export default Home;
