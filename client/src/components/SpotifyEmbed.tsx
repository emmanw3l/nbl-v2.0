import './paging.css'
interface SpotifyEmbedProps {
  url: string;
}

export default function SpotifyEmbed({ url }: SpotifyEmbedProps) {
  const embedUrl = url.replace("open.spotify.com/", "open.spotify.com/embed/");

  return (
    <div className="spotify-embed-wrapper">
      <iframe
        src={embedUrl}
        width="100%"
        style={{ border: "none", borderRadius: 12, display: "block" }}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}