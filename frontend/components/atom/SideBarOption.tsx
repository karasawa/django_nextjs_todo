import "../../styles/Icons.module.css";
import { FC } from "react";
import styled from "styled-components";

type Props = {
  text: string;
  //   Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  Icon: any;
  active: boolean;
  event?: () => void;
};

const SidebarOption: FC<Props> = ({ text, Icon, active, event }) => {
  return (
    <MainWrapper onClick={event}>
      <Icon />
      <H2Text>{text}</H2Text>
    </MainWrapper>
  );
};

export default SidebarOption;

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: color 0.15s ease-out;
  margin-left: 20px;
  &:hover {
    color: #50b7f5;
  }
`;

const H2Text = styled.h2`
  margin-left: 10px;
`;
