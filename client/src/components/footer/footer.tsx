import { motion } from "framer-motion";
import "./footer.css";
import { Link } from "react-router-dom";
import { MyLinks } from "../../assets/links/links";
import wattpad from "../../assets/icons/wattpad.svg";
import instagram from "../../assets/icons/instagram.svg";
import email from "../../assets/icons/emails.svg";

export default function Footer() {
  return (
    // <motion.div className=" ">

    //   <div className=" d-flex justify-content-between  py-3 ">
    //     <div className="col-md-4 d-flex align-items-center">
    //       <a href="#" className="me-2 text-white text-decoration-none">

    //         <span>&copy;NBL</span>
    //       </a>
    //     </div>

    //     <ul className="nav col-md-4 justify-content-end list-unstyled d-flex text-white">
    //       <li className="ms-3 ">
    //         <a
    //           className="text-white"
    //           href="https://x.com/emmanw3l"
    //           target="_blank"
    //         >
    //           <i className="bi bi-twitter"></i>
    //         </a>
    //       </li>
    //       <li className="ms-3">
    //         <a
    //           className="text-white"
    //           href={MyLinks.instagram}
    //           target="_blank"
    //         >
    //           <i className="bi bi-instagram"></i>
    //         </a>
    //       </li>
    //       <li className="ms-3">
    //         <a className="text-white" href="#">
    //           <i className="bi bi-whatsapp"></i>
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    // </motion.div>

    <footer className="footers text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* About Section */}
          <motion.div
            className="col-md-4 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="fw-bold social-header nbl">NBL</h1>
            <p className="">
              Bringing out the writer in you.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="col-md-4 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="fw-bold social-header">Quick Links</h3>
            <ul className="list-unstyled listing text-center fw-bolder h5">
              <li>
                <Link
                  to="/mainPromptPage"
                  className="text-decoration-none text-light"
                >
                  Prompts
                </Link>
              </li>
              <li>
                <Link to="/Profile" className="text-decoration-none text-light">
                  Profiles
                </Link>
              </li>
              <li>
                <Link to="/awards" className="text-decoration-none text-light">
                  Awards
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            className="col-md-4 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="fw-bold social-header">Get in Touch</h3>
            <ul className="list-unstyled d-flex gap-3 justify-content-center ">
              <li>
                <a href={MyLinks.instagram} className="social-link">
                  <img src={instagram} alt="instagram" />
                </a>
              </li>
              <li>
                <a href={MyLinks.wattpad} className="social-link ">
                  <img src={wattpad} alt="Wattpad" />
                </a>
              </li>
              <li>
                <a href={MyLinks.email} className="social-link">
                  <img src={email} alt="email" />
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom copyright */}
        <motion.div
          className="text-center border-top border-secondary pt-3 mt-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="marquee">
            <p>
              &copy; {new Date().getFullYear()} NAIJA BOOK LOVERS. All rights
              reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
