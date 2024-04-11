"use server";

import {
  collection,
  addDoc,
  getDocs,
  query,
  collectionGroup,
  where,
  orderBy,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../app/firebase";
import { IWeightData } from "@/app/WeightChart/WeightChart";

export const addWeight = async ({
  user_id,
  weight,
}: {
  user_id: string;
  weight: string;
}) => {
  await addDoc(collection(db, "weight"), {
    user_id: user_id,
    weight: weight,
    date: new Date(),
  });
};

export const getWeights = async ({ user_id }: { user_id: string }) => {
  const weightQuery = query(
    collection(db, "weight"),
    where("user_id", "==", user_id),
    orderBy("date", "asc")
  );

  const querySnapshot = await getDocs(weightQuery);
  let weightsData: Array<IWeightData> = [];
  await querySnapshot.docs.forEach(
    (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
      const formattedDateTime = new Date(
        doc.data().date.seconds * 1000
      ).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      weightsData.push({
        id: doc.id,
        user_id: doc.data().user_id,
        weight: parseFloat(doc.data().weight),
        date: formattedDateTime,
      });
    }
  );
  return weightsData;
};
