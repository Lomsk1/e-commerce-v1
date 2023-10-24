import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

interface PropTypes {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icons: FontAwesomeIconProps | any;
  title: string;
  butt?: boolean;
  children?: ReactNode;
}

const LabelProducts: React.FC<PropTypes> = (props) => {
  return (
    <>
      <div className="label_products">
        <div className="text">
          <div className="icon">
            <FontAwesomeIcon icon={props.icons} />
          </div>
          <div className="title">
            <h1>{props.title}</h1>
          </div>
        </div>

        {props.butt && <div className="butt">{props.children}</div>}

        {!props.butt && <div className="button">{props.children}</div>}
      </div>
      <hr className="hr" />
    </>
  );
};

export default LabelProducts;
