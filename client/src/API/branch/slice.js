import { createSlice } from "@reduxjs/toolkit";
import {
  createBranch,
  getAllBranchData,
  getBranchCoords,
  getBranchCoordsByBranch,
  getBranchCoordsByID,
  getBranchDataByID,
  getBranchWorkingHours,
  getBranchWorkingHoursByBranch,
  getBranchWorkingHoursByID,
} from "./action";

const branchSlice = createSlice({
  name: "branch",
  initialState: {
    branchData: [],
    isLoading: true,

    eachBranchData: [],
    eachBranchIsLoading: true,

    branchWorkingData: [],
    branchWorkingIsLoading: true,

    branchCoordData: [],
    branchCoordIsLoading: true,
  },
  extraReducers: (builder) => {
    // Branch
    builder.addCase(getAllBranchData.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getAllBranchData.fulfilled, (state, action) => {
        (state.isLoading = false), (state.branchData = action.payload);
      }),
      builder.addCase(getAllBranchData.rejected, (state, action) => {
        state.isLoading = true;
      });

    builder.addCase(getBranchDataByID.pending, (state) => {
      state.eachBranchIsLoading = true;
    }),
      builder.addCase(getBranchDataByID.fulfilled, (state, action) => {
        state.eachBranchIsLoading = false;
        state.eachBranchData = action.payload;
      }),
      builder.addCase(getBranchDataByID.rejected, (state) => {
        state.eachBranchIsLoading = true;
      });

    //   Coords
    builder.addCase(getBranchCoords.pending, (state) => {
      state.branchCoordIsLoading = true;
    }),
      builder.addCase(getBranchCoords.fulfilled, (state, action) => {
        state.branchCoordIsLoading = false;
        state.branchCoordData = action.payload;
      }),
      builder.addCase(getBranchCoords.rejected, (state) => {
        state.branchCoordIsLoading = true;
      });

    builder.addCase(getBranchCoordsByID.pending, (state) => {
      state.branchCoordIsLoading = true;
    }),
      builder.addCase(getBranchCoordsByID.fulfilled, (state, action) => {
        state.branchCoordIsLoading = false;
        state.branchCoordData = action.payload;
      }),
      builder.addCase(getBranchCoordsByID.rejected, (state) => {
        state.branchCoordIsLoading = true;
      });

    builder.addCase(getBranchCoordsByBranch.pending, (state) => {
      state.branchCoordIsLoading = true;
    }),
      builder.addCase(getBranchCoordsByBranch.fulfilled, (state, action) => {
        state.branchCoordIsLoading = false;
        state.branchCoordData = action.payload;
      }),
      builder.addCase(getBranchCoordsByBranch.rejected, (state) => {
        state.branchCoordIsLoading = true;
      });

    //   Working Hours
    builder.addCase(getBranchWorkingHours.pending, (state) => {
      state.branchWorkingIsLoading = true;
    }),
      builder.addCase(getBranchWorkingHours.fulfilled, (state, action) => {
        state.branchWorkingIsLoading = false;
        state.branchWorkingData = action.payload;
      }),
      builder.addCase(getBranchWorkingHours.rejected, (state) => {
        state.branchWorkingIsLoading = true;
      });

    builder.addCase(getBranchWorkingHoursByID.pending, (state) => {
      state.branchWorkingIsLoading = true;
    }),
      builder.addCase(getBranchWorkingHoursByID.fulfilled, (state, action) => {
        state.branchWorkingIsLoading = false;
        state.branchWorkingData = action.payload;
      }),
      builder.addCase(getBranchWorkingHoursByID.rejected, (state) => {
        state.branchWorkingIsLoading = true;
      });

    builder.addCase(getBranchWorkingHoursByBranch.pending, (state) => {
      state.branchWorkingIsLoading = true;
    }),
      builder.addCase(
        getBranchWorkingHoursByBranch.fulfilled,
        (state, action) => {
          state.branchWorkingIsLoading = false;
          state.branchWorkingData = action.payload;
        }
      ),
      builder.addCase(getBranchWorkingHoursByBranch.rejected, (state) => {
        state.branchWorkingIsLoading = true;
      });
  },
});

export default branchSlice.reducer;
