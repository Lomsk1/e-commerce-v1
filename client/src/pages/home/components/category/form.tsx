import { useState } from "react";
import useHomeCategoryValueStore from "../../../../store/client/home/category";

const HomeCategoryForm = () => {
  /* States */
  const [topBg, setTopBg] = useState<boolean>(true);
  const [budgetBg, setBudgetBg] = useState<boolean>(false);
  const [popularBg, setPopularBg] = useState<boolean>(false);

  /* Stores */
  const { setCategoryValue } = useHomeCategoryValueStore((state) => state);

  return (
    <>
      <form>
        <div style={{ backgroundColor: topBg ? "#1B4353" : "" }}>
          <label htmlFor="top_productions">Top Productions</label>
          <input
            type="radio"
            name="category"
            id="top_productions"
            value={"top"}
            onChange={(e) => {
              setCategoryValue(e.target.value);
            }}
            onClick={() => {
              setTopBg(true);
              setBudgetBg(false);
              setPopularBg(false);
            }}
          />
        </div>
        <div style={{ backgroundColor: budgetBg ? "#1B4353" : "" }}>
          <label htmlFor="budget">Budget</label>
          <input
            type="radio"
            name="category"
            id="budget"
            value={"budget"}
            onChange={(e) => {
              setCategoryValue(e.target.value);
            }}
            onClick={() => {
              setTopBg(false);
              setBudgetBg(true);
              setPopularBg(false);
            }}
          />
        </div>
        <div style={{ backgroundColor: popularBg ? "#1B4353" : "" }}>
          <label htmlFor="popular">Popular</label>
          <input
            type="radio"
            name="category"
            id="popular"
            value={"popular"}
            onChange={(e) => {
              setCategoryValue(e.target.value);
            }}
            onClick={() => {
              setTopBg(false);
              setBudgetBg(false);
              setPopularBg(true);
            }}
          />
        </div>
      </form>
    </>
  );
};

export default HomeCategoryForm;
