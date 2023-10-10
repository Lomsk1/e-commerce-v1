import NavigationSearchForm from "../../../search/navigation/form";

const SearchBarNavigation: React.FC = () => {
  return (
    <>
      <div className="search_bar">
        <NavigationSearchForm />
        {/* {searchLong && (
              <SearchBar
                data={searchData}
                visible={searchLong}
                close={searchLongHandler}
              />
            )} */}
      </div>
    </>
  );
};

export default SearchBarNavigation;
