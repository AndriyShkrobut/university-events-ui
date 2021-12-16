import React, { useMemo } from "react";
import { IEvent } from "interfaces/event.interface";
import { IEventImage } from "interfaces/event-image.interface";

import "./event-card-cover-image.less";

type SoonEventCardCoverImageProps = {
  images: IEvent["images"];
};

export const EventCardCoverImage: React.FC<SoonEventCardCoverImageProps> = ({ images = [] }) => {
  const imageForCover = useMemo<IEventImage | null>(() => {
    if (images.length === 0) return null;

    const [image] = images;

    return image;
  }, [images]);

  if (!imageForCover) {
    return null;
  }

  return (
    <img className={"event-card-cover-image"} src={imageForCover.image.url} alt={"Event Image"} />
  );
};
