import { useEffect } from "react";

function EachProductBasic({ data }) {
  // useEffect(() => {
  //   let isSub = true;
  //   if (isSub) {
  //     console.log(
  //       data
  //         .filter((data) => data.category.toUpperCase() === "DISPLAY")[0]
  //         .basic.filter(
  //           (data) => data.middle.toUpperCase() === "DISPLAY SIZE CLASS"
  //         )
  //     );
  //   }
  //   return () => {
  //     isSub = false;
  //   };
  // }, [data]);

  return (
    <>
      {data.length > 0 ? (
        <div className="basic_infos">
          {/* Display Size */}
          {data.filter((data) => data.category.toUpperCase() === "DISPLAY")
            .length > 0 &&
            data
              .filter((data) => data.category.toUpperCase() === "DISPLAY")[0]
              .basic.filter(
                (data) => data.middle.toUpperCase() === "DISPLAY SIZE"
              ).length > 0 && (
              <p>
                Display Size: ----------{" "}
                <span>
                  {
                    data
                      .filter(
                        (data) => data.category.toUpperCase() === "DISPLAY"
                      )[0]
                      .basic.filter(
                        (data) => data.middle.toUpperCase() === "DISPLAY SIZE"
                      )[0].name
                  }
                </span>
              </p>
            )}

          {/* RAM MEMORY */}
          {data.filter((data) => data.category.toUpperCase() === "PLATFORM")
            .length > 0 &&
            data
              .filter((data) => data.category.toUpperCase() === "PLATFORM")[0]
              .basic.filter(
                (data) => data.middle.toUpperCase() === "RAM MEMORY"
              ).length > 0 && (
              <p>
                RAM Memory: --------{" "}
                <span>
                  {
                    data
                      .filter(
                        (data) => data.category.toUpperCase() === "PLATFORM"
                      )[0]
                      .basic.filter(
                        (data) => data.middle.toUpperCase() === "RAM MEMORY"
                      )[0].name
                  }
                </span>
              </p>
            )}

          {/* ROM MEMORY */}
          {data.filter((data) => data.category.toUpperCase() === "PLATFORM")
            .length > 0 &&
            data
              .filter((data) => data.category.toUpperCase() === "PLATFORM")[0]
              .basic.filter(
                (data) => data.middle.toUpperCase() === "ROM MEMORY"
              ).length > 0 && (
              <p>
                ROM Memory: --------{" "}
                <span>
                  {
                    data
                      .filter(
                        (data) => data.category.toUpperCase() === "PLATFORM"
                      )[0]
                      .basic.filter(
                        (data) => data.middle.toUpperCase() === "ROM MEMORY"
                      )[0].name
                  }
                </span>
              </p>
            )}

          {/* MAIN CAMERA */}
          {data.filter((data) => data.category.toUpperCase() === "CAMERA")
            .length > 0 &&
            data
              .filter((data) => data.category.toUpperCase() === "CAMERA")[0]
              .basic.filter(
                (data) => data.middle.toUpperCase() === "MAIN CAMERA"
              ).length > 0 && (
              <p>
                Main Camera: ---------{" "}
                <span>
                  {
                    data
                      .filter(
                        (data) => data.category.toUpperCase() === "CAMERA"
                      )[0]
                      .basic.filter(
                        (data) => data.middle.toUpperCase() === "MAIN CAMERA"
                      )[0].name
                  }
                </span>
              </p>
            )}

          {/* Display Size Class */}
          {data.filter((data) => data.category.toUpperCase() === "DISPLAY")
            .length > 0 &&
            data
              .filter((data) => data.category.toUpperCase() === "DISPLAY")[0]
              .basic.filter(
                (data) => data.middle.toUpperCase() === "DISPLAY SIZE CLASS"
              ).length > 0 && (
              <p>
                Display Size Class: ---------{" "}
                <span>
                  {
                    data
                      .filter(
                        (data) => data.category.toUpperCase() === "DISPLAY"
                      )[0]
                      .basic.filter(
                        (data) =>
                          data.middle.toUpperCase() === "DISPLAY SIZE CLASS"
                      )[0].name
                  }
                </span>
              </p>
            )}

          {/*RESOLUTION */}
          {data.filter((data) => data.category.toUpperCase() === "DISPLAY")
            .length > 0 &&
            data
              .filter((data) => data.category.toUpperCase() === "DISPLAY")[0]
              .basic.filter(
                (data) => data.middle.toUpperCase() === "RESOLUTION"
              ).length > 0 && (
              <p>
                Resolution: ---------{" "}
                <span>
                  {
                    data
                      .filter(
                        (data) => data.category.toUpperCase() === "DISPLAY"
                      )[0]
                      .basic.filter(
                        (data) => data.middle.toUpperCase() === "RESOLUTION"
                      )[0].name
                  }
                </span>
              </p>
            )}

          {/*OS */}
          {data.filter(
            (data) => data.category.toUpperCase() === "OPERATION SYSTEM OS"
          ).length > 0 &&
            data
              .filter(
                (data) => data.category.toUpperCase() === "OPERATION SYSTEM OS"
              )[0]
              .basic.filter((data) => data.middle.toUpperCase() === "OS")
              .length > 0 && (
              <p>
                OS: --------------------{" "}
                <span>
                  {
                    data
                      .filter(
                        (data) =>
                          data.category.toUpperCase() === "OPERATION SYSTEM OS"
                      )[0]
                      .basic.filter(
                        (data) => data.middle.toUpperCase() === "OS"
                      )[0].name
                  }
                </span>
              </p>
            )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default EachProductBasic;
