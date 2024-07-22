import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTradingPair } from "../../utils/Axios";

const TradingPairTable = ({ liquidity }) => {
  const navigate = useNavigate();
  const [volume24hr, setVolume24hr] = useState("");
  const [volume7hr, setVolume7hr] = useState("");

  const ActionBodyTemplate = () => {
    return (
      <div className="flex items-center py-0 space-x-2 md:space-x-4">
        <button
          onClick={() => navigate("/pool")}
          className="whitespace-nowrap bg-[#F4DBC7] text-[#CC6727] font-semibold hover:text-white p-1 md:p-2 rounded-lg"
        >
          Add Liquidity
        </button>
        <button
          onClick={() => navigate("/swap")}
          className="bg-[#C65711] text-white font-bold py-1 px-2 md:py-2 md:px-4 rounded"
        >
          Trade
        </button>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      // Function to format date as 'MMM DD YYYY'
      function formatDate(date) {
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month and pad with zero if needed
        const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with zero if needed
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
      }

      // Get current date
      const currentDate = new Date();
      const formattedCurrentDate = formatDate(currentDate);

      // Get date a day before
      const previousDayDate = new Date();
      previousDayDate.setDate(previousDayDate.getDate() - 1);
      const formattedPreviousDayDate = formatDate(previousDayDate);

      const data = await getTradingPair(
        formattedCurrentDate,
        formattedPreviousDayDate
      );
      setVolume24hr(data?.data?.volume24hr);
      setVolume7hr(data?.data?.volume7hr);
    };
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1000px]">
        <div className="flex flex-row text-black font-bold justify-between items-center bg-[#F3BB1B] rounded-t-xl p-4">
          <p className="w-[16%] text-left pl-2 md:pl-8">Name</p>
          <p className="w-[16%] text-center">Liquidity</p>
          <p className="w-[16%] text-center">Volume (24hr)</p>
          <p className="w-[16%] text-center">Volume (7hr)</p>
          <p className="w-[20%] text-center">Actions</p>
        </div>

        <div className="text-black bg-white font-medium rounded-b-xl flex flex-row justify-between items-center p-4 border-b-[1px]">
          <p className="w-[16%] pl-2 md:pl-8">POX/USDX</p>
          <p className="text-center w-[16%]">
            $ {liquidity}/$ {liquidity}
          </p>
          <p className="w-[16%] text-center">$ {volume24hr}</p>
          <p className="w-[16%] text-center">$ {volume7hr}</p>
          <div className="w-[20%] flex justify-end">
            <ActionBodyTemplate />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingPairTable;
