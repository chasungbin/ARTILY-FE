import React from "react";
import { Favorite } from "../assets/icons";
import { Flex, Icon, Image, Text } from "../elements";
import { history } from "../redux/configureStore";
import { priceComma } from "../shared/utils";
import Card from "./Card";

const StoreMore = (props) => {
  const { postId, imageUrl, markupCnt, postTitle, price } = props;

  if (postId) {
    return (
      <Card onClick={() => history.push(`/store/view/${postId}`)}>
        <Image height="168px" br="8px" src={imageUrl[0]} />
        <Text h1 margin="8px 0 9px">
          {postTitle}
        </Text>
        <Flex>
          {price ? <Text fg="1">{priceComma(price)} 원</Text> : ""}
          <Icon width="fit-content">
            <Flex jc="center" ai="center">
              <Favorite />
              <Text body2 margin="0 0 0 2px">
                {markupCnt}
              </Text>
            </Flex>
          </Icon>
        </Flex>
      </Card>
    );
  } else return null;
};

export default StoreMore;