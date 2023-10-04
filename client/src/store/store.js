import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import authStore from "../API/auth/store";
import branchStore from "../API/branch/store";
import brandStore from "../API/brand/store";
import categoryStore from "../API/category/store";
import newsStore from "../API/news/store";
import productStore from "../API/product/store";
import subStore from "../API/subscription/store";
import weeklyStore from "../API/weekly_sale/store";
import wishlistStore from "../API/wishlist/store";
import productTableStore from "../redux/admin/forProduct/store";
import adminTableStore from "../redux/admin/tables/store";
import filterStore from "../redux/client/filter/store";

const rootReducer = combineReducers({
  ...categoryStore,
  ...branchStore,
  ...adminTableStore,
  ...brandStore,
  ...newsStore,
  ...weeklyStore,
  ...productTableStore,
  ...productStore,
  ...subStore,
  ...filterStore,
  ...authStore,
  ...wishlistStore,
});

export const store = configureStore({
  reducer: rootReducer,
});
