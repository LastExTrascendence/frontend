"use client";

import styled from "styled-components";
import PillButton from "@/ui/pill-button";
import { useState } from "react";

export default function UserStatusSetting() {
  const [selectedButton, setSelectedButton] = useState("Disabled");
  const [changeNick, setChangeNick] = useState("NickName");

  const handleChangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeNick(e.target.value);
  };

  const User2FAButton: React.FC<User2FAButtonProps> = ({
    onClick,
    selected,
    children,
  }) => {
    return (
      <StyledButton onClick={onClick} selected={selected}>
        {children}
      </StyledButton>
    );
  };
  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  return (
    <UserSettingContainer>
      <UserSettingRow>
        <UserSettingColumn>
          <UserSettingLabel>NickName</UserSettingLabel>
          <UserSettingNickField value={handleChangeChange} type="text" />
        </UserSettingColumn>
        <PillButton
          text="Save"
          fontWeight="800"
          theme="purple"
          onClick={() => {}}
          width="192px"
          height="60px"
        ></PillButton>
      </UserSettingRow>

      <UserSettingRow>
        <UserSettingColumn>
          <UserSettingLabel>Avatar</UserSettingLabel>
          <UserSettingColumn isHorizontal={true}>
            <UserButtonContainer>
              <PillButton
                text="Change Avatar"
                fontWeight="400"
                theme="purple"
                onClick={() => {}}
                width="252px"
                height="72px"
              ></PillButton>
              <PillButton
                text="Remove Avatar"
                fontWeight="400"
                theme="purple"
                onClick={() => {}}
                width="252px"
                height="72px"
              ></PillButton>
            </UserButtonContainer>
          </UserSettingColumn>
        </UserSettingColumn>
      </UserSettingRow>

      <UserSettingRow>
        <UserSettingColumn>
          <UserSettingLabel>Status message</UserSettingLabel>
          <UserSettingStatusMessage type="text" />
        </UserSettingColumn>
      </UserSettingRow>

      <UserSettingRow>
        <UserSettingColumn>
          <UserSettingLabel>2FA Enabled</UserSettingLabel>
          <UserSettingColumn isHorizontal={true}>
            <User2FAButton
              onClick={() => handleButtonClick("Enabled")}
              selected={selectedButton === "Enabled"}
            >
              Enabled
            </User2FAButton>
            <User2FAButton
              onClick={() => handleButtonClick("Disabled")}
              selected={selectedButton === "Disabled"}
            >
              Disabled
            </User2FAButton>
          </UserSettingColumn>
        </UserSettingColumn>
      </UserSettingRow>
    </UserSettingContainer>
  );
}

interface User2FAButtonProps {
  onClick: () => void;
  selected: boolean;
  children: React.ReactNode;
}

const UserButtonContainer = styled.div`
  width: 600px;
  display: flex;
  justify-content: space-around;
`;

const UserSettingColumn = styled.div<{ isHorizontal: boolean }>`
  display: flex;
  flex-direction: ${(props: any) => (props.isHorizontal ? "row" : "column")};
  /* align-items: center; */
`;

const StyledButton = styled.button<{ selected: boolean }>`
  border-radius: 15px;
  width: 95px;
  height: 50px;
  flex-shrink: 0;
  color: #fff;
  font-family: "Noto Sans KR";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background-color: ${(props) => (props.selected ? "#827BAF" : "#313338")};
  padding: 10px;
  margin: 5px;
  cursor: pointer;
`;

const UserSettingRow = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  /* margin-bottom: 50px; */
`;

const UserSettingContainer = styled.div`
  height: 95%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 38px 39px 0px 59px;
`;

const UserSettingLabel = styled.div`
  color: #fff;
  font-family: Noto Sans KR;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 30px;
`;

const UserSettingNickName = styled.div`
  color: #fff;
  font-family: Noto Sans KR;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const UserSettingNickField = styled.input`
  line-height: normal;
  font-weight: 400;
  font-family: Noto Sans KR;
  font-size: 32px;
  font-style: normal;
  color: #fff;
  border-radius: 20px;
  background: #313338;
  width: 390px;
  height: 100px;
  flex-shrink: 0;
`;

const UserSettingStatusMessage = styled.input`
  line-height: normal;
  font-weight: 400;
  font-family: Noto Sans KR;
  font-size: 32px;
  font-style: normal;
  color: #fff;
  border-radius: 20px;
  background: #313338;
  width: 600px;
  height: 100px;
  flex-shrink: 0;
`;
