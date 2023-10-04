import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDataByID,
  getProductImageByProduct,
  getProductSpecificationByProduct,
  getProductStockByProduct,
} from "../../API/product/actions";
import {
  setAsNew,
  setBranchTable,
  setImageTable,
  setPopularity,
  setProductChildTablesClose,
  setProductFormsClose,
  setSales,
  setSpecTable,
  setTop,
} from "../../redux/admin/forProduct/slice";

function AdminChildrenNav() {
  const [moreProduct, setMoreProduct] = useState(false);
  const [moreChildren, setMoreChildren] = useState(false);

  const dispatch = useDispatch();

  const { mainTableID } = useSelector((state) => state.adminTable);

  const eachProduct = () => {
    dispatch(getProductDataByID({ id: mainTableID }));
  };
  return (
    <>
      <div className="children_nav_container">
        <button
          className="product_box similar"
          onClick={() => {
            setMoreProduct(!moreProduct);
            setMoreChildren(false);
            dispatch(setProductFormsClose());
            dispatch(setProductChildTablesClose());
          }}
        >
          <p>More Product Details</p>
        </button>

        <p>ID: {mainTableID}</p>

        <button
          className="children_box similar"
          onClick={() => {
            setMoreChildren(!moreChildren);
            setMoreProduct(false);
            dispatch(setProductFormsClose());
            dispatch(setProductChildTablesClose());
          }}
        >
          <p>Children Details</p>
        </button>

        {/* More Details */}
      </div>
      {moreProduct && (
        <div className="more_details">
          <ul>
            <li
              onClick={() => {
                dispatch(setAsNew(true));
                eachProduct();
              }}
            >
              as New
            </li>

            <li
              onClick={() => {
                dispatch(setSales(true));
                eachProduct();
              }}
            >
              Sales
            </li>

            <li
              onClick={() => {
                dispatch(setTop(true));
                eachProduct();
              }}
            >
              Top
            </li>

            <li
              onClick={() => {
                dispatch(setPopularity(true));
                eachProduct();
              }}
            >
              Popularity
            </li>
          </ul>
        </div>
      )}
      {moreChildren && (
        <div className="more_details">
          <ul>
            <li
              onClick={() => {
                dispatch(setImageTable(true));
                dispatch(
                  getProductImageByProduct({
                    id: mainTableID,
                  })
                );
              }}
            >
              Images
            </li>

            <li
              onClick={() => {
                dispatch(setSpecTable(true));
                dispatch(
                  getProductSpecificationByProduct({
                    id: mainTableID,
                  })
                );
              }}
            >
              specifications
            </li>

            <li
              onClick={() => {
                dispatch(setBranchTable(true));
                dispatch(
                   getProductStockByProduct({
                      id: mainTableID,
                    })
                  );
              }}
            >
              Branches (in Stock)
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default AdminChildrenNav;
