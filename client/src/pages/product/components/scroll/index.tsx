import { Link as LinkS } from "react-scroll";

function ProductNav() {
  return (
    <>
      <div className="nav_bar">
        <nav>
          <ul>
            <li>
              <LinkS
                activeClass="active"
                to="description"
                spy={true}
                smooth={true}
                offset={-20}
                duration={500}
                delay={300}
              >
                Description
              </LinkS>
            </li>
            <li>
              <LinkS
                activeClass="active"
                to="specifications"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                delay={300}
              >
                Specifications
              </LinkS>
            </li>
            <li>
              <LinkS
                activeClass="active"
                to="branches"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                delay={300}
              >
                Branches
              </LinkS>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default ProductNav;
