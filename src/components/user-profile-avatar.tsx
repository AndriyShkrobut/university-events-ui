import React, { useMemo } from "react";
import { IUser } from "../interfaces/user.interface";
import { Avatar, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";

type UserProfileAvatarProps = {
  user: IUser;
};

const UserProfileAvatar: React.FC<UserProfileAvatarProps> = ({ user }) => {
  const avatarSrc = useMemo(() => {
    if (!user || !user.image || !user.image.url) {
      return "";
    }

    return user.image.url;
  }, [user]);

  const userFullName = useMemo(() => {
    if (!user) return "";

    return `${user.name} ${user.surname}`;
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <React.Fragment>
      <Tooltip title={userFullName}>
        <Avatar icon={<UserOutlined />} src={avatarSrc} />
      </Tooltip>{" "}
      {userFullName}
    </React.Fragment>
  );
};

export default UserProfileAvatar;
