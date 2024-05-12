import { ITargetedWeight } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Weight {
  id: string;
  user_id: string;
  weight: number;
  date: string;
}

interface WeightState {
  weights: Weight[];
  todayWeightRecord: Weight[];
  targetedWeight: ITargetedWeight | {};
}

const initialState: WeightState = {
  weights: [],
  todayWeightRecord: [],
  targetedWeight: {},
};

const weightSlice = createSlice({
  name: "weight",
  initialState,
  reducers: {
    setWeights(state, action: PayloadAction<Weight[]>) {
      state.weights = action.payload;
    },
    addWeight(state, action: PayloadAction<Weight>) {
      state.weights.push(action.payload);
    },
    setTodayWeightRecord(state, action: PayloadAction<Weight[]>) {
      state.todayWeightRecord = action.payload;
    },
    setTargetedWeightRecord(state, action: PayloadAction<ITargetedWeight>) {
      state.targetedWeight = action.payload;
    },
  },
});

export const {
  setWeights,
  addWeight,
  setTodayWeightRecord,
  setTargetedWeightRecord,
} = weightSlice.actions;
export default weightSlice.reducer;
