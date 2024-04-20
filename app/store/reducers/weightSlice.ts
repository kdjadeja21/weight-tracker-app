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
}

const initialState: WeightState = {
  weights: [],
  todayWeightRecord: [],
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
  },
});

export const { setWeights, addWeight, setTodayWeightRecord } =
  weightSlice.actions;
export default weightSlice.reducer;
