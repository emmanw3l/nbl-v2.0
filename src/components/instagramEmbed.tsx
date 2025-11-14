// import { InstagramEmbed } from "react-social-media-embed";

// export default function IgEmbed() {
//   return (
//     <div className="container d-flex">
//       <InstagramEmbed
//         url="https://www.instagram.com/p/DPgbNyQDbgm/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
//         // width={280}
//         style={{
//           background: "black",
//           width: "fit-content",
//           height: "570px",
//           margin: "auto",
//         }}
//       />
//       <InstagramEmbed
//         url="https://www.instagram.com/p/DJhaQtdNA9L/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
//         style={{
//           background: "",
//           width: "fit-content",
//           height: "570px",
//           margin: "auto",
//         }}
//       />
//     </div>
//   );
// }


import React from "react";
import { InstagramEmbed } from "react-social-media-embed";

interface InstagramPostProps {
  url: string;
  maxWidth?: number | string;
}

const InstagramPost: React.FC<InstagramPostProps> = ({ url, maxWidth = 500 }) => {
  return (
    <div style={{ width: "100%", maxWidth, margin: "0 auto" }}>
      <InstagramEmbed url={url} width="100%" />
    </div>
  );
};

export default InstagramPost;
