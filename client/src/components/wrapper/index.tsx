import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface WrapperTypes {
  visible: boolean;
  close: () => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Wrapper: React.FC<WrapperTypes> = (props: WrapperTypes) => {
  const { visible, close } = props;
  const wrapperRef = useRef(null);

  const handleClickOutside = () => {
    close();
  };

  useOnClickOutside(wrapperRef, handleClickOutside);

  return (
    <>
      {visible && (
        <div ref={wrapperRef} className={props.className} style={props.style}>
          {props.children}
        </div>
      )}
    </>
  );
};

export default Wrapper;
