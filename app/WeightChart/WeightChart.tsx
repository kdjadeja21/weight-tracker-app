"use client";

import { Card, AreaChart, Title, Text } from "@tremor/react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import FloatingBtn from "../FloatingBtn/FloatingBtn";
import { getWeights } from "@/actions/weightActions";
import { useRouter } from "next/navigation";
import Loading from "../Loading/Loading";

export interface IWeightData {
  id: string;
  user_id: string;
  weight: number;
  date: string;
}

function getLatestRecords(records: IWeightData[]): IWeightData[] {
  const latestRecords: { [date: string]: IWeightData } = {};

  // Iterate through each record
  records.forEach((record: IWeightData) => {
    const date = record.date.split(",")[0]; // Extracting date part only
    if (
      !latestRecords[date] ||
      new Date(record.date) > new Date(latestRecords[date].date)
    ) {
      latestRecords[date] = record;
    }
  });

  // Convert the latestRecords object into an array of records
  return Object.values(latestRecords);
}

const WeightChart: React.FC = () => {
  const router = useRouter();

  useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signin");
      // redirect("/signin");
    },
  });

  const [data, setData] = useState<Array<IWeightData>>([]);

  const [isLoading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchTodos = async () => {
      if (!localStorage.getItem("WTAuserId")) router.push("/signin");

      let userId = localStorage.getItem("WTAuserId");
      if (userId) {
        const weights = await getWeights({
          user_id: userId,
        });
        const filterData = await getLatestRecords(weights);
        setData(filterData);
        setLoading(false);
      }
    };
    fetchTodos();
  }, [params]);

  if (isLoading) return <Loading />;

  return (
    <Card className="mt-8">
      <Title>Weight Tracker Chart</Title>
      <Text>Weight History</Text>
      {isLoading ? (
        <Loading isTitle={false} />
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
