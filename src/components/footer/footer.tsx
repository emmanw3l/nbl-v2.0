import "./footer.css";
import { MyLinks } from "../../assets/links/links";

export default function Footer() {
  return (
    <>
      <footer className="footer text-white  main-footer">
        <div className=" d-flex justify-content-between  py-3 ">
          <div className="col-md-4 d-flex align-items-center">
            <a href="#" className="me-2 text-white text-decoration-none">
              
              <span>&copy;NBL</span>
            </a>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex text-white">
            <li className="ms-3 ">
              <a
                className="text-white"
                href="https://x.com/emmanw3l"
                target="_blank"
              >
                <i className="bi bi-twitter"></i>
              </a>
            </li>
            <li className="ms-3">
              <a
                className="text-white"
                href={MyLinks.instagram}
                target="_blank"
              >
                <i className="bi bi-instagram"></i>
              </a>
            </li>
            <li className="ms-3">
              <a className="text-white" href="#">
                <i className="bi bi-whatsapp"></i>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
