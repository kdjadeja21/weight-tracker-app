"use server";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  QueryDocumentSnapshot,
  DocumentData,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../app/firebase";
import { IWeightData } from "@/app/WeightChart/WeightChart";
import { ITargetedWeight } from "@/app/types";

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
      ).toLocaleString("en-IN", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
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

export const updateWeight = async ({
  documentId,
  weight,
}: {
  documentId: string;
  weight: number;
}) => {
  try {
    const docRef = await doc(db, "weight", documentId);
    await updateDoc(docRef, { weight: weight, date: new Date() });
  } catch (err) {
    console.log({ err });
  }
};

export const getTargetedWeight = async ({ user_id }: { user_id: string }) => {
  let targetedWeightData: ITargetedWeight | null = null;

  try {
    const targetedWeightQuery = query(
      collection(db, "targeted_weight"),
      where("user_id", "==", user_id)
    );

    const querySnapshot = await getDocs(targetedWeightQuery);

    targetedWeightData = {} as ITargetedWeight;

    await querySnapshot.docs.forEach(
      (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
        targetedWeightData = {
          id: doc.id,
          user_id: doc.data().user_id,
          targeted_weight: parseFloat(doc.data().targeted_weight),
        };
      }
    );

    return targetedWeightData;
  } catch (err) {
    console.log({ err });
  }
};

export const addTargetedWeight = async ({
  user_id,
  weight,
}: {
  user_id: string;
  weight: number;
}) => {
  try {
    await addDoc(collection(db, "targeted_weight"), {
      user_id: user_id,
      targeted_weight: weight,
      date: new Date(),
    });
  } catch (err) {
    console.log({ err });
  }
};

export const updateTargetedWeight = async ({
  documentId,
  weight,
}: {
  documentId: string;
  weight: number;
}) => {
  try {
    const docRef = await doc(db, "targeted_weight", documentId);
    await updateDoc(docRef, { targeted_weight: weight, date: new Date() });
  } catch (err) {
    console.log({ err });
  }
};
