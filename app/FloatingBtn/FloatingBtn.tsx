import { useState } from "react";
import { WeightDialog } from "../WeightDialog/WeightDialog";
import { useRouter } from "next/navigation";

const FloatingBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    router.push("?add-weight");
  };

  return (
    <div className="fixed bottom-4 right-4 z-10">
      <WeightDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      <button
        onClick={toggleOpen}
        className="bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400 transition-all duration-300 transform rotate-0"
        style={{ transform: isOpen ? "rotate(60deg)" : "rotate(0deg)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M12 4v16m8-8H4"}
          />
        </svg>
      </button>
    </div>
  );
};

export default FloatingBtn;
