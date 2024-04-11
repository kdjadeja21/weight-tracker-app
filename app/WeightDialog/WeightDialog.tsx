import React, { useState, SetStateAction, Dispatch } from "react";
import { Button, Dialog, DialogPanel } from "@tremor/react";
import { addWeight } from "@/actions/weightActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function WeightDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  //   const [isOpen, setIsOpen] = useState(false);
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    if (!weight) {
      setError("Please enter your weight.");
      return;
    }
    if (parseFloat(weight) < 0) {
      setError("Weight cannot be negative");
      return;
    }

    // Check if weight has more than 2 digits after decimal point
    if (weight.toString().split(".")[1]?.length > 2) {
      setError(
        "Please enter weight with at most two digits after the decimal point."
      );
      return;
    }

    let userId = await localStorage.getItem("WTAuserId");

    userId && (await addWeight({ user_id: userId, weight: weight }));

    toast.success("Weight Added!");
    // queryClient.invalidateQueries("userWeights");

    // Close the dialog
    setWeight("");
    setIsOpen(false);

    router.push("/");
  };

  const handleChange = (event: any) => {
    setWeight(event.target.value);
    // Clear error message when user starts typing again
    setError("");
  };

  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} static={true}>
        <DialogPanel>
          <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Add Today&#39;s Weight
          </h3>
          <div className="mt-2">
            <input
              type="number"
              value={weight}
              onChange={handleChange}
              placeholder="Enter your weight"
              className="block w-full py-3 px-4 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:ring-1"
            />
            {error && <p className="mt-1 text-red-500">{error}</p>}
          </div>
          <Button className="mt-4 w-full" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogPanel>
      </Dialog>
    </>
  );
}
