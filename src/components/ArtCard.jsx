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
  } = props;
  console.log(done);

  const nowuser = useSelector((state) => state.user.user);

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
              src={imageUrl}
              br="8px"
              margin="6px 9px 6px 16px"
            />

            <Wrap>
              <Flex>
                <Text fg="1">{postTitle}</Text>
                <SmallLabel>
                  {/* 판매중인 상품과 판매완료된 상품을 구별할 라벨입니다. */}
                  {done === true ? (
                    <p className="complete">판매완료</p>
                  ) : (
                    <p className="selling">판매중</p>
                  )}
                </SmallLabel>
              </Flex>
              {price ? (
                <Text fg="1" bold>
                  {priceComma(price)}원
                </Text>
              ) : (
                ""
              )}
              <Wrap fg="0" padding="18px 0 0 0">
                <Favorite color="#FD6A00" />
                {markupCnt}
              </Wrap>
            </Wrap>
          </Flex>
        </Card>
        <Sell>
          <Flex>
            <p
              onClick={() => {
                history.push(`/store/write/${postId}`);
              }}
            >
              수정하기
            </p>
            <p onClick={deletePosting}>삭제하기</p>
            {done === true ? (
              <p
                onClick={() => {
                  //done이 true(판매완료)로 바뀌어야 함. 아직 구현 못함
                }}
              >
                판매중으로 상태변경하기
              </p>
            ) : (
              <p
                onClick={() => {
                  //done이 false(판매중)로 바뀌어야 함. 아직 구현 못함
                }}
              >
                판매완료로 상태변경하기
              </p>
            )}
          </Flex>
        </Sell>
      </>
    );
  } else if (buylist) {
    //마이페이지=> 구매내역 조회 / 리뷰 작성
    return (
      <>
        <Card onClick={onClick}>
          <Border>
            <Flex>
              <Image width="140px" src={imageUrl} margin="0 10px 0 10px" />
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
          {/* 판매중인 상품과 판매완료된 상품을 구별할 라벨입니다. */}
          {done === true ? (
            <p className="complete">판매완료</p>
          ) : (
            <p className="selling">판매중</p>
          )}
          <Image height="120px" br="8px" src={imageUrl} />
        </Label>
        <Flex margin="8px 0 0">
          <Image circle size="20" src={nowuser?.profileImage} />
          <Text margin="0 0 0 4px">{nowuser?.nickname}</Text>
        </Flex>
        <Text>{postTitle}</Text>
        <Flex>
          {price ? (
            <Text fg="1" bold>
              {priceComma(price)}원
            </Text>
          ) : (
            ""
          )}
          <Wrap fg="0">
            <Favorite color="#FD6A00" />
            {markupCnt}
          </Wrap>
        </Flex>
      </Card>
    );
  } else if (review) {
    //리뷰목록
    return (
      <Card onClick={onClick}>
        <Image height="120px" br="8px" src={imageUrl} />
        <Text bold>{reviewTitle}</Text>
        <Text body2>{reviewContent}</Text>
        <Flex margin="8px 0 0">
          <Image circle size="20" src={nowuser.profileImage} />
          <Text fg="1" margin="0 0 0 4px">
            {nowuser.nickname}
          </Text>
          <Wrap fg="0">
            <Favorite color="#FD6A00" />
            {likeCnt}
          </Wrap>
        </Flex>
      </Card>
    );
  } else if (markup) {
    //관심목록
    return (
      <Card onClick={onClick}>
        <Label>
          {/* 판매중인 상품과 판매완료된 상품을 구별할 라벨입니다. */}
          {done === true ? ( //판매완료일 경우
            <p className="complete">판매완료</p>
          ) : (
            <p className="selling">판매중</p>
          )}
          <Image height="120px" br="8px" src={imageUrl} />
        </Label>
        <Text>{postTitle}</Text>
        <Flex>
          {price ? (
            <Text fg="1" bold>
              {priceComma(price)}원
            </Text>
          ) : (
            ""
          )}

          <Wrap fg="0">
            <Favorite color="#FD6A00" />
            {markupCnt}
          </Wrap>
        </Flex>
      </Card>
    );
  }
};

const Sell = styled.div`
  border-top: ${({ theme }) => `1px solid ${theme.pallete.gray1}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.pallete.gray1}`};
  height: 40px;
  p {
    border-right: 1px solid #ddd;
    font-size: 14px;
    color: ${({ theme }) => `${theme.pallete.gray4}`};
    line-height: 40px;
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
const SmallLabel = styled.div`
  /* position: relative; */
  //판매완료 label
  .complete,
  .selling {
    height: 28px;
    padding: 5px;
    font-size: 13px;
    margin-left: 8px;
    border-radius: 5px;
  }
  .complete {
    color: #fff;
    background-color: ${({ theme }) => `${theme.color.brandColor}`};
  }
  .selling {
    color: ${({ theme }) => `${theme.color.brandColor}`};
    border: 1px solid ${({ theme }) => `${theme.color.brandColor}`};
    background-color: #fff;
  }
`;
const Label = styled.div`
  position: relative;
  .complete,
  .selling {
    position: absolute;
    top: 7px;
    left: 7px;
    height: 30px;
    padding: 0 8px;
    line-height: 30px;
    color: #fff;
    border-radius: 8px;
    font-size: 14px;
  }
  //판매완료 label
  .complete {
    background-color: ${({ theme }) => `${theme.color.black}`};
  }
  //판매중 label
  .selling {
    background-color: #fff;
    background-color: ${({ theme }) => `${theme.color.brandColor}`};
  }
`;
const Border = styled.div`
  padding-top: 10px;
  border-top: 1px solid #ddd;
`;
export default ArtCard;
