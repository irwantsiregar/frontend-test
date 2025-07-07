import { IToaster } from "@/contexts/ToasterContexts";
import { CheckCircle, CircleX } from "lucide-react";
import { ReactNode } from "react";

const iconList: { [key: string]: ReactNode } = {
  success: <CheckCircle className="text-3xl text-green-500" />,
  error: <CircleX className="text-3xl text-red-500" />,
};

interface PropTypes extends IToaster {}

const Toaster = (props: PropTypes) => {
  const { type, message } = props;

  return (
    <div
      role="alert"
      aria-labelledby="toaster-label"
      className="fixed top-8 right-1/2 z-50 max-w-xs rounded-xl border border-gray-200 bg-white shadow-sm"
    >
      <div className="flex items-center gap-2 p-4">
        {iconList[type]}
        <p id="toaster-label" className="text-sm text-gray-700">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Toaster;
