import { useState } from "react";

const TermsAndPrivacy: React.FC = () => {
  const [isActive, setIsActive] = useState("term");
  return (
    <>
      <section className="terms_privacy_section">
        <div className="list">
          <ul>
            <li>
              <label
                htmlFor="term"
                style={{ color: isActive === "term" ? "red" : "" }}
              >
                Terms
              </label>
              <input
                type="radio"
                name="terms_conditions"
                id="term"
                defaultChecked
                onChange={() => {
                  setIsActive("term");
                }}
              />
            </li>
            <li>
              <label
                htmlFor="condition"
                style={{ color: isActive === "condition" ? "red" : "" }}
              >
                Condition
              </label>
              <input
                type="radio"
                name="terms_conditions"
                id="condition"
                onChange={() => {
                  setIsActive("condition");
                }}
              />
            </li>
          </ul>
        </div>

        <hr />

        {/* Terms */}
        {isActive === "term" && (
          <div className="content" id="term">
            <div className="text_container">
              <div>
                <h1>Terms of Service</h1>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Eligendi, at totam. Nemo laborum hic id optio culpa ratione
                  natus cumque dolores ex atque nostrum velit est sint ducimus
                  ipsa explicabo vitae repellat, dolor reprehenderit sequi ipsam
                  eveniet, ad iste labore.
                </p>
              </div>
              <div>
                <a href={"/src/assets/pdf/CV-Giorgi-Lomsianidze.pdf"} download>
                  Download PDF:
                </a>
              </div>
            </div>

            <div className="text_container">
              <div>
                <h1>Description of Service</h1>
                <p>
                  <span>Basically: </span> Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Porro libero, reprehenderit
                  similique cumque magnam nam quae deserunt reiciendis quisquam
                  nostrum.
                </p>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Eligendi, at totam. Nemo laborum hic id optio culpa ratione
                  natus cumque dolores ex atque nostrum velit est sint ducimus
                  ipsa explicabo vitae repellat, dolor reprehenderit sequi ipsam
                  eveniet, ad iste labore.
                </p>
              </div>
              <div></div>
            </div>

            <div className="text_container">
              <div>
                <h1>Acceptance of Service</h1>
                <p>
                  <span>Basically: </span> Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Porro libero, reprehenderit
                  similique cumque magnam nam quae deserunt reiciendis quisquam
                  nostrum.
                </p>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Eligendi, at totam. Nemo laborum hic id optio culpa ratione
                  natus cumque dolores ex atque nostrum velit est sint ducimus
                  ipsa explicabo vitae repellat, dolor reprehenderit sequi ipsam
                  eveniet, ad iste labore.
                </p>
              </div>
              <div></div>
            </div>
          </div>
        )}

        {/* Conditions */}

        {isActive === "condition" && (
          <div className="content" id="condition">
            <div className="text_container">
              <div>
                <h1>Conditions of Service</h1>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Eligendi, at totam. Nemo laborum hic id optio culpa ratione
                  natus cumque dolores ex atque nostrum velit est sint ducimus
                  ipsa explicabo vitae repellat, dolor reprehenderit sequi ipsam
                  eveniet, ad iste labore.
                </p>
              </div>
              <div>
                <a href={"/src/assets/pdf/CV-Giorgi-Lomsianidze.pdf"} download>
                  Download PDF:
                </a>
              </div>
            </div>

            <div className="text_container">
              <div>
                <h1>Description of Service</h1>
                <p>
                  <span>Basically: </span> Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Porro libero, reprehenderit
                  similique cumque magnam nam quae deserunt reiciendis quisquam
                  nostrum.
                </p>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Eligendi, at totam. Nemo laborum hic id optio culpa ratione
                  natus cumque dolores ex atque nostrum velit est sint ducimus
                  ipsa explicabo vitae repellat, dolor reprehenderit sequi ipsam
                  eveniet, ad iste labore.
                </p>
              </div>
              <div></div>
            </div>

            <div className="text_container">
              <div>
                <h1>Acceptance of Service</h1>
                <p>
                  <span>Basically: </span> Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Porro libero, reprehenderit
                  similique cumque magnam nam quae deserunt reiciendis quisquam
                  nostrum.
                </p>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Eligendi, at totam. Nemo laborum hic id optio culpa ratione
                  natus cumque dolores ex atque nostrum velit est sint ducimus
                  ipsa explicabo vitae repellat, dolor reprehenderit sequi ipsam
                  eveniet, ad iste labore.
                </p>
              </div>
              <div></div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default TermsAndPrivacy;
