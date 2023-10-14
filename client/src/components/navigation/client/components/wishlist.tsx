import CartForNavigation from "../../../cart/navigation/cartNav";
// import WishlistForNavigation from "../../../cart/navigation/wishList";

const CartsNavigationComponent: React.FC = () => {
  return (
    <>
      <div className="wish_cart">
        {/* Cart */}
        <CartForNavigation />

        {/* Wishlist */}
        {/* <WishlistForNavigation /> */}
      </div>
    </>
  );
};

export default CartsNavigationComponent;
