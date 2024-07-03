import Logo from "../assets/Logo.webp";
import USDX from "../assets/UXDX.webp";

const PoolTable = () => {
  return (
    <div>
        <div className="flex justify-between items-center text-white space-x-2 pb-6">
            <div>
                <p className="font-bold">Your Position</p>
            </div>
            <div className="flex space-x-2">
        <div className="flex items-center -space-x-3 py-2 md:py-4 font-semibold">
            <img src={Logo} alt="pox-logo" className="w-8 h-8 md:h-auto" />
            <img src={USDX} alt="pox-logo" className="w-8 h-8 md:h-auto" />
            </div>
            <div className="flex items-center  py-2 md:py-4 font-semibold">
            <p className="font-bold">POX<span className="text-[#BA843D] font-bold">/</span></p>
            <p className="font-bold">USDX</p>
            </div>
            </div>
        </div>

        <div className="flex flex-row items-center justify-between text-white">
        <div>
            <p className="font-bold">POX/USDX</p>
        </div>
        <div>
            <p className="font-bold">USwebpPOX</p>
        </div>
        <div>
            <p className="font-bold">Share of Pool</p>
        </div>
        </div>

        <div className="flex flex-row items-center justify-between text-white pt-12">
        <div>
            <p className="font-bold">POX</p>
        </div>
        <div>
            <p className="font-bold">USDX</p>
        </div>
        <div>
            <p className="font-bold">Pool Tokens</p>
        </div>
        </div>

    </div>
  )
}

export default PoolTable