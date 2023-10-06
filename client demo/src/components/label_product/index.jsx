import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LabelProducts(props) {
  return (
    <>
      <div className="label_products">
        <div className="icon">
          <FontAwesomeIcon icon={props.icons} />
        </div>
        <div className="title">
          <h1>{props.title}</h1>
          {props.butt && props.children}
        </div>
        <div className="button">{!props.butt && props.children}</div>
      </div>
      <hr className="hr" />
    </>
  );
}

export default LabelProducts;
