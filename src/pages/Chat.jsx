import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ChatCard } from "../components";
import { Grid } from "../elements";

const Chat = () => {
  // const dispatch = useDispatch();
  const { roomList, newMessage } = useSelector((state) => state.chat);
  console.log(roomList, newMessage);

  useEffect(() => {
    // 현재 유저가 진행중인 채팅 불러오기
    // dispatch()
  }, []);

  return (
    <>
      <Grid>
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </Grid>
    </>
  );
};

export default Chat;
