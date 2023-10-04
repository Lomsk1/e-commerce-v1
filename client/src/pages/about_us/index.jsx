import Footer from "../../components/footer";
import HeadingInformation from "../../components/heading_info";
import Navigation from "../../components/navigation";

function AboutUs() {
  return (
    <>
      <HeadingInformation />
      <Navigation />

      <section className="about_us_section">
        <div className="title">
          <h1>About Us</h1>
          <p>Two years history of development</p>
        </div>

        <div className="img_container">
          <img
            src="https://www.governor.pa.gov/wp-content/uploads/2016/08/wine-store.jpg"
            alt=""
          />
        </div>

        <div className="text_container">
          <h2>Zapp is a multidisciplinary shop.</h2>
          <p>
            We work together to sell, create and produce products that we are
            proud of for folks that we believe in. We are available for hire in
            a wide range of creative disciplines for a variety of jobs.
          </p>
        </div>

        <div className="gallery_container">
          <div className="item1">
            <div>
              <img
                src="https://media.istockphoto.com/id/1225371296/photo/empty-road-through-the-volcanic-field.jpg?s=612x612&w=0&k=20&c=OPDpYVFGg6JZ99V6yB2Y5ityfzYMy6QdfKz6E8-c3Wo="
                alt=""
              />
            </div>
            <div>
              <img
                src="https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712__340.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="item2">
            <div>
              <img
                src="https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://st2.depositphotos.com/2550635/9213/i/450/depositphotos_92136826-stock-photo-young-sportsman-shadowing-his-eyes.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1414870558258-f8011201d0f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHw%3D&w=1000&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1471879832106-c7ab9e0cee23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="history">
          <div className="h_title">
            <h1>History</h1>
          </div>

          <div className="text">
            <p>
              In the winter of 2011, while serving as working members at ADX,
              Portland’s Makerspace, Zach and Josh met and became friends,
              sharing a love of art, punk, and burritos. With the help of their
              friends at ADX, they formed Band, a diverse, draw-it-by-hand,
              make-it-from-scratch, do-it-together creative studio, in a room
              they built above the shop’s kitchen.
            </p>
            <p>
              In the years since, Band has worked on a wide array of unique
              projects with some of the best people from the Pacific Northwest
              and beyond. We strive to keep our work unique and smart, with room
              for a little magic. You can find us anywhere, and if the project
              is the right fit, we’d love to work with you. Feel free to drop us
              a line, here.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default AboutUs;
