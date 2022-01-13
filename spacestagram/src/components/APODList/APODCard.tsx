import React, { useState } from "react";
import "./APODCard.css";
import { MediaCard, VideoThumbnail } from "@shopify/polaris";
import { APODItem } from "../../types/global";

const APODCard: React.FC<APODItem> = ({
  title,
  date,
  explanation,
  hdurl,
  media_type,
  thumbnail_url,
  url,
}) => {
  const openVideoInNewTab = (url?: string): void => {
    window.open(url, "_blank");
  };

  const [like, setLike] = useState<boolean>(
    window.localStorage.getItem(title + "_like") === "true"
  );

  const copyToClipboard = (url?: string): void => {
    navigator.clipboard.writeText(url!);
  }

  const handleLike = (): void => {
    setLike(!like);
    window.localStorage.setItem(title + "_like", `${!like}`);
  };
  return (
    <div className="Card-Container">
      <MediaCard
        title={title + " (" + date + ")"}
        portrait={true}
        primaryAction={{
          content: like ? "Liked" : "Like",
          onAction: () => {
            handleLike();
          },
        }}
        secondaryAction={{
          content: "Copy",
          onAction: () => {
            copyToClipboard(hdurl ? hdurl : url);
          },
        }}
        description={explanation}
      >
        {media_type === "image" ? (
          <img width="100%" alt={title} src={hdurl} />
        ) : (
          <VideoThumbnail
            thumbnailUrl={
              thumbnail_url ? thumbnail_url : "https://img.youtube.com/vi/"
            }
            onClick={() => openVideoInNewTab(url)}
          />
        )}
      </MediaCard>
    </div>
  );
};

export default APODCard;
