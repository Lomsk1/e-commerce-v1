import {
  faMailBulk,
  faMapLocation,
  faMoon,
  faPhone,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../wrapper";

function HeadingInformation() {
  const [open, setOpen] = useState(false);

  const modeHandler = (e) => {
    setOpen(!open);
  };

  const darkHandler = () => {};
  const lightHandler = () => {};

  return (
    <>
      <section className="heading_info_section">
        <div className="left">
          <div className="infos">
            <FontAwesomeIcon icon={faPhone} />
            <p>
              Hot line: <span>*8008 / +995 (32) 2</span>
            </p>
          </div>
          <div className="infos">
            <FontAwesomeIcon className="svg" icon={faMailBulk} />
            <p>email@email.com</p>
          </div>
        </div>

        <div className="right">
          <div className="infos">
            <FontAwesomeIcon icon={faMapLocation} />
            <Link to={"/branches"}>Branches</Link>
          </div>
          <div className="mode" onClick={modeHandler}>
            <FontAwesomeIcon icon={faMoon} />
          </div>
          {open && (
            <Wrapper visible={open} close={modeHandler} className="out_mode">
              <button onClick={darkHandler}>
                <FontAwesomeIcon icon={faMoon} />
                <p>Dark</p>
              </button>
              <button onClick={lightHandler}>
                <FontAwesomeIcon icon={faSun} />
                <p>Light</p>
              </button>
            </Wrapper>
          )}
        </div>
      </section>
    </>
  );
}

export default HeadingInformation;
