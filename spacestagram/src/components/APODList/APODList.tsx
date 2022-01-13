import React from "react";
import { APODItem } from "../../types/global";
import APODCard from "./APODCard";

interface IProps {
  apodItems: APODItem[] | undefined;
}
const APODList: React.FC<IProps> = ({ apodItems }) => {
  return (
    <div className="APODList">
      {apodItems ? (
        apodItems.map((item) => {
          return <APODCard key={item.title} apodItem={item} />;
        })
      ) : (
        <p>No Image</p>
      )}
    </div>
  );
};

export default APODList;
