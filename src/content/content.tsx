import "./content.css";

export default function Content() {
  return (
    <>
      <div
        className="accordion accordion-flush mb-6"
        id="accordionFlushExample"
      >
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Learning
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              The core of anything involving storytelling,{" "}
              <abbr title="Naija Book Lovers" className="text-decoration-none">
                NBL
              </abbr>
              boasts a variety of characters that have had varying degrees of
              success in the field of writing and they occassionaly share their
              experiences, along with some dos and dont's. <br />
              Lectures are occassionaly being hosted too to educate the members
              on the platform about a multitude of different topics!{" "}
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              Honouring
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              While this could mean a number of things, in reality it simply is
              a way for the community to reward/appreciate those that have shown
              the most growth in certain areas or been the best in a certain
              field. <br />
              While the criteria for who deserves the recognition may vary from
              time to time, one thing that remains constant is the ever-growing
              nature of the members of the community...
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              writing opportunities
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              This obviously speaks for itself in the fact that a writer is not
              truly a writer if all they ever do is think about what they want
              to write without putting pen to paper. And if there is one thing{" "}
              <abbr title="Naija Book Lovers" className="text-decoration-none">
                NBL
              </abbr>
              is good at, it's giving our members a way to grow, be it through{" "}
              <a href="/pages/prompts.html" className="text-black">
                prompts
              </a>
              or through other writing mediums, we always encourage people to
              write more and on diverse topics, to bring out the best in them.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseFour"
              aria-expanded="false"
              aria-controls="flush-collapseFour"
            >
              Learning
            </button>
          </h2>
          <div
            id="flush-collapseFour"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                laboriosam ad rerum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
