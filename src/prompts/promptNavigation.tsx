import { Link, useLocation } from "react-router-dom";
import { promptMonthOrder } from "./monthOrder";

export default function PromptNavigation() {
  const location = useLocation();

  const normalize = (p: string) => p.replace(/\/$/, "");

  const index = promptMonthOrder.findIndex(
    (m) => normalize(m.path) === normalize(location.pathname)
  );

  if (index === -1) {
    console.warn("PromptNavigation: no match for", location.pathname);
    return null;
  }

  const prev = promptMonthOrder[index - 1];
  const next = promptMonthOrder[index + 1];

  return (
    <div className="d-flex justify-content-between my-5">
      {prev ? (
        <Link to={prev.path} className="btn btn-dark ">
          ← {prev.label}
        </Link>
      ) : <span />}

      {next ? (
        <Link to={next.path} className="btn btn-dark">
          {next.label} →
        </Link>
      ) : <span />}
    </div>
  );
}
