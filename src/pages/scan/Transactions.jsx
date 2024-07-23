import { useEffect, useState } from "react";
import { getSearchedData } from "../../utils/Axios";
import { TimeFormatting } from "../../utils/TimeFormatting";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";

const Transactions = () => {
  const [transactionDataArray, setTransactionArray] = useState({});
  const [pageNo, setPageNo] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSearchedData("", pageNo);
      setTransactionArray(data?.data);
    };
    fetchData();
  }, [pageNo]);

  return (
    <div className="overflow-x-scroll">
      <div className="flex flex-row text-black font-bold justify-between items-center bg-[#F3BB1B] rounded-t-xl p-4 min-w-[1400px]">
        <p className="w-[16%] text-left pl-8">All</p>
        <p className="w-[16%] text-center">Total Value</p>
        <p className="w-[16%] text-center">Token Amount</p>
        <p className="w-[16%] text-center">Token Amount</p>
        <p className="w-[20%] text-center">Account</p>
        <p className="w-[16%] text-center">Time</p>
      </div>
      
      {transactionDataArray?.swapTransaction &&
        transactionDataArray.swapTransaction.map((item, idx) => (
          <Link to={`https://poxscan.io/transactions-detail/${item?.trxId}`} key={idx}>
            <div
              className={`text-black bg-white font-medium flex flex-row justify-between items-center p-4 border-b-[1px] min-w-[1400px] hover:bg-gray-100`}
            >
              <p className="w-[16%] pl-8">
                {item?.fromSymbol} to {item?.toSymbol}
              </p>
              <p className="text-center w-[16%]">$ {item.toAmount}</p>
              <p className="w-[16%] text-center">$ {item?.fromAmount}</p>
              <p className="w-[16%] text-center">$ {item?.toAmount}</p>
              <p className="w-[20%] text-center">{item?.walletAddress}</p>
              <p className="w-[16%] text-center">
                {TimeFormatting(item?.createdAt)}
              </p>
            </div>
          </Link>
        ))}

      <div className="bg-[#1B1B1B] rounded-b-xl min-w-[1400px] flex justify-start md:justify-center overflow-auto">
        <Pagination
          totalRecords={transactionDataArray?.totalRecords || 0}
          recordsPerPage={recordsPerPage}
          setPageNo={setPageNo}
        />
      </div>
    </div>
  );
};

export default Transactions;
