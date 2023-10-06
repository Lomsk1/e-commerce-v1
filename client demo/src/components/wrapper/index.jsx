import { useEffect, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

function Wrapper(props) {
  const { visible, close } = props;
  const wrapperRef = useRef(null);

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
  //       close();
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [wrapperRef, visible]);

  const handleClickOutside = () => {
    close();
  };

  useOnClickOutside(wrapperRef, handleClickOutside);

  return (
    <>
      {visible && (
        <div
          ref={wrapperRef}
          //   {...props}
          className={props.className}
          style={props.style}
        >
          {props.children}
        </div>
      )}
    </>
  );
}

export default Wrapper;
