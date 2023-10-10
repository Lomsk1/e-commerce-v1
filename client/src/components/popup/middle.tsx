import { MouseEventHandler } from "react";
import { RemoveScroll } from "react-remove-scroll";

interface PopupTypes {
  // children: React.ReactNode;
  text: string;
  closeFn: MouseEventHandler;
}

const PopupMiddle: React.FC<PopupTypes> = ({ text, closeFn }) => {
  return (
    <>
      <div className={"popup_middle"}>
        <RemoveScroll>
          <div className="text_cont">
            <div className="text_cont">
              <div className="title">{text}</div>

              <button onClick={closeFn}>OK</button>
            </div>
          </div>
        </RemoveScroll>
      </div>
    </>
  );
};

export default PopupMiddle;
