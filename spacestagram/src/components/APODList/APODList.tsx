import React from "react";
import { APODItem } from "../../types/global";
import APODCard from "./APODCard";

interface IProps {
  apodItems: APODItem[] | undefined;
}
const APODList: React.FC<IProps> = ({ apodItems }) => {
  return (
    <div>
      {apodItems ? (
        apodItems.map((item) => {
          return (
            <APODCard
              key={item.title}
              title={item.title}
              date={item.date}
              explanation={item.explanation}
              hdurl={item.hdurl}
              media_type={item.media_type}
              thumbnail_url={item.thumbnail_url}
              url={item.url}
            />
          );
        })
      ) : (
        <p>No image available at the moment</p>
      )}
    </div>
  );
};

export default APODList;
