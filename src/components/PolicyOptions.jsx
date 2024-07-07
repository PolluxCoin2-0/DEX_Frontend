import PrivacyPDF from "../assets/PrivacyDoc.pdf";

const PolicyOptions = () => {
  return (
    <div>
      <ul className="flex flex-col sm:flex-row justify-center space-y-2
      sm:space-y-0 sm:space-x-4 divide-y sm:divide-y-0 sm:divide-x-2 text-sm text-white pt-8">
        <li className="cursor-pointer">Developer Documentation</li>
        {/* <li className="pt-2 sm:pt-0 sm:pl-4 cursor-pointer">Terms of Service</li> */}
        <a href={PrivacyPDF} target = "_blank" rel="noreferrer"><li className="pt-2 sm:pt-0 sm:pl-4 cursor-pointer">Terms of Service</li></a>
        <a href={PrivacyPDF} target = "_blank" rel="noreferrer"><li className="pt-2 sm:pt-0 sm:pl-4 cursor-pointer">Privacy Policy</li></a>

        {/* <li className="pt-2 sm:pt-0 sm:pl-4 cursor-pointer">Whistleblower</li> */}
      </ul>
    </div>
  );
};

export default PolicyOptions
