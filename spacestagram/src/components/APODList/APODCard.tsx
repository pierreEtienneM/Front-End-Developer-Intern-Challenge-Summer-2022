import React, { useState } from "react";
import "./APODCard.css";
import { MediaCard, VideoThumbnail } from "@shopify/polaris";
import { APODItem } from "../../types/global";

interface IProps {
  apodItem: APODItem;
}

const APODCard: React.FC<IProps> = ({ apodItem }) => {
  const openVideoInNewTab = (url?: string): void => {
    window.open(url, "_blank");
  };

  const [like, setLike] = useState<boolean>(
    window.localStorage.getItem("like") === "true"
  );

  const handleLike = (): void => {
    setLike(!like);
    window.localStorage.setItem("like", `${!like}`);
  };
  return (
    <div className="Card-Container">
      <MediaCard
        title={apodItem.title + " (" + apodItem.date + ")"}
        portrait={true}
        primaryAction={{
          content: like ? "Liked" : "Like",
          onAction: () => {
            handleLike();
          },
        }}
        description={apodItem.explanation}
      >
        {apodItem.media_type === "image" ? (
          <img width="100%" alt={apodItem.title} src={apodItem.hdurl} />
        ) : (
          <VideoThumbnail
            thumbnailUrl={
              apodItem.thumbnail_url
                ? apodItem.thumbnail_url
                : "https://img.youtube.com/vi/"
            }
            onClick={() => openVideoInNewTab(apodItem.url)}
          />
        )}
      </MediaCard>
    </div>
  );
};

export default APODCard;
