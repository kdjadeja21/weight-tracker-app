"use client";

import { Card } from "@tremor/react";
import Nav from "../nav";
import { useState } from "react";
import {
  addTargetedWeight,
  updateTargetedWeight,
} from "@/actions/weightActions";
import { useSelector } from "react-redux";
import withReduxProvider from "../withReduxProvider";
import { useRouter } from "next/navigation";

const Profile: React.FC = () => {
  const [targetedWeight, setTargetedWeight] = useState<number>(0);
  const targetedWeightRecord = useSelector(
    (state: any) => state.weight.targetedWeight
  );

  const router = useRouter();

  const handleChange = (e: any) => {
    setTargetedWeight(e.target.value);
  };

  const handleSubmit = async () => {
    let userId = await localStorage.getItem("WTAuserId");
    if (
      targetedWeightRecord &&
      Object.keys(targetedWeightRecord).length !== 0
    ) {
      await updateTargetedWeight({
        documentId: targetedWeightRecord.id,
        weight: targetedWeight,
      });
    } else {
      userId &&
        (await addTargetedWeight({ user_id: userId, weight: targetedWeight }));
    }

    router.push("/");
  };

  return (
    <>
      <Nav />

      {/* <div > */}
      <Card className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
        <form action={handleSubmit}>
          {/* <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50"
            />
          </div> */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Targeted Weight
            </label>
            <input
              type="number"
              id="targeted-weight"
              name="targeted-weight"
              className="w-full border-gray-300 px-2 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50"
              onChange={handleChange}
              autoFocus
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Update Targeted Weight
            </button>
          </div>
        </form>
      </Card>
      {/* </div> */}
    </>
  );
};

export default withReduxProvider(Profile);
