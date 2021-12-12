import React, { useMemo } from "react";
import { Image } from "antd";
import { IEvent } from "interfaces/event.interface";

type SoonEventCardCoverImageProps = {
  images: IEvent["images"];
};

export const SoonEventCardCoverImage: React.FC<SoonEventCardCoverImageProps> = ({
  images = [],
}) => {
  const imageSrc = useMemo<string>(() => {
    return images.length > 0 ? images[0].image.url : "";
  }, [images]);

  return imageSrc ? <Image preview={false} src={imageSrc} /> : null;
};
