import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

interface Award {
  id: number;
  title: string;
  category: string;
  description: string;
  nominees: string[];
  winner: string[];
  year: number;
}



export default function AwardsPage() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/awards`)
      .then((r) => r.json())
      .then((d) => setAwards(d.awards))
      .finally(() => setLoading(false));
  }, []);

  

  const years = [...new Set(awards.map((a) => a.year))]
    .sort((a, b) => b - a);

  if (loading) {
    return <p>Loading awards...</p>;
  }

  return (
    <section className="container py-5">
      <h1 className="display-4 mb-5 text-center">
        NBL Awards
      </h1>

      {years.map((year) => (
        <div key={year} className="mb-5">
          <h2 className="border-bottom pb-2 mb-4">
            {year}
          </h2>

          <div className="row g-4">
            {awards
              .filter((award) => award.year === year)
              .map((award) => (
                <div
                  key={award.id}
                  className="col-md-6 col-lg-4"
                >
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <p className="text-muted small mb-2">
                        {award.category}
                      </p>

                      <h5 className="card-title">
                        {award.title}
                      </h5>

                      {award.description && (
                        <p className="card-text">
                          {award.description}
                        </p>
                      )}

                      <hr />

                      <h6>Winner</h6>

                      {award.winner.map((winner) => (
                        <div
                          key={winner}
                          className="fw-bold text-success"
                        >
                          🏆 {winner}
                        </div>
                      ))}

                      {award.nominees.length > 0 && (
                        <>
                          <h6 className="mt-3">
                            Nominees
                          </h6>

                          <ul className="mb-0">
                            {award.nominees.map((nominee) => (
                              <li key={nominee}>
                                {nominee}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </section>
  );
}