import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { tableData } from "../data/data";
import { useNavigate } from "react-router-dom";

const TableCom = ({tableType,attributesArray}) => {
  const navigate = useNavigate();
  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const priceBodyTemplate = (product) => {
    return formatCurrency(product.price);
  };

  const actionBodyTemplate = () => {
    return (
      <div className="flex items-center py-2 space-x-4">
        <button
          onClick={() =>navigate("/pool")}
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
    <div className="card bg-white rounded-3xl overflow-x-auto">
      <DataTable
       paginator= {tableType==="transactions"}
        value={tableData}
        rows={5}
        // sortField="price"
        // sortOrder={-1}
        tableStyle={{ minWidth: "50rem", borderRadius: "12px" }}
        responsiveLayout="scroll"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        paginatorClassName="custom-paginator" // Added custom class
      >
        {attributesArray.map((attribute, index) => (
          <Column
            key={index}
            field={attribute}
            header={attribute}
            // sortable
            style={{ width: "16%", padding: "12px" }}
            headerClassName={`yellow-header ${index===0?"yellow-header1":""} ${index===5?"yellow-header5":""}`}
            body={(attribute==="Volume (24hr)" || attribute==="Price Change (24hr)" || attribute=="Price"
              || attribute==="Volume (7hr)" || attribute==="Fees (24hrs)" || attribute==="Total Value" ||
              attribute==="Token Amount" || attribute==="Token Amount")?
              priceBodyTemplate:(attribute==="Actions"?actionBodyTemplate:"")
            }
          />
        ))}
        
      </DataTable>
    </div>
  );
};

export default TableCom;
