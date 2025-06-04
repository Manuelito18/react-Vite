import { useState } from "react";

function XFollowCard({ children, username = "desconocido",meSigue}) {
  const [isFollowing, setIsFollowing] = useState(meSigue);
  const text = isFollowing ? "Siguiendo" : "Seguir";
  const butonClassName = isFollowing
    ? "x-follow-card-button is-following"
    : "x-follow-card-button";

  const handleClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <article className="x-folllow-card">
      <header className="x-folllow-card-header-header">
        <img
          className="x-folllow-card-header-avatar"
          src={`https://unavatar.io/${username}`}
          alt="avatar"
        />
        <div className="x-folllow-card-header-info">
          <strong>{children}</strong>
          <span className="x-follow-card-info-username">@{username}</span>
        </div>
      </header>

      <aside>
        <button className={butonClassName} onClick={handleClick}>
          {text}
        </button>
      </aside>
    </article>
  );
}

export default XFollowCard;
