// import PagedText from "../components/paging";
// // import { prompts } from "./januaryPrompts";
// import { promptIndex } from "../components/promptIndexing";

// const prompt = promptIndex([0, 1])

// export default function PoemViewer() {
//   return (
//     <div>
//       <h2>Poem: A Dream</h2>
//       <PagedText text={prompt.promptIndex} wordsPerPage={20} />
//     </div>
//   );
// }

// import PagedText from "../components/paging";
// import { promptIndex } from "../components/promptIndexing";

// const prompts = promptIndex([0, 1, 2, 3]); // returns array of poems

// export default function PoemViewer() {
//   return (
//     <div>
//       {prompts.map((poem) => (
//         <div key={poem.id}>
//           <h2>Poem: {poem.title}</h2>
//           <PagedText text={poem.content} wordsPerPage={70} />
//         </div>
//       ))}
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import PagedText from "../components/paging";
import {
  promptIndex,
  promptIndexFeb,
  promptIndexApril,
  promptIndexMJ,
  promptIndexJuly,
  promptIndexSeptember,
  promptIndexoctober2024,
} from "../components/promptIndexing";
import "./promptpage.css";
import { motion } from "framer-motion";

const januaryPrompts = promptIndex([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
const februaryPrompts = promptIndexFeb([
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
]);
const aprilPrompts = promptIndexApril([0, 1, 2, 3, 4, 5, 6]);
const MJPrompts = promptIndexMJ([0, 1, 2, 3, 4]);
const julyPrompts = promptIndexJuly([0, 1, 2, 3, 4, 5]);
const septemberPrompts = promptIndexSeptember([0, 1, 2, 3, 4, 5, 6, 7]);

// 2024
const octoberPrompts2024 = promptIndexoctober2024([0, 1, 2, 3, 4]);

// ✅ consistent slugify
function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export default function PromptViewer() {
  return (
    <div className="page-container py-4">
      <div className="row justify-content-evenly">
        {januaryPrompts.map((prompts) => (
          <motion.div
            key={prompts.id}
            className="mb-4 card col-md-5 col-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            id={`january-${slugify(prompts.id.toString())}`}
          >
            <h1 className="bold">{prompts.title}</h1>
            <h4>{prompts.title1}</h4>
            <h4 className="text-end blockquote">
              <cite className="blockquote-footer">
                <Link to={`/Profile#${slugify(prompts.author)}`}>
                  {prompts.author}
                </Link>
              </cite>
            </h4>
            <PagedText paragraphs={prompts.content} paragraphsPerPage={6} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function PromptViewerFeb() {
  return (
    <div className="page-container py-4">
      <div className="row justify-content-evenly">
        {februaryPrompts.map((prompts) => (
          <motion.div
            key={prompts.id}
            className="mb-4 card col-md-5 col-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            id={`february-${slugify(prompts.id.toString())}`}
          >
            <h1 className="bold">{prompts.title}</h1>
            {/* <h4>{prompts.title1}</h4> */}
            <h4 className="text-end blockquote">
              <cite className="blockquote-footer">
                <Link to={`/Profile#${slugify(prompts.author)}`}>
                  {prompts.author}
                </Link>
              </cite>
            </h4>
            <PagedText paragraphs={prompts.content} paragraphsPerPage={6} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function PromptViewerApril() {
  return (
    <div className="page-container py-4">
      <div className="row justify-content-evenly">
        {aprilPrompts.map((prompts) => (
          <motion.div
            key={prompts.id}
            className="mb-4 card col-md-5 col-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            id={`april-${slugify(prompts.id.toString())}`}
          >
            <h1 className="bold">{prompts.title}</h1>
            <h4>{prompts.title1}</h4>
            <h4 className="text-end blockquote">
              <cite className="blockquote-footer">
                <Link to={`/Profile#${slugify(prompts.author)}`}>
                  {prompts.author}
                </Link>
              </cite>
            </h4>
            <PagedText paragraphs={prompts.content} paragraphsPerPage={6} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function PromptViewerMJ() {
  return (
    <div className="page-container py-4">
      <div className="row justify-content-evenly">
        {MJPrompts.map((prompts) => (
          <div
            key={prompts.id}
            className="mb-4 card col-md-5 col-10"
            id={`mj-${slugify(prompts.id.toString())}`}
          >
            <h1 className="bold">{prompts.title}</h1>
            {/* <h4>{prompts.title1}</h4> */}
            <h4 className="text-end blockquote">
              <cite className="blockquote-footer">
                <Link to={`/Profile#${slugify(prompts.author)}`}>
                  {prompts.author}
                </Link>
              </cite>
            </h4>
            <PagedText paragraphs={prompts.content} paragraphsPerPage={6} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PromptViewerJuly() {
  return (
    <div className="page-container py-4">
      <div className="row justify-content-evenly">
        {julyPrompts.map((prompts) => (
          <div
            key={prompts.id}
            className="mb-4 card col-md-5 col-10"
            id={`july-${slugify(prompts.id.toString())}`}
          >
            <h1 className="bold">{prompts.title}</h1>
            {/* <h4>{prompts.title1}</h4> */}
            <h4 className="text-end blockquote">
              <cite className="blockquote-footer">
                <Link to={`/Profile#${slugify(prompts.author)}`}>
                  {prompts.author}
                </Link>
              </cite>
            </h4>
            <PagedText paragraphs={prompts.content} paragraphsPerPage={6} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PromptViewerSeptember() {
  return (
    <div className="page-container py-4">
      <div className="row justify-content-evenly">
        {septemberPrompts.map((prompts) => (
          <motion.div
            key={prompts.id}
            className="mb-4 card col-md-5 col-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            id={`september-${slugify(prompts.id.toString())}`}
          >
            <h1 className="bold">{prompts.title}</h1>
            {/* <h4>{prompts.title1}</h4> */}
            <h4 className="text-end blockquote">
              <cite className="blockquote-footer">
                <Link to={`/Profile#${slugify(prompts.author)}`}>
                  {prompts.author}
                </Link>
              </cite>
            </h4>
            <PagedText paragraphs={prompts.content} paragraphsPerPage={6} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 2024 PROMPTS

export function PromptViewerOctober2024() {
  return (
    <div className="page-container py-4">
      <div className="row justify-content-evenly">
        {octoberPrompts2024.map((prompts) => (
          <motion.div
            key={prompts.id}
            className="mb-4 card col-md-5 col-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            id={`october-${slugify(prompts.id.toString())}`}
          >
            <h1 className="bold">{prompts.title}</h1>
            {/* <h4>{prompts.title1}</h4> */}
            <h4 className="text-end blockquote">
              <cite className="blockquote-footer">
                <Link to={`/Profile#${slugify(prompts.author)}`}>
                  {prompts.author}
                </Link>
              </cite>
            </h4>
            <PagedText paragraphs={prompts.content} paragraphsPerPage={6} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
