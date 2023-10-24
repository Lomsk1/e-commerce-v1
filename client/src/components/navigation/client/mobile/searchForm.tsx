import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductsType } from "../../../../types/product";
import useSearchProductStore from "../../../../store/client/search/products";
import { getSearchProducts } from "../../../../api/products/get";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SearchBarMobileWrapper from "../../../search/wrapper/mobile";
import useSearchMobileWrapperStore from "../../../../store/client/search/mobileSearch";

interface FormValues {
  slug: string;
}

interface PropTypes {
  setBurger: ({ bol }: { bol: boolean }) => void;
}

const NavSearchFormMobile: React.FC<PropTypes> = ({ setBurger }) => {
  /* Store */

  const { searchMobileWrapperIsShow, setSearchMobileWrapperIsShow } =
    useSearchMobileWrapperStore((state) => state);
  const { setProducts, clear, products } = useSearchProductStore(
    (state) => state
  );

  /* Form */
  const { register, handleSubmit } = useForm<FormValues>();

  /* Query Mutation */
  const searchMutation = useMutation<ProductsType, Error, FormValues>({
    mutationFn: getSearchProducts,
    onSuccess: (data) => {
      if (data.status === "success") {
        setProducts(data);
      }
    },
  });

  if (searchMutation.isError) {
    clear();
  }

  /* onSubmit Function */
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    searchMutation.mutate(data);
    setSearchMobileWrapperIsShow(true);
  };

  return (
    <div className="search_bar little">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="search"
          placeholder="Searching..."
          onFocus={() => setSearchMobileWrapperIsShow(true)}
          onClick={() => setSearchMobileWrapperIsShow(true)}
          {...register("slug", { required: true })}
        />
        {searchMobileWrapperIsShow && (
          <SearchBarMobileWrapper
            products={products}
            visible={searchMobileWrapperIsShow}
            close={() => setSearchMobileWrapperIsShow(false)}
            setBurger={(e) => setBurger({ bol: e.bol })}
          />
        )}
        <button type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </div>
  );
};

export default NavSearchFormMobile;
