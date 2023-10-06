import ProductLongContainer from "../product_container";

function ProductSlideContainer({ data}) {
  return (
    <>
      <section className="product_slide_container">
        {data &&
          data.map((data) => (
            <ProductLongContainer
              data={data}
              thumbnail={data.thumbnail}
              title={data.title}
              category={data.category}
              price={data.price}
              new_price={data.new_price}
              new_item={data.new}
              sale={data.sale}
              key={data.id}
              id={data.id}
              style={{
                margin: "1em",
              }}
            />
          ))}
      </section>
    </>
  );
}

export default ProductSlideContainer;
