import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Card } from "../components";
import { Flex, Image, Text } from "../elements/index";

// key 값은 따로 props로 안주셔도 에러가 안나서 뺐고, 명세서대로 변수명 일치시켰습니당 4/29 한울
const ArtCard = (props) => {
  // ArtCard
  const location = useLocation();

  console.log(props);
  // const postList = useSelector((state) => state.store.list);
  // console.log(postList);

  const { onClick, user, postTitle, price, category, transaction, imageUrl } =
    props;
  const { userId, nickname, profileUrl, address } = user;

  return (
    <Card onClick={onClick}>
      <Image height="120px" src={imageUrl[0]} />
      <Flex margin="8px 0 0">
        <Image shape="circle" size="20" src={profileUrl} />
        <Text margin="0 0 0 4px">{nickname}</Text>
      </Flex>
      <Text>{postTitle}</Text>
      <Text>
        {transaction} ∙ {address}
      </Text>
      <Text bold>{price}원</Text>
    </Card>
  );
};

export default ArtCard;
