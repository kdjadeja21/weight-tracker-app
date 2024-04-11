import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Weight {
  id: string;
  user_id: string;
  weight: string;
  date: string;
}

interface WeightState {
  weights: Weight[];
}

const initialState: WeightState = {
  weights: [],
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
  },
});

export const { setWeights, addWeight } = weightSlice.actions;
export default weightSlice.reducer;
