import SwapForm from "../components/SwapForm";
import AnimatedNumber from "../components/AnimatingNumber";
import PolicyOptions from "../components/PolicyOptions";

const Home = () => {
  const totalValueLocked = 411502134;

  return (
    <div className="flex flex-col md:items-center py-6 justify-start px-4 min-h-screen">
      <div className="text-center">
        <p className="text-lg md:text-2xl pb-1 text-white font-bold">
          Total Value Locked
        </p>
        <p className="text-3xl md:text-5xl text-[#F3BB1B] font-bold flex items-center justify-center">
          $ <AnimatedNumber value={totalValueLocked} />
        </p>
      </div>

      <div className="pt-6 pb-2 w-full md:w-2/6 md:pt-12">
        <SwapForm />
      </div>
      <PolicyOptions />
    </div>
  );
};

export default Home;
