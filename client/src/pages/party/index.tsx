import PartyCard from "./(components)/PartyCard";

const Party = () => {
  /**
   * TSX
   */
  return (
    <div className="w-[90%] mx-auto mt-6">
      <div className="flex justify-center items-center gap-4">
        <div className="text-white text-2xl">Party Overview</div>
        <div>
          <button className="bg-blue-400 text-white px-2 py-1 rounded-md shadow-md">
            &#x2b; Add New
          </button>
        </div>
      </div>
      <div className="mt-8">
        <PartyCard />
      </div>
    </div>
  );
};

export default Party;
