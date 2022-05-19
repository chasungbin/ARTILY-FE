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
// import SellLabel from "./SellLabel";
// key 값은 따로 props로 안주셔도 에러가 안나서 뺐고, 명세서대로 변수명 일치시켰습니당 4/29 한울

// 5/13 스토어에서 쓰는 ArtCard 컴포넌트로뺐습니다 props 주석처리된거 안쓰시는거면 지우셔도됨 -한울-
const ArtCard = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    postId,
    onClick,
    postTitle,
    price,
    done,
    imageUrl,
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

  // 포스팅에 사진이 없는 예외처리를 위해 방지
  const imageArr = imageUrl || [""];
  console.log(imageArr);

  const nowuser = userInfo;

  const deletePosting = async () => {
    const result = await deleteSwal();
    console.log(result);
    if (result) {
      dispatch(deletePostDB(postId));
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
              src={imageArr[0].imageUrl || ""}
              border="1px solid #eee"
              br="8px"
              margin="6px 9px 6px 16px"
            />

            <Wrap>
              <Flex>
                <Text medium h2 fg="1" margin="10px 0 0 0">
                  {postTitle}
                </Text>
                <SellLabel manageLabel done={done} />
              </Flex>
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
              padding="10px 20px"
              br="0"
              onClick={() => {
                console.log(postId);
                history.push(`/store/write/${postId}`);
              }}
            >
              수정하기
            </Button>
            <Button
              text
              borderRight={`1px solid ${theme.pallete.gray1}`}
              br="0"
              padding="10px 20px"
              onClick={deletePosting}
            >
              삭제하기
            </Button>
            {done === true ? (
              <Button
                text
                fg="1"
                br="0"
                onClick={() => {
                  //done이 true(판매완료)로 바뀌어야 함. 아직 구현 못함
                }}
              >
                판매중으로 상태변경하기
              </Button>
            ) : (
              <Button
                text
                fg="1"
                br="0"
                padding="10px 20px"
                onClick={() => {
                  //done이 false(판매중)로 바뀌어야 함. 아직 구현 못함
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
        <Image
          height="168px"
          border="none"
          src={imageArr[0].imageUrl || ""}
          br="8px"
        />
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
  } else if (buylist) {
    //마이페이지=> 구매내역 조회 / 리뷰 작성
    return (
      <>
        <Card onClick={onClick}>
          <Border>
            <Flex>
              <Image
                width="140px"
                src={imageUrl}
                margin="0 10px 10px 10px"
                border="1px solid #eee"
              />
              <Wrap width="60%">
                <Text bold>{postTitle}</Text>
                <Text body2 margin="8px 0 0 0">
                  {nickname}
                </Text>
              </Wrap>
              <Button margin="0 15px 0 0" padding="10px" width="30vw">
                리뷰 쓰기
              </Button>
            </Flex>
          </Border>
        </Card>
      </>
    );
  } else if (sellLabel) {
    //마이페이지 하단 판매목록
    return (
      <Card onClick={onClick}>
        <Label>
          <SellLabel pageLabel done={done} />
          <Image
            height="168px"
            br="8px"
            border="1px solid #eee"
            src={imageArr[0].imageUrl || ""}
          />
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
  } else if (review) {
    //리뷰목록
    return (
      <Card onClick={onClick}>
        <Image
          height="168px"
          br="8px"
          src={imageArr[0].imageUrl || ""}
          border="1px solid #eee"
        />
        <Text margin="8px 0 0 0" bold>
          {reviewTitle}
        </Text>
        <Text body2>{reviewContent}</Text>
        <Flex margin="8px 0 10px 0 ">
          <Image circle size="20" src={nowuser?.profileImage} />
          <Text fg="1" margin="0 0 0 4px">
            {nowuser?.nickname}
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
          <Image
            height="168px"
            br="8px"
            src={imageArr[0].imageUrl || ""}
            border="1px solid #eee"
          />
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

const Label = styled.div`
  position: relative;
`;
const Border = styled.div`
  padding-top: 10px;
  border-top: 1px solid #ddd;
`;
export default ArtCard;
