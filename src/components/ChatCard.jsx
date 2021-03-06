import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Flex, Image, Text } from "../elements";
import { changeTime } from "../shared/utils";
import theme from "../styles/theme";

const ChatCard = ({ room, onClick }) => {
  const { user } = useSelector((state) => state.user);

  const target =
    room?.targetUser?.userId === user?.userId
      ? room.createUser
      : room.targetUser;
  return (
    <Flex jc="space-between" margin="16px 24px" onClick={onClick}>
      <Flex>
        <Flex margin="0 14px 0 0 ">
          <Image circle size={50} src={target?.profileImage} />
          {room?.newMessage > 0 && (
            <ReceiveMsg>
              <p style={{ fontSize: "10px" }}>{room?.newMessage || null}</p>
            </ReceiveMsg>
          )}
        </Flex>
        <Flex fd="column" margin="0 5px" jc="flex-start" ai="flex-start">
          <Flex>
            <Text>{target?.nickname || "닉네임"}</Text> &nbsp;
            <Text body3>{room?.lastTime && changeTime(room?.lastTime)}</Text>
          </Flex>
          <Flex>
            {room?.lastMessage ? (
              room.lastMessage.length > 30 ? (
                <Text body3>{room.lastMessage.substring(0, 12) + "..."}</Text>
              ) : (
                <Text body3>{room.lastMessage}</Text>
              )
            ) : (
              <Text body3>대화를 먼저 시작해보세요!</Text>
            )}
          </Flex>
        </Flex>
      </Flex>
      <Flex>
        <Flex>
          <Image
            width="40px"
            height="40px"
            br="8px"
            src={room?.post?.imageUrl}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

const ReceiveMsg = styled.div`
  width: 18px;
  height: 14px;
  background-color: ${({ theme }) => theme.pallete.primary850};
  color: white;
  border-radius: 6px;
  border: none;
  text-align: center;
  vertical-align: middle;

  position: relative;
  bottom: -10px;
  left: -10px;
`;

export default ChatCard;
