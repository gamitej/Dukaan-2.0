import ItemCard from "@/components/cards/ItemCard";

const data = [
  { name: "Party Name 1", value: "Rs 2300", label: "Pending Payment -" },
  { name: "Party Name 2", value: "Rs 2300", label: "Pending Payment -" },
  { name: "Party Name 3", value: "Rs 2300", label: "Pending Payment -" },
];

const PartyCard = () => {
  /**
   * TSX
   */
  return (
    <div>
      <ItemCard data={data} handleClick={() => console.log()} />
    </div>
  );
};

export default PartyCard;
