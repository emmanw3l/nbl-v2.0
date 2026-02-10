import { motion } from "framer-motion";
import "./content.css";
import { Link } from "react-router-dom";
import InstagramPost from "../components/instagramEmbed";
import ReviewMarquee from "../components/marquee/marquee";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Content() {
  return (
    // <motion.div
    //   variants={pageVariants}
    //   initial="initial"
    //   animate="animate"
    //   exit="exit"
    //   transition={{ duration: 0.5 }}
    //   className="container-fluid">
    //     <h1 className="text-center"><u>About Us</u></h1>
    //   <div
    //     className="accordion mb-6"
    //     id="accordionFlushExample"
    //   >
    //     <div className="accordion-item">
    //       <h2 className="accordion-header">
    //         <button
    //           className="accordion-button collapsed"
    //           type="button"
    //           data-bs-toggle="collapse"
    //           data-bs-target="#flush-collapseOne"
    //           aria-expanded="false"
    //           aria-controls="flush-collapseOne"
    //         >
    //           Learning
    //         </button>
    //       </h2>
    //       <div
    //         id="flush-collapseOne"
    //         className="accordion-collapse collapse"
    //         data-bs-parent="#accordionFlushExample"
    //       >
    //         <div className="accordion-body">
    //           The core of anything involving storytelling,{" "}
    //           <abbr title="Naija Book Lovers" className="text-decoration-none">
    //             NBL
    //           </abbr>
    //           boasts a variety of characters that have had varying degrees of
    //           success in the field of writing and they occassionaly share their
    //           experiences, along with some dos and dont's. <br />
    //           Lectures are occassionaly being hosted too to educate the members
    //           on the platform about a multitude of different topics!{" "}
    //         </div>
    //       </div>
    //     </div>
    //     <div className="accordion-item">
    //       <h2 className="accordion-header">
    //         <button
    //           className="accordion-button collapsed"
    //           type="button"
    //           data-bs-toggle="collapse"
    //           data-bs-target="#flush-collapseTwo"
    //           aria-expanded="false"
    //           aria-controls="flush-collapseTwo"
    //         >
    //           Honouring
    //         </button>
    //       </h2>
    //       <div
    //         id="flush-collapseTwo"
    //         className="accordion-collapse collapse"
    //         data-bs-parent="#accordionFlushExample"
    //       >
    //         <div className="accordion-body">
    //           While this could mean a number of things, in reality it simply is
    //           a way for the community to reward/appreciate those that have shown
    //           the most growth in certain areas or been the best in a certain
    //           field. <br />
    //           While the criteria for who deserves the recognition may vary from
    //           time to time, one thing that remains constant is the ever-growing
    //           nature of the members of the community...
    //         </div>
    //       </div>
    //     </div>
    //     <div className="accordion-item">
    //       <h2 className="accordion-header">
    //         <button
    //           className="accordion-button collapsed"
    //           type="button"
    //           data-bs-toggle="collapse"
    //           data-bs-target="#flush-collapseThree"
    //           aria-expanded="false"
    //           aria-controls="flush-collapseThree"
    //         >
    //           writing opportunities
    //         </button>
    //       </h2>
    //       <div
    //         id="flush-collapseThree"
    //         className="accordion-collapse collapse"
    //         data-bs-parent="#accordionFlushExample"
    //       >
    //         <div className="accordion-body">
    //           This obviously speaks for itself in the fact that a writer is not
    //           truly a writer if all they ever do is think about what they want
    //           to write without putting pen to paper. And if there is one thing{" "}
    //           <abbr title="Naija Book Lovers" className="text-decoration-none">
    //             NBL
    //           </abbr>
    //           is good at, it's giving our members a way to grow, be it through{" "}
    //           <a href="/pages/prompts.html" className="text-black">
    //             prompts
    //           </a>
    //           or through other writing mediums, we always encourage people to
    //           write more and on diverse topics, to bring out the best in them.
    //         </div>
    //       </div>
    //     </div>
    //     <div className="accordion-item">
    //       <h2 className="accordion-header">
    //         <button
    //           className="accordion-button collapsed"
    //           type="button"
    //           data-bs-toggle="collapse"
    //           data-bs-target="#flush-collapseFour"
    //           aria-expanded="false"
    //           aria-controls="flush-collapseFour"
    //         >
    //           Learning
    //         </button>
    //       </h2>
    //       <div
    //         id="flush-collapseFour"
    //         className="accordion-collapse collapse"
    //         data-bs-parent="#accordionFlushExample"
    //       >
    //         <div className="accordion-body">
    //           <p>
    //             Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
    //             laboriosam ad rerum.
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    // </motion.div>
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="container-fluid py-4"
    >
      <h1 className="text-center ">
        <u>About Us</u>
      </h1>

      <div className="container-fluid mb-5">
        <span className="h4">Naija Book Lovers</span> is a community filled with
        creative minds constantly pushing themselves forward and testing the
        limits of their creativity as they engage in writing excercises, lectures, quizzes and other activities. <br />
        Some of the activities include <Link to="/mainPromptPage">Prompts:</Link> A monthly writing challenge where everyone is given a topic and told to write about it sometimes in a specific genre, but most times in any genre they're comfortable with. <br />
        Writing challlenges: This is very similar to the prompts but on a much smaller scale and usually in the form of friendly competition between two or more parties. <br />
        <Link to="/awards">Awards:</Link> This is very self-explanatory. At the end of the year, there are various categories to be nominated for and the best performer in that category gets the award. It's meant to incite competition and to congratulate standout performers. <br /><br />
        <h4 className="italics text-center">Preview of some of the best works over the years</h4>
        <InstagramPost url="https://www.instagram.com/p/DPgbNyQDbgm/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" maxWidth={375}/>
        


      </div>



      <ReviewMarquee/>
        <h1 className="mb-3 text-center"><u>Core NBL Tenets</u> </h1>

      <div
        className="about-accordion accordion gap-2"
        id="accordionFlushExample"
      >
        {[
          {
            title: "Learning",
            body: (
              <>
                The core of anything involving storytelling,{" "}
                <abbr
                  title="Naija Book Lovers"
                  className="text-decoration-none"
                >
                  NBL
                </abbr>{" "}
                boasts a variety of characters that have had varying degrees of
                success in the field of writing and they occasionally share
                their experiences, along with some dos and don'ts.
                <br />
                Lectures are occasionally hosted too, to educate the members on
                the platform about a multitude of different topics!
              </>
            ),
          },
          {
            title: "Honouring",
            body: (
              <>
                While this could mean a number of things, in reality it simply
                is a way for the community to reward or appreciate those who
                have shown the most growth in certain areas or excelled in a
                particular field.
                <br />
                While the criteria for recognition may vary from time to time,
                one thing remains constant — the ever-growing nature of our
                members.
              </>
            ),
          },
          {
            title: "Writing Opportunities",
            body: (
              <>
                A writer is not truly a writer if all they ever do is think
                about what to write without putting pen to paper.{" "}
                <abbr
                  title="Naija Book Lovers"
                  className="text-decoration-none"
                >
                  NBL
                </abbr>{" "}
                gives our members avenues to grow — through{" "}
                <Link to="/mainPromptPage" className="text-white">
                  prompts
                </Link>{" "}
                and other creative mediums. We always encourage people to write
                more and on diverse topics to bring out the best in them.
              </>
            ),
          },
          {
            title: "Community & Growth",
            body: (
              <>
                72,000 lines of code and counting... <br />
                Buy me mental health
              </>
            ),
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="accordion-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#flush-collapse${index}`}
                aria-expanded="false"
                aria-controls={`flush-collapse${index}`}
              >
                {item.title}
              </button>
            </h2>
            <div
              id={`flush-collapse${index}`}
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">{item.body}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
