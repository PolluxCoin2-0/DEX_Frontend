import AreaChartComp from "../../components/AreaChartComp";
import Search from "../../components/Search";
import PolicyOptions from "../../components/PolicyOptions";
import SwitchComp from "../../components/SwitchComp";
import { useEffect, useState } from "react";
import {
  getPairLength,
  getReserves,
  getScanLiquidityGraphData,
  getScanVolumeGraphData,
  getTotalTransactionsLast24Hours,
} from "../../utils/Axios";
import { formatNumberWithCommas } from "../../utils/formatNumberWithCommas";
import HotTokensTable from "./HotTokensTable";
import TradingPairTable from "./TradingPairTable";
import Transactions from "./Transactions";

const Scan = () => {
  const [data, setData] = useState({});
  const [pairLength, setPairLength] = useState(0);
  const [scanLiquidityGraphDataArray, setScanLiquidityGraphDataArray] =
    useState([]);
  const [scanVolumeGraphDataArray, setScanVolumeGraphDataArray] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState("daily");
  const [totalTransactionsLast24Hours, setTotalTransactionsLast24Hours] =
    useState("");

  useEffect(() => {
    const fetchdata = async () => {
      const data = await getReserves();
      const pairLength = await getPairLength();
      setPairLength(pairLength?.data);
      setData(data?.data);

      // Function to format date as 'MMM DD YYYY'
      function formatDate(date) {
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month and pad with zero if needed
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
      }

      // Get current date
      const currentDate = new Date();
      const formattedCurrentDate = formatDate(currentDate);

      // Get date a month before
      const previousMonthDate = new Date();
      previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
      const formattedPreviousMonthDate = formatDate(previousMonthDate);

      // Function for liquidity graph data
      const liquidityGraphData = await getScanLiquidityGraphData(
        formattedCurrentDate,
        formattedPreviousMonthDate
      );
      console.log(liquidityGraphData);
      setScanLiquidityGraphDataArray(liquidityGraphData);

      // Function for volume graph data
      const volumeGraphData = await getScanVolumeGraphData(
        formattedPreviousMonthDate,
        formattedCurrentDate,
        selectedInterval
      );
      console.log(volumeGraphData);
      setScanVolumeGraphDataArray(volumeGraphData);

      // Function for total transactions last 24 hours data
      const totalTransactionsLast24HoursData =
        await getTotalTransactionsLast24Hours();
      console.log(totalTransactionsLast24HoursData);
    };
    fetchdata();
  }, [selectedInterval]);

  return (
    <div className="px-4 sm:px-8 md:px-12 py-6">
      <Search />
      <div
        className="pl-4 pb-4 flex flex-col sm:flex-row flex-wrap items-start 
      sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-white"
      >
        <p className="text-lg md:text-xl font-bold">
          POX Price:{" "}
          <span className="text-green-500">
            ${data?.pricePOX && Number(data?.pricePOX).toFixed(6)}
          </span>
        </p>
        <p className="font-medium">
          Pairs:{" "}
          <span className="text-green-500">{pairLength && pairLength}</span>
        </p>
        <p className="font-medium">
          Transactions (24hr): <span className="text-green-500">2,464</span>
        </p>
        <p className="font-medium">
          New Pairs (24hr): <span className="text-green-500">0</span>
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="bg-white rounded-3xl px-2 md:px-6 lg:px-6 py-4 md:py-6 lg:py-6 w-full lg:w-1/2">
          <p className="pl-4 pb-3">Liquidity</p>
          <div className="flex items-center space-x-4">
            <p className="text-lg font-medium pl-4">
              ${" "}
              {data?.reserve1 && data?.pricePOX &&
  formatNumberWithCommas((Number(data.reserve1) * data.pricePOX).toFixed(6))
}

            </p>
            <p className="text-green-500">+0.52%</p>
          </div>
          <AreaChartComp value={""} />
        </div>
        <div className="bg-white rounded-3xl px-6 py-6 w-full lg:w-1/2">
          <p className="pl-4">Volume</p>
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2 pl-4">
              <p className="text-lg font-medium">$161,187,730</p>
              <p className="text-green-500">+0.52%</p>
            </div>
            <div>
              <SwitchComp setSelectedInterval={setSelectedInterval} />
            </div>
          </div>
          <AreaChartComp value={""} />
        </div>
      </div>

      {/* Hot Tokens */}
      <div className="pl-4">
        <p className="font-medium text-lg mt-6 mb-2 text-white">Hot Tokens</p>
        <HotTokensTable
          liquidityPOX= {data?.reserve1 && data?.pricePOX &&
            formatNumberWithCommas((Number(data.reserve1) * data.pricePOX).toFixed(6))
          }
          liquidityUSDX={data?.reserve0 && formatNumberWithCommas((Number(data.reserve0)).toFixed(6))}
          volumePOX={
            data?.reserve1 &&
            formatNumberWithCommas((Number(data.reserve1) * data.pricePOX).toFixed(6) * 2)
          }
          volumeUSDX={data?.reserve0 &&
            formatNumberWithCommas(Number(data?.reserve0).toFixed(6) * 2)}
          poxPrice={data?.pricePOX && Number(data?.pricePOX).toFixed(6)}
        />
      </div>

      {/* Trading Pair */}
      <div className="pl-4">
        <p className="font-medium text-lg mt-6 mb-2 text-white">Trading Pair</p>
        <TradingPairTable
         liquidityPOX= {data?.reserve1 && data?.pricePOX &&
          formatNumberWithCommas((Number(data.reserve1) * data.pricePOX).toFixed(6))
        }
        liquidityUSDX={data?.reserve0 && formatNumberWithCommas((Number(data.reserve0)).toFixed(6))}
        />
      </div>

      {/* Transactions */}
      <div className="pl-4">
        <p className="font-medium text-lg mt-6 mb-2 text-white">Transactions</p>
        <Transactions />
      </div>
      <PolicyOptions />
    </div>
  );
};

export default Scan;
