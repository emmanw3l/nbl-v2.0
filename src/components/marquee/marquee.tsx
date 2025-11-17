import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./marquee.css";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

const reviews = [
  { text: "Amazing community! Learned so much.", author: "Nwabueze Emmanuel" },
  { text: "The writing prompts revived my creativity!", author: "Aangrron" },
  {
    text: "Joining the community was the best decision I ever made",
    author: "Bema",
  },
  {
    text: "One of the best literary communities I've joined.",
    author: "Moroti",
  },
  { text: "I love how interactive everything is!", author: "Chika" },
];

export default function ReviewMarquee() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // <div className="review-wrapper d-inline-block d-flex">
    //   <h1 className=" mb-3">What The community members are saying!</h1>

    //   <Marquee pauseOnHover speed={50} gradient={false}>
    //     {reviews.map((review, i) => (
    //       <div className="review-card author-card" key={i}>

    //         <div className="review-avatar">
    //           {review.author[0].toUpperCase()}
    //         </div>

    //         <p className="review-text">“{review.text}”</p>

    //         {/* Author name links to profile */}
    //         <Link
    //           to={`/profile#${slugify(review.author)}`}
    //           className="review-author-link"
    //         >
    //           — {review.author}
    //         </Link>

    //       </div>
    //     ))}
    //   </Marquee>
    // </div>
    <div className="review-wrapper mb-5">
      {isMobile ? (
        // ⬇️ MOBILE VERSION — static column layout
        <div className="review-column">
          <h2 className="text-center mb-3">
            What the community members are saying
          </h2>
          {reviews.map((review, i) => (
            <div className="review-card author-card" key={i}>
              <div className="review-avatar">{review.author[0]}</div>
              <p className="review-text">“{review.text}”</p>
              <Link
                to={`/profile#${slugify(review.author)}`}
                className="review-author-link"
              >
                — {review.author}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        // ⬇️ DESKTOP VERSION — sliding marquee
        <div className="d-inline-block d-flex">
            <h1 className=" mb-3">What The community members are saying!</h1>
          <Marquee pauseOnHover speed={100} gradient={false}>
            {reviews.map((review, i) => (
              <div className="review-card author-card" key={i}>
                <div className="review-avatar">{review.author[0]}</div>
                <p className="review-text">“{review.text}”</p>
                <Link
                  to={`/profile#${slugify(review.author)}`}
                  className="review-author-link"
                >
                  — {review.author}
                </Link>
              </div>
            ))}
          </Marquee>
        </div>
      )}
    </div>
  );
}
