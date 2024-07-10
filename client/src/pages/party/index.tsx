import PartyCard from "./(components)/PartyCard";

const Party = () => {
  /**
   * TSX
   */
  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="text-white text-2xl">Party Overview</div>
        <div>
          <button className="bg-blue-400 text-white px-2 py-1 rounded-md shadow-md">
            Add New
          </button>
        </div>
      </div>
      <PartyCard />
    </div>
  );
};

export default Party;
