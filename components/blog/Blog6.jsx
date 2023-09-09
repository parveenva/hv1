import Link from "next/link";
import blogContent from "../../data/blogs";
import ContactUs from "../common/form/contactus/ContactUs";

const Blog6 = () => {


  

  return (
    <>
      {blogContent.slice(0, 6).map((item) => (
        <div className="news-block col-lg-6 col-md-6 col-sm-12" key={item.id}>
          <div className="inner-box">
            <div className="image-box">
              <figure className="image">
                <img src={item.img} alt="blog post" />
              </figure>
            </div>
            {/* End image-box */}

            <div className="lower-content">
   
            <div className="post-meta" style={{ display: 'flex', alignItems: 'center' }}>
  <div className="course-duration">Duration: {item.duration}</div>
  <div className="star-rating" style={{ marginLeft: '20px' }}>
  <input type="radio" id="star5" name="rating" value="5" />
    <label htmlFor="star5">&#9733;</label>
    <input type="radio" id="star4" name="rating" value="4" />
    <label htmlFor="star4">&#9733;</label>
    <input type="radio" id="star3" name="rating" value="3" />
    <label htmlFor="star3">&#9733;</label>
    <input type="radio" id="star2" name="rating" value="2" />
    <label htmlFor="star2">&#9733;</label>
    <input type="radio" id="star1" name="rating" value="1" />
    <label htmlFor="star1">&#9733;</label>
  </div>
</div>

   
   
              {/* End post meta */}

              <h3>
                {item.title}
              </h3>

              <div className="post-content">
  <ul>
    {item.blogText
      .split(/\n\s*- /) // Split the text into bullet points
      .filter(point => point) // Remove empty points
      .map((point, index) => (
        <li key={index}>
                        <i className="fas fa-check"></i> {point}

           </li>
      ))}
  </ul>
</div>

   
<Link href="#"              
          className="theme-btn btn-style-one call-modal"
          data-bs-toggle="modal"
          data-bs-target="#contactUsModal"
          data-bs-backdrop="static" // or data-bs-backdrop="true"

       >
Request a Callback to know more..          </Link>

           <ContactUs/>
  
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Blog6;
