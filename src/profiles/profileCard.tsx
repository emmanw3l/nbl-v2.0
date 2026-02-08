import React from "react";

interface ProfileCardProps {
  imageSrc: string;
  title: string;
  text: string;
  linkUrl?: string;
  linkLabel?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  imageSrc,
  title,
  text,
  linkUrl,
  linkLabel
}) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={imageSrc} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
        {linkUrl && linkLabel && (
          <a href={linkUrl} className="btn btn-primary">
            {linkLabel}
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
