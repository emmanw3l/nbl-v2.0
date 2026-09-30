interface SpotifyEmbedProps {
  url: string;
}

export default function SpotifyEmbed({ url }: SpotifyEmbedProps) {
  const embedUrl = url.replace("open.spotify.com/", "open.spotify.com/embed/");

  return (
    <iframe
      src={embedUrl}
      width="100%"
      height="152"
      style={{ border: "none", borderRadius: 12 }}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}