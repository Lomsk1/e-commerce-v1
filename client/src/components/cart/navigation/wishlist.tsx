const WishlistForNavigation: React.FC = () => {
  return (
    <>
      <div
        className="main wish"
        //   onClick={() => {
        //     if (isAuthenticated) {
        //       navigate("/wishlist_main_page");
        //     } else {
        //       navigate("/log_in");
        //     }
        //   }}
      >
        <div className="svg">
          {/* <FontAwesomeIcon icon={faHeart} /> */}
          <div className="amount">
            {/* <p>{!wishIsLoading ? wishlistData.length : 0}</p> */}
          </div>
        </div>
        <p className="title">Wishlist</p>
      </div>
    </>
  );
};

export default WishlistForNavigation;
