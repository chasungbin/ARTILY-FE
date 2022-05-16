import React from "react";
import { useSelector } from "react-redux";
import { Favorite } from "../assets/icons";
import { Flex, Icon, Image, Text } from "../elements";
import { priceComma } from "../shared/utils";
import theme from "../styles/theme";
import Card from "./Card";

// TODO: 아이콘 색깔채운거 받아야하나 ?
import { IoMdHeart } from "react-icons/io";

const StoreCard = (props) => {
  const {
    user,
    postId,
    postTitle,
    price,
    transaction,
    imageUrl,
    changeAddress,
    markupCnt,
    onClick,
    isHome = false, // 홈에서 이미지 24로 바꾸기
  } = props;

  const userInfo = useSelector((state) => state.user.user);

  const isMyMarkup = userInfo?.myMarkup?.find((id) => id === postId);

  return (
    <Card onClick={onClick}>
      <Image height="168px" br="8px" src={imageUrl} />
      <Flex margin="8px 0">
        {isHome ? (
          <Image circle size="24" src={user?.profileImage} />
        ) : (
          <Image circle size="32" src={user?.profileImage} />
        )}

        <Text h3 margin="0 0 0 4px">
          {user?.nickname}
        </Text>
      </Flex>
      <Text h3 medium>
        {postTitle}
      </Text>
      <Text color={theme.pallete.gray3}>
        {transaction}
        {changeAddress &&
          (changeAddress.length > 8
            ? ` ∙ ${changeAddress.substring(0, 8)}...`
            : ` ∙ ${changeAddress}`)}
      </Text>
      <Flex>
        {price ? <Text fg="1">{priceComma(price)}원</Text> : ""}
        <Icon width="fit-content">
          <Flex>
            {isMyMarkup ? (
              <IoMdHeart size={16} color={theme.pallete.primary850} />
            ) : (
              <Favorite />
            )}

            <Text body2 margin="0 0 0 2px">
              {markupCnt}
            </Text>
          </Flex>
        </Icon>
      </Flex>
    </Card>
  );
};

export default StoreCard;