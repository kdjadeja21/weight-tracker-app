"use client";

import { Card, AreaChart, Title, Text } from "@tremor/react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  collection,
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import FloatingBtn from "../FloatingBtn/FloatingBtn";
import { UseQueryResult, useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { getWeights } from "@/actions/weightActions";

export interface IWeightData {
  id: string;
  user_id: string;
  weight: string;
  date: string;
}

const WeightChart: React.FC = () => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });

  const [data, setData] = useState<Array<IWeightData>>([
    {
      id: "yJ0lY2KOCEbX8YSqd2Yn",
      user_id: "ksdFStGUL7XBd1DGCf8MpaBRD7y1",
      weight: "66",
      date: "Feb 13, 2024",
    },
  ]);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let userId = localStorage.getItem("WTAuserId");
    const fetchTodos = async () => {
      if (userId) {
        const weights = await getWeights({
          user_id: userId,
        });
        setData(weights);
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  return (
    <Card className="mt-8">
      <Title>Weight Tracker Chart</Title>
      <Text>Weight History</Text>
      {isLoading ? (
        <svg
          width="1140"
          height="80"
          viewBox="0 0 1140 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M108.354 62.0435L1 79H571H1139L1067.39 54.6957L1011.15 75.0435L899.708 59.2174L835.296 54.6957L782.13 36.0435L722.83 59.2174L629.789 33.2174L556.175 66L483.583 54.6957H384.408L329.197 27L249.448 44.5217L190.148 33.2174L108.354 62.0435Z"
            fill="url(#chart-shine)"
            stroke="#ECEEEF"
            strokeWidth="2"
          />
          <rect x="9" y="8" width="118" height="11" rx="2" fill="#ECEEEF" />
          <defs>
            <linearGradient
              id="chart-shine"
              x1="0"
              y1="100%"
              x2="100%"
              y2="100%"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ECEEEF" />
              <stop offset="12%" stopColor="#ECEEEF" stopOpacity="0.1" />
              <stop offset="30%" stopColor="#ECEEEF" />
              <stop offset="100%" stopColor="#ECEEEF" />
              <animate
                id="gradient"
                attributeName="x1"
                dur="1s"
                from="0"
                to="100%"
                repeatCount="indefinite"
                begin="0s"
              />
            </linearGradient>
          </defs>
        </svg>
      ) : (
        <AreaChart
          className="mt-4 h-80"
          data={data}
          categories={["weight"]}
          index="date"
          colors={["indigo", "fuchsia"]}
          valueFormatter={(number: number) => `${number} KG`}
          yAxisWidth={60}
        />
      )}
      <FloatingBtn />
    </Card>
  );
};

export default WeightChart;
