import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBranchData } from "../../../API/branch/action";
import { getAllBrandData } from "../../../API/brand/action";
import { getAllCategoryData } from "../../../API/category/action";
import {
  deleteProduct,
  deleteProductBasics,
  deleteProductImage,
  deleteProductSpecification,
  deleteProductStock,
  getAllLimitedProductData,
  getProductBasicsByProduct,
  getProductDataByID,
  getProductImageByProduct,
  getProductSpecificationByProduct,
  getProductStockByProduct,
} from "../../../API/product/actions";
import ProductBasicForm from "../../../components/admin_forms/product/basic";
import ProductImageForm from "../../../components/admin_forms/product/image";
import ProductForm from "../../../components/admin_forms/product/product";
import ProductSpecForm from "../../../components/admin_forms/product/spec";
import ProductStockForm from "../../../components/admin_forms/product/stock";
import AdminNavigation from "../../../components/admin_navigation";
import AdminChildrenNav from "../../../components/admin_product/children_nav";
import AdminProductSorting from "../../../components/admin_product/sorting";
import AdminChildrenTable from "../../../components/admin_table/children_table";
import AdminTable from "../../../components/admin_table/main_table";
import AdminNewTable from "../../../components/admin_table/product/new";
import AdminPopularityTable from "../../../components/admin_table/product/popularity";
import AdminSaleTable from "../../../components/admin_table/product/sale";
import AdminTopTable from "../../../components/admin_table/product/top";
import { setSpecBasicTable } from "../../../redux/admin/forProduct/slice";
import {
  childFormPost,
  childFormPut,
  mainFormToggle,
  setStatusCondition,
  setStatusValue,
  statusRequestToggle,
} from "../../../redux/admin/tables/slice";

function AdminProduct() {
  //   ////////////////////   Other Functions     ////////////////////
  const [showChildrenNav, setShowChildrenNav] = useState(false);
  const [sortingData, setSortingData] = useState(null);

  const statusMessage = (info, condition) => {
    dispatch(setStatusValue(info));
    dispatch(statusRequestToggle(true));
    dispatch(setStatusCondition(condition));

    const timer = setTimeout(() => {
      dispatch(statusRequestToggle(false));
    }, 3000);
    return () => clearTimeout(timer);
  };
  //   ////////////////////   Redux      ////////////////////
  const dispatch = useDispatch();

  //  ////////////////////  Data Selector     ////////////////////

  const {
    productData,
    isLoading,
    productImagesData,
    productImagesIsLoading,
    productSpecificationData,
    productSpecificationIsLoading,
    productBasicData,
    productBasicIsLoading,
    productStockData,
    productStockIsLoading,
  } = useSelector((state) => state.product);

  const { brandCategoryData } = useSelector((state) => state.brand);

  const {
    mainTableID,
    childFormName,
    childFormAdd,
    childFormChange,
    fatherTableID,
  } = useSelector((state) => state.adminTable);

  const {
    asNew,
    sales,
    top,
    popularity,
    imageTable,
    specificationTable,
    specBasicTable,
    branchTable,
    isSort,
    productLimit,
  } = useSelector((state) => state.productTable);

  const { categoryData, categoryIsLoading } = useSelector(
    (state) => state.category
  );

  //  ////////////////////  A L L   P R O D U C T  ////////////////////

  useEffect(() => {
    dispatch(
      getAllLimitedProductData({
        limit: productLimit,
      })
    );
    dispatch(getAllBrandData());
    dispatch(getAllCategoryData());
  }, [productLimit]);

  const deleteProductHandler = (id) => {
    dispatch(
      deleteProduct({
        id: id,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(
          getAllLimitedProductData({
            limit: productLimit,
          })
        );
        statusMessage(originalPromiseResult, "success");
      })
      .catch((rejectedValue) => {
        statusMessage("Error while Deleting", "error");
      });
  };

  ////////////////////  I M A G E S  ////////////////////

  const imageDeleteHandler = (id) => {
    dispatch(
      deleteProductImage({
        id: id,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(
          getProductImageByProduct({
            id: mainTableID,
          })
        );
        statusMessage(originalPromiseResult, "success");
      })
      .catch((rejectedValue) => {
        statusMessage("Error while Deleting", "error");
      });
  };

  ////////////////////  S P E C  ////////////////////

  const specDeleteHandler = (id) => {
    dispatch(
      deleteProductSpecification({
        id: id,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(
          getProductSpecificationByProduct({
            id: mainTableID,
          })
        );
        statusMessage(originalPromiseResult, "success");
      })
      .catch((rejectedValue) => {
        statusMessage("Error while Deleting", "error");
      });
  };

  ////////////////////  B A S I C  ////////////////////

  const basicDeleteHandler = (id) => {
    dispatch(
      deleteProductBasics({
        id: id,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(
          getProductBasicsByProduct({
            id: fatherTableID,
          })
        );
        statusMessage(originalPromiseResult, "success");
      })
      .catch((rejectedValue) => {
        statusMessage("Error while Deleting", "error");
      });
  };

  ////////////////////  B A S I C  ////////////////////

  const stockDeleteHandler = (id) => {
    dispatch(
      deleteProductStock({
        id: id,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(
          getProductStockByProduct({
            id: mainTableID,
          })
        );
        statusMessage(originalPromiseResult, "success");
      })
      .catch((rejectedValue) => {
        statusMessage("Error while Deleting", "error");
      });
  };

  ////////////////////////// S O R T I N G //////////////////////
  const sortingFunction = (e, id) => {
    if (e === "all") {
      setSortingData(productData);
    }
    if (e === "category") {
      setSortingData(categoryData.filter((info) => info.id === id)[0].product);
    }
    if (e === "brand") {
      setSortingData(
        brandCategoryData.filter((info) => info.id === id)[0].product
      );
    }
    if (e === "popularity") {
      setSortingData(productData.filter((info) => info.popularity === true));
    }
    if (e === "top") {
      setSortingData(productData.filter((info) => info.top === true));
    }
    if (e === "new") {
      setSortingData(productData.filter((info) => info.new === true));
    }
  };

  return (
    <>
      <AdminNavigation section_title={"Product"} statusMessage={() => {}}>
        {/* Sorting */}
        <AdminProductSorting sortingFunction={sortingFunction} />

        {/* Main Table */}
        {!isLoading ? (
          <AdminTable
            th_data={[
              "ID",
              "Title",
              "Separate",
              "Product Model",
              "Description",
              "Price",
              "Thumbnail",
              "Color",
              "In Stock",
              "Actions",
            ]}
            no_deadline
            stock
            api_data={!isSort ? productData : sortingData}
            product_limitation
            eachProductData={(id) => {
              dispatch(
                getProductDataByID({
                  id: id,
                })
              );
            }}
            get_children_data={(id) => {
              setShowChildrenNav(true);
            }}
            delete_api={(id) => {
              deleteProductHandler(id);
            }}
          />
        ) : (
          <div>Loading</div>
        )}
        {showChildrenNav && <AdminChildrenNav />}

        {/* I N N E R  */}

        {asNew && <AdminNewTable />}
        {sales && <AdminSaleTable />}
        {top && <AdminTopTable />}
        {popularity && <AdminPopularityTable />}

        {/* I M A G E  */}

        {imageTable &&
          (!productImagesIsLoading ? (
            <AdminChildrenTable
              table_title={"Images Table"}
              th_data={["ID", "Image", "Actions"]}
              api_data={productImagesData}
              form_name={"Add Images"}
              child_form_add={() => {
                dispatch(childFormPost("image"));
                dispatch(mainFormToggle(false));
              }}
              child_form_change={() => {
                dispatch(childFormPut("image"));
                dispatch(mainFormToggle(false));
              }}
              child_form_delete={(id) => {
                imageDeleteHandler(id);
              }}
            />
          ) : (
            <div></div>
          ))}
        {childFormAdd && childFormName === "image" && <ProductImageForm />}
        {childFormChange && childFormName === "image" && <ProductImageForm />}

        {/* S P E C I F I C A T I O N  */}

        {specificationTable &&
          (!productSpecificationIsLoading ? (
            <AdminChildrenTable
              table_title={"Specifications Table"}
              th_data={["ID", "Category", "Actions"]}
              api_data={productSpecificationData}
              form_name={"Add Spec."}
              more_detail
              moreChildTable={(id) => {
                dispatch(setSpecBasicTable(true));
                dispatch(
                  getProductBasicsByProduct({
                    id: id,
                  })
                );
              }}
              child_form_add={() => {
                dispatch(childFormPost("spec"));
                dispatch(mainFormToggle(false));
              }}
              child_form_change={() => {
                dispatch(childFormPut("spec"));
                dispatch(mainFormToggle(false));
              }}
              child_form_delete={(id) => {
                specDeleteHandler(id);
              }}
            />
          ) : (
            <div></div>
          ))}
        {childFormAdd && childFormName === "spec" && <ProductSpecForm />}
        {childFormChange && childFormName === "spec" && <ProductSpecForm />}

        {/* S P E C.   B A S I C  */}

        {specBasicTable &&
          (!productBasicIsLoading ? (
            <AdminChildrenTable
              table_title={"Spec. Basic Table"}
              th_data={["ID", "Title", "Name", "Actions"]}
              api_data={productBasicData}
              thirdChildTable
              form_name={"Add Basics"}
              child_form_add={() => {
                dispatch(childFormPost("basic"));
                dispatch(mainFormToggle(false));
              }}
              child_form_change={() => {
                dispatch(childFormPut("basic"));
                dispatch(mainFormToggle(false));
              }}
              child_form_delete={(id) => {
                basicDeleteHandler(id);
              }}
            />
          ) : (
            <div></div>
          ))}
        {childFormAdd && childFormName === "basic" && <ProductBasicForm />}
        {childFormChange && childFormName === "basic" && <ProductBasicForm />}

        {/* S T O C K  */}

        {branchTable &&
          (!productStockIsLoading ? (
            <AdminChildrenTable
              table_title={"Branch & Stock Table"}
              th_data={["ID", "is in Stock", "Branch ID", "Actions"]}
              api_data={productStockData}
              form_name={"Add Stock"}
              with_branch_data
              child_form_add={() => {
                dispatch(childFormPost("stock"));
                dispatch(mainFormToggle(false));
                dispatch(getAllBranchData());
              }}
              child_form_change={() => {
                dispatch(childFormPut("stock"));
                dispatch(mainFormToggle(false));
                dispatch(getAllBranchData());
              }}
              child_form_delete={(id) => {
                stockDeleteHandler(id);
              }}
              with_stock
            />
          ) : (
            <div></div>
          ))}
        {childFormAdd && childFormName === "stock" && <ProductStockForm />}
        {childFormChange && childFormName === "stock" && <ProductStockForm />}

        <ProductForm />
      </AdminNavigation>
    </>
  );
}

export default AdminProduct;
