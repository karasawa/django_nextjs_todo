import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LogoutIcon from "@mui/icons-material/Logout";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styled from "styled-components";
import SidebarOption from "./atom/SideBarOption";
import Cookie from "universal-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import Dialog from "./Dialog";

const cookie = new Cookie();

const SideBar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logout = () => {
    cookie.remove("access_token");
    router.push("/auth");
  };

  return (
    <MainContainer className="sidebar">
      <SidebarOption
        text="ログアウト"
        Icon={LogoutIcon}
        active={false}
        event={logout}
      />
      <SidebarOption
        text="ホーム"
        Icon={HomeIcon}
        active={true}
        event={() => router.push("/")}
      />
      <SidebarOption text="話題を検索" Icon={SearchIcon} active={false} />
      <SidebarOption text="通知" Icon={NotificationsNoneIcon} active={false} />
      <SidebarOption text="メッセージ" Icon={MailOutlineIcon} active={false} />
      <SidebarOption
        text="ブックマーク"
        Icon={BookmarkBorderIcon}
        active={false}
      />
      <SidebarOption
        text="プロフィール"
        Icon={PermIdentityIcon}
        active={true}
      />
      <SidebarOption text="もっとみる" Icon={MoreHorizIcon} active={false} />
      <Button onClick={() => setOpen(true)}>TODOを追加する</Button>
      <Dialog open={open} setOpen={setOpen} />
    </MainContainer>
  );
};
export default SideBar;

const MainContainer = styled.div`
  border-right: 1px solid #e6ecf0;
  flex: 0.2;
  min-width: 250px;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Button = styled.button`
  background-color: #50b7f5;
  color: #fff;
  width: 100%;
  border-radius: 30px;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 8px;
  font-size: 15px;
  font-weight: bold;
`;
