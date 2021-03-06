import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Card } from "../components";
import { Flex, Image, Text, Wrap, Button } from "../elements";
import { priceComma } from "../shared/utils";
import { useHistory } from "react-router-dom";
import { Favorite } from "../assets/icons";
import { deleteSwal } from "../shared/commonAlert";
import { deletePostDB } from "../redux/modules/store";
import theme from "../styles/theme";
import SellLabel from "./SellLabel";
const ArtCard = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    postId,
    onClick,
    postTitle,
    price,
    done,
    images,
    nickname,
    likeCnt,
    markupCnt,
    mystore,
    sellLabel,
    buylist,
    review,
    markup,
    reviewTitle,
    reviewContent,
    userId,
    profileImage,
    transaction,
    address,
    changeAddress,
    home,
    userInfo, // 유저정보
  } = props;

  const nowuser = userInfo;
  const deletePosting = async () => {
    const result = await deleteSwal();
    // console.log(result);
    if (result) {
      dispatch(deletePostDB(postId, true));
      window.location.reload();
    }
  };

  if (mystore) {
    return (
      <>
        <Card onClick={onClick}>
          <Flex>
            <Image
              width="96px"
              height="96px"
              src={images[0].imageUrl}
              br="8px"
              margin="6px 9px 6px 16px"
            />

            <Wrap>
              {" "}
              <WrapTitle>
                <Flex>
                  <SellList>{postTitle}</SellList>
                  <SellLabel manageLabel done={done} />
                </Flex>{" "}
              </WrapTitle>
              {price ? (
                <Text fg="1" medium margin="8px 0 0 0">
                  {priceComma(price)}원
                </Text>
              ) : (
                ""
              )}
              <Flex fg="0" padding="8px 0 0 0">
                <Favorite size="16" color={`${theme.color.brandColor}`} />
                <Text body2 margin="0 0 0 4px">
                  {markupCnt}
                </Text>
              </Flex>
            </Wrap>
          </Flex>
        </Card>
        <Sell>
          <Flex>
            <Button
              text
              borderRight={`1px solid ${theme.pallete.gray1}`}
              padding="10px 15px"
              br="0"
              color={theme.pallete.black}
              onClick={() => {
                // console.log(postId);
                history.push(`/store/edit/${postId}`);
              }}
            >
              수정하기
            </Button>
            <Button
              text
              borderRight={`1px solid ${theme.pallete.gray1}`}
              br="0"
              color={theme.pallete.black}
              padding="10px 15px"
              onClick={deletePosting}
            >
              삭제하기
            </Button>
            {done === true ? (
              <Button
                text
                cursor="default"
                fg="1"
                br="0"
                color={`${theme.pallete.gray2}`}
              >
                판매 완료
              </Button>
            ) : (
              <Button
                text
                fg="1"
                br="0"
                padding="10px 15px"
                color={theme.pallete.black}
                onClick={() => {
                  history.push(`/completed/${postId}`);
                }}
              >
                판매완료로 상태변경하기
              </Button>
            )}
          </Flex>
        </Sell>
      </>
    );
  } else if (home) {
    //마이페이지=> 구매내역 조회 / 리뷰 작성
    return (
      <Card onClick={onClick}>
        <Image height="168px" border="none" src={images[0].imageUrl} br="8px" />
        <Flex margin="8px 0 ">
          <Image circle size="32" src={profileImage} />
          <Text margin="0 0 0 8px">{nickname}</Text>
        </Flex>
        <Text h3 medium margin="0 0 0 2px">
          {postTitle}
        </Text>
        <Text body2 margin="0 0 0 2px" color="#555">
          {transaction} {changeAddress && `∙${changeAddress}`}
        </Text>
        <Text>{price && priceComma(price)}원</Text>
      </Card>
    );
  } else if (sellLabel) {
    //마이페이지 하단 판매목록
    return (
      <Card onClick={onClick}>
        <Label>
          <SellLabel pageLabel done={done} />
          <Image height="168px" br="8px" src={images[0].imageUrl} />
        </Label>
        <SellList2>{postTitle}</SellList2>
        <Flex margin="0 0 8px 0">
          {price ? (
            <Text fg="1" bold>
              {priceComma(price)}원
            </Text>
          ) : (
            ""
          )}
          <Flex fg="0">
            <Favorite size="16" color={`${theme.color.brandColor}`} />
            <Text body2 margin="0 0 0 4px">
              {markupCnt}
            </Text>
          </Flex>
        </Flex>
      </Card>
    );
  } else if (review) {
    //리뷰목록
    return (
      <Card onClick={onClick}>
        <Image height="168px" br="8px" src={images[0].imageUrl} />
        <Text margin="8px 0 0 0" bold>
          {reviewTitle}
        </Text>
        <ReviewCon>{reviewContent}</ReviewCon>
        <Flex margin="8px 0 10px 0 ">
          <Image circle size="20" src={profileImage} />
          <Text fg="1" margin="0 0 0 4px">
            {nickname}
          </Text>
          <Flex fg="0">
            <Favorite size="16" color={`${theme.color.brandColor}`} />
            <Text body2 margin="0 0 0 4px">
              {markupCnt}
            </Text>
          </Flex>
        </Flex>
      </Card>
    );
  } else if (markup) {
    //관심목록
    return (
      <Card onClick={onClick}>
        <Label>
          <SellLabel done={done} pageLabel />
          <Image height="168px" br="8px" src={images[0].imageUrl} />
        </Label>
        <Text margin="8px 0 0 0">{postTitle}</Text>
        <Flex margin="0 0 8px 0">
          {price ? (
            <Text fg="1" bold>
              {priceComma(price)}원
            </Text>
          ) : (
            ""
          )}
          <Flex fg="0">
            <Favorite size="16" color={`${theme.color.brandColor}`} />
            <Text body2 margin="0 0 0 4px">
              {markupCnt}
            </Text>
          </Flex>
        </Flex>
      </Card>
    );
  }
};

const Sell = styled.div`
  border-top: ${({ theme }) => `1px solid ${theme.pallete.gray1}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.pallete.gray1}`};
  height: fit-content;
  p {
    border-right: 1px solid #ddd;
    font-size: 14px;
    color: ${({ theme }) => `${theme.pallete.gray4}`};
    font-weight: bold;
    cursor: pointer;
  }
  p:nth-of-type(1),
  p:nth-of-type(2) {
    padding: 0 1em;
  }
  p:nth-of-type(3) {
    border-right: none;
    margin: auto;
  }
`;
const WrapTitle = styled.div`
  margin-right: 16px;
`;
const Label = styled.div`
  position: relative;
`;
const Border = styled.div`
  padding-top: 10px;
`;
//게시글 제목 글자수 길어지는거 방지
const SellList = styled.p`
  max-width: 40vw;
  overflow: hidden;
  line-height: 20px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
const SellList2 = styled.p`
  max-width: 40vw;
  overflow: hidden;
  height: 20px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin: 8px 0 0 0;
`;

const ReviewCon = styled.div`
  max-width: 40vw;
  font-size: 14px;
  overflow: hidden;
  height: 32px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin: 8px 0 0 0;
`;
export default ArtCard;
