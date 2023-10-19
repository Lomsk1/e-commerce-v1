import { ProductType } from "../../../../types/product";

interface PropTypes {
  thumbnail: ProductType["data"]["thumbnail"];
}

const ProductImageInfo: React.FC<PropTypes> = ({ thumbnail }) => {
  return (
    <>
      <div className="img_info">
        <div className="main_img_container">
          {thumbnail ? (
            <img src={thumbnail.url} alt="" />
          ) : (
            <img
              src={
                "https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg"
              }
              alt=""
            />
          )}
        </div>
        <div className="chosen">
          {/* {!eachProductIsLoading &&
                  eachProductData.images.map((img) => (
                    <div
                      key={img.id}
                      style={{
                        border: img.id === styleChecked && "1px solid black",
                        transition: img.id === styleChecked && "700ms",
                      }}
                    >
                      <label htmlFor={img.id}>
                        <img
                          src={
                            img.image &&
                            import.meta.env.VITE_APP_BASE_URL + img.image
                          }
                          alt=""
                        />
                      </label>
                      <input
                        type="radio"
                        name="images"
                        id={img.id}
                        onChange={() => {
                          setImageChecked(
                            `${import.meta.env.VITE_APP_BASE_URL + img.image}`
                          );
                          setStyleChecked(img.id);
                        }}
                      />
                    </div>
                  ))} */}
        </div>
      </div>
    </>
  );
};

export default ProductImageInfo;
