import './paging.css'
import { useState } from 'react';
interface SpotifyEmbedProps {
  url: string | null;
}

export default function SpotifyEmbed({ url }: SpotifyEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const embedUrl = url?.replace("open.spotify.com/", "open.spotify.com/embed/");

  return (
    <div className="spotify-embed-wrapper" style={{ position: "relative" }}>
      {!loaded && (
        <div className="spotify-embed-skeleton">
          <div className="spotify-embed-spinner" />
          <span>Loading track…</span>
        </div>
      )}

      <iframe
        src={embedUrl}
        width="100%"
        style={{
          border: "none",
          borderRadius: 12,
          display: loaded ? "block" : "none",
        }}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}