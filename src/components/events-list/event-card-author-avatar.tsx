import React, { useMemo } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";

import { IEvent } from "interfaces/event.interface";

type SoonEventCardAuthorAvatarProps = {
  author: IEvent["author"];
};

export const EventCardAuthorAvatar: React.FC<SoonEventCardAuthorAvatarProps> = ({
  author = {},
}) => {
  const avatarSrc = useMemo<string>(() => {
    if (!author.image || !author.image.url) return "";

    return author.image.url;
  }, [author.image]);

  if (!avatarSrc) {
    return <UserOutlined />;
  }

  return (
    <Tooltip title={`${author.name} ${author.surname}`}>
      <Avatar src={avatarSrc} alt={`${author.name} ${author.surname}`} icon={<UserOutlined />} />
    </Tooltip>
  );
};
