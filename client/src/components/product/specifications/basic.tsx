import { Fragment, useEffect, useState } from "react";
import { ProductType } from "../../../types/product";

interface PropTypes {
  data: ProductType["data"]["specifications"];
}

const EachProductBasic: React.FC<PropTypes> = ({ data }) => {
  const [topBasics, setTopBasics] = useState<PropTypes["data"] | null>(null);

  useEffect(() => {
    let isSub = true;
    if (isSub) {
      setTopBasics(
        data.filter((da) => da.specificationBasics.some((so) => so.top))
      );
    }
    return () => {
      isSub = false;
    };
  }, [data]);

  return (
    <>
      {topBasics &&
        topBasics.map((basic) => (
          <Fragment key={basic._id}>
            {basic.specificationBasics.map((spec) => (
              <p key={spec._id}>
                {spec.middle} --
                <span>{spec.name}</span>
              </p>
            ))}
          </Fragment>
        ))}
    </>
  );
};

export default EachProductBasic;
