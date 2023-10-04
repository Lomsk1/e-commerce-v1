import { RemoveScroll } from "react-remove-scroll";

function PopupMiddle({children}) {
  return (
    <>
      <div className={"popup_middle"}>
        <RemoveScroll>{children}</RemoveScroll>
      </div>
    </>
  );
}

export default PopupMiddle;
