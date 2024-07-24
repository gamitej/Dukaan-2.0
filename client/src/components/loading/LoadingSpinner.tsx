import logo from "@/assests/images/loading.gif";

const LoadingSpinner = ({ text = "" }: { text: string }) => {
  const isText = text?.trim().length > 0;

  /**
   * TSX
   */
  return (
    <div
      className={`${
        !isText ? "w-[4rem]" : ""
      } h-fit bg-white rounded-md shadow-md text-mediumDark`}
    >
      {!isText ? <img src={logo} alt="" /> : text}
    </div>
  );
};

export default LoadingSpinner;
