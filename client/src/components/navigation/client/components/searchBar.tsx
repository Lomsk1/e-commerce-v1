import useSearchProductStore from "../../../../store/client/search/products";
import useSearchWrapperStore from "../../../../store/client/search/search";
import NavigationSearchForm from "../../../search/navigation/form";
import SearchBarWrapper from "../../../search/wrapper/searchBar";

const SearchBarNavigation: React.FC = () => {
  /* Store */
  const { searchWrapperIsShow, setSearchWrapperIsShow } = useSearchWrapperStore(
    (state) => state
  );
  const { products } = useSearchProductStore((state) => state);

  return (
    <>
      <div className="search_bar">
        <NavigationSearchForm />
        {searchWrapperIsShow && (
          <SearchBarWrapper
          products={products}
            visible={searchWrapperIsShow}
            close={() => setSearchWrapperIsShow(false)}
          />
        )}
      </div>
    </>
  );
};

export default SearchBarNavigation;
