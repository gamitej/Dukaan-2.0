import Party from "../party";
import Stocks from "../stocks";
import Summary from "../summary";

const Home = () => {
  return (
    <div className="">
      <Summary />
      <Party />
      <Stocks />
    </div>
  );
};

export default Home;
