
const Input = () => {
  return (
    <div className="relative">
    <input
      type="text"
      id="floating_outlined"
      className=" px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white
         dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=""
    />
    <label
      htmlFor="floating_outlined"
      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4
       scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500
        peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
        peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
    >
      Enter an amount
    </label>
  </div>
  )
}

export default Input