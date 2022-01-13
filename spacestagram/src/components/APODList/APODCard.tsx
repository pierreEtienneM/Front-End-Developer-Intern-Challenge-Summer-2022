import React from "react";
import "./APODCard.css";
import { MediaCard } from "@shopify/polaris";
import { APODItem } from "../../types/global";

interface IProps {
  apodItem: APODItem;
}
const APODCard: React.FC<IProps> = ({ apodItem }) => {
  return (
    <div className="Card-Container">
      <MediaCard
        title={apodItem.title}
        primaryAction={{
          content: "Like",
          onAction: () => {
            alert("yes");
          },
        }}
        description={apodItem.explanation}
      >
        <img
          width="100%"
          alt={apodItem.title}
          src={apodItem.hdurl}
        />
      </MediaCard>
    </div>
  );
};

export default APODCard;
