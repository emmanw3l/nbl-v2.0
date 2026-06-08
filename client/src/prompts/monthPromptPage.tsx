import Layout from "../Nav/Nav";
import "./promptpage.css"
import { allPrompts } from "./promptCollection";
import { motion } from "framer-motion";

type MonthPromptPageProps = {
  month: string;
  year: string;
};

export default function MonthPromptPage({ month, year }: MonthPromptPageProps) {
  const prompts = allPrompts.filter(
    (p) => p.month.toLowerCase() === month.toLowerCase() && p.year === year
  );

  return (
    <>
      <Layout />
      <motion.div className="container py-5">
        <h1 className="mb-4">
          {month} {year} Prompts
        </h1>

        {prompts.length === 0 ? (
          <p className="text-muted fst-italic">No prompts available for this month.</p>
        ) : (
          <div className="row g-4">
            {prompts.map((p) => (
              <motion.div
                key={p.id}
                className="col-md-6 col-lg-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="card shadow-sm p-4 h-100">
                  <h4>{p.title}</h4>
                  <p className="text-muted">{p.author}</p>
                  <div>{p.content.slice(0, 2)}</div>
                  <a
                    href={`/prompts/${year.toLowerCase()}${month.toLowerCase()}#${p.id}`}
                    className="btn btn-outline-dark btn-sm mt-3 w-100 rounded-3"
                  >
                    Read full prompt →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
}
