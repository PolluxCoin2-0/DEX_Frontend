import { useNavigate } from "react-router-dom";

const HotTokensTable = ({ liquidityPOX, liquidityUSDX, volumePOX, volumeUSDX, poxPrice }) => {
  const navigate = useNavigate();

  const ActionBodyTemplate = () => {
    return (
      <div className="flex items-center py-0 space-x-4">
        <button
          onClick={() => navigate("/pool")}
          className="whitespace-nowrap bg-[#F4DBC7] text-[#CC6727] font-semibold hover:text-white p-2 rounded-lg"
        >
          Add Liquidity
        </button>
        <button
          onClick={() => navigate("/swap")}
          className="bg-[#C65711] text-white font-bold py-2 px-4 rounded"
        >
          Trade
        </button>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1000px]">
        <div className="flex flex-row text-black font-bold justify-between items-center bg-[#F3BB1B] rounded-t-xl p-4">
          <p className="w-[16%] text-left pl-2 md:pl-8">Name</p>
          <p className="w-[16%] text-center">Liquidity</p>
          <p className="w-[16%] text-center">Volume</p>
          <p className="w-[16%] text-center">Volume (24hr)</p>
          <p className="w-[16%] text-center">Price</p>
          <p className="w-[20%] text-center">Actions</p>
        </div>

        <div className="text-black bg-white font-medium flex flex-row justify-between items-center p-4 border-b-[1px]">
          <p className="w-[16%] pl-2 md:pl-8">POX</p>
          <p className="text-center w-[16%]">$ {liquidityPOX}</p>
          <p className="w-[16%] text-center">${volumePOX}</p>
          <p className="w-[16%] text-center">00</p>
          <p className="w-[16%] text-center">$ {poxPrice}</p>
          <div className="w-[20%] flex justify-end">
            <ActionBodyTemplate />
          </div>
        </div>

        <div className="text-black bg-white font-medium rounded-b-xl flex flex-row justify-between items-center p-4 border-b-[1px]">
          <p className="w-[16%] pl-2 md:pl-8">USDX</p>
          <p className="text-center w-[16%]">$ {liquidityUSDX}</p>
          <p className="w-[16%] text-center">${volumeUSDX}</p>
          <p className="w-[16%] text-center">00</p>
          <p className="w-[16%] text-center">$ 1</p>
          <div className="w-[20%] flex justify-end">
            <ActionBodyTemplate />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotTokensTable;
