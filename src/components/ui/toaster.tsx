import { IToaster } from "@/contexts/ToasterContexts";
import { CheckCircle, Trash2 } from "lucide-react";
import { ReactNode } from "react";

const iconList: { [key: string]: ReactNode } = {
  success: <CheckCircle className="text-success-500 text-3xl" />,
  error: <Trash2 className="text-danger-500 text-3xl" />,
};

interface PropTypes extends IToaster {}

const Toaster = (props: PropTypes) => {
  const { type, message } = props;

  return (
    <div
      role="alert"
      aria-labelledby="toaster-label"
      className="fixed top-8 right-8 z-50 max-w-xs rounded-xl border border-gray-200 bg-white shadow-sm"
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
