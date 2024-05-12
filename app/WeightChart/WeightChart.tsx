"use client";

import {
  Card,
  AreaChart,
  Title,
  Text,
  Metric,
  BadgeDelta,
  Flex,
} from "@tremor/react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import FloatingBtn from "../FloatingBtn/FloatingBtn";
import { getWeights, getTargetedWeight } from "@/actions/weightActions";
import { useRouter } from "next/navigation";
import Loading from "../Loading/Loading";
import {
  setTodayWeightRecord,
  setTargetedWeightRecord,
} from "../store/reducers/weightSlice";
import { useDispatch } from "react-redux";
import { ITargetedWeight } from "../types";

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
  const dispatch = useDispatch();

  useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signin");
      // redirect("/signin");
    },
  });

  const [data, setData] = useState<Array<IWeightData>>([]);

  const [isLoading, setLoading] = useState(true);

  const [targetedWeight, setTargetedWeight] = useState<number>(0);

  const params = useParams();

  useEffect(
    () => {
      const fetchWeights = async () => {
        if (!localStorage.getItem("WTAuserId")) router.push("/signin");

        let userId = localStorage.getItem("WTAuserId");
        if (userId) {
          const targetedWeight: ITargetedWeight | undefined =
            await getTargetedWeight({
              user_id: userId,
            });
          if (targetedWeight && Object.keys(targetedWeight).length !== 0) {
            setTargetedWeight(targetedWeight.targeted_weight);

            await dispatch(setTargetedWeightRecord(targetedWeight));
          }

          const weights = await getWeights({
            user_id: userId,
          });
          const filterData = await getLatestRecords(weights);
          const todayWeightRecord = filterData.filter(
            (row) =>
              new Date(row.date).toDateString() === new Date().toDateString()
          );
          await dispatch(setTodayWeightRecord(todayWeightRecord));
          setData(filterData);
          setLoading(false);
        }
      };
      fetchWeights();
    },
    // eslint-disable-next-line
    [params]
  );

  const checkWeightStatus = (): string => {
    if (data[data.length - 1].weight > data[data.length - 2].weight)
      return "increase";
    else if (data[data.length - 1].weight < data[data.length - 2].weight)
      return "decrease";
    else if (data[data.length - 1].weight === data[data.length - 2].weight)
      return "unchanged";
    else return "unchanged";
  };

  if (isLoading) return <Loading />;

  const deltaType: string = checkWeightStatus();
  const weightMessage: string =
    deltaType === "increase"
      ? "Weight is increasing"
      : deltaType === "decrease"
      ? "Weight is decreasing"
      : "No change in weight status";

  return (
    <>
      <div className="grid grid-cols-2 gap-4 justify-center">
        <Card decoration="top">
          <Flex>
            <Metric>{targetedWeight}</Metric>
            <BadgeDelta
              deltaType={
                data[data.length - 1].weight > targetedWeight
                  ? "increase"
                  : "decrease"
              }
            ></BadgeDelta>
          </Flex>
          <Text>Targeted Weight</Text>
        </Card>

        <Card decoration="top">
          <Flex>
            <Metric>{data[data.length - 1].weight}</Metric>
            <BadgeDelta deltaType={deltaType} tooltip={weightMessage}>
              {deltaType === "increase"
                ? (
                    data[data.length - 1].weight - data[data.length - 2].weight
                  ).toFixed(2)
                : (
                    data[data.length - 2].weight - data[data.length - 1].weight
                  ).toFixed(2)}
            </BadgeDelta>
          </Flex>
          <Text>Current Weight</Text>
        </Card>
      </div>
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
    </>
  );
};

export default WeightChart;
