import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { history } from "../redux/configureStore";
// components
import styled from "styled-components";
import theme from "../styles/theme";
import {
  Flex,
  Text,
  Grid,
  Wrap,
  ImageCarousel,
  Image,
  Button,
  Icon,
} from "../elements";
import { FollowCheck, OtherWorkCard } from "../components";
import { FavoriteFilled, Favorite } from "../assets/icons/index";
// modules
import {
  getReviewOne,
  getNowReview,
  likeReviewDB,
  deleteReviewDB,
  likeReviewListDB,
} from "../redux/modules/reviews";
import { addFollowDB } from "../redux/modules/follow";
import { priceComma } from "../shared/utils";
import { NoInfo } from "../components";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ReviewDetail = (props) => {
  const dispatch = useDispatch();
  const reviewId = useParams();
  const detailData = useSelector((state) => state.review.detailData);
  const currentUser = useSelector((state) => state.user?.user);
  const isMe =
    detailData?.buyer && detailData?.buyer[0]?.userId === currentUser?.userId;
  const myReviewLikeList = useSelector(
    (state) => state.review.myreviewLikeList2
  );
  const myReviewLikeCheck = myReviewLikeList.find(
    (v) => v === reviewId.reviewId
  );

  useEffect(() => {
    dispatch(getNowReview([]));
  }, []);

  useEffect(() => {
    dispatch(getReviewOne(reviewId.reviewId));
  }, []);

  useEffect(() => {
    if (currentUser) {
      dispatch(likeReviewListDB());
    }
  }, []);

  function deleteFunc() {
    dispatch(deleteReviewDB(reviewId.reviewId));
  }

  async function likeFunc() {
    if (!currentUser) {
      MySwal.fire({
        icon: "check",
        text: "로그인이 필요한 서비스입니다.",
        showDenyButton: true,
        confirmButtonText: "로그인",
        denyButtonText: `닫기`,
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/login");
        }
      });
      return;
    }
    await dispatch(likeReviewDB(reviewId.reviewId)).try(likeFuncList());
  }

  function likeFuncList() {
    dispatch(likeReviewListDB(reviewId.reviewId));
  }

  // 팔로우정보
  const [nowFollowing, setNowFollowing] = useState(false);
  const [nowsellerFollowing, setNowSellerFollowing] = useState(false);

  // 팔로우 토글
  const followToggle = () => {
    if (!currentUser) {
      MySwal.fire({
        icon: "check",
        text: "로그인이 필요한 서비스입니다.",
        showDenyButton: true,
        confirmButtonText: "로그인",
        denyButtonText: `닫기`,
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/login");
        }
      });
      return;
    }
    const userData = {
      followId: detailData.buyer[0].userId,
      followName: detailData.buyer[0].nickname,
      profileImage: detailData.buyer[0].profileImage,
    };

    dispatch(addFollowDB(userData));
    setNowFollowing(!nowFollowing);
  };
  const sellerfollow = () => {
    if (!currentUser) {
      MySwal.fire({
        icon: "check",
        text: "로그인이 필요한 서비스입니다.",
        showDenyButton: true,
        confirmButtonText: "로그인",
        denyButtonText: `닫기`,
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/login");
        }
      });
      return;
    }
    const userData = {
      followId: detailData.buyer[0].seller.user.userId,
      followName: detailData.buyer[0].nickname,
      profileImage: detailData.buyer[0].profileImage,
    };

    dispatch(addFollowDB(userData));
    setNowSellerFollowing(!nowsellerFollowing);
  };

  useEffect(() => {
    dispatch(getNowReview({ buyer: [], defferentInfo: [] }));
  }, []);

  useEffect(() => {
    dispatch(getReviewOne(reviewId.reviewId));
  }, []);

  return (
    <>
      {detailData.buyer &&
        detailData.buyer.map((v) => (
          <>
            <Wrap padding="0 0 72px">
              <Time>{v.createdAt}</Time>
              <Wrap margin="0 16px 8px">
                <Text h1>{v.reviewTitle}</Text>

                <Flex margin="8px 0 0 0" jc="space-between">
                  <ProfileBtn
                    onClick={() => {
                      if (
                        detailData?.buyer[0]?.userId === currentUser?.userId
                      ) {
                        history.push(`/mypage`);
                      } else {
                        history.push(
                          `/userprofile/${detailData?.buyer[0]?.userId}`
                        );
                      }
                    }}
                  >
                    <Flex>
                      <Image
                        circle
                        size="32"
                        src={detailData?.buyer[0]?.profileImage}
                        border="1px solid #eee"
                      />
                      <Text margin="0 0 0 8px">
                        {detailData?.buyer[0]?.nickname}
                      </Text>
                    </Flex>
                  </ProfileBtn>
                  <Flex>
                    {isMe ? (
                      <>
                        <Flex
                          padding="6px"
                          onClick={() => {
                            history.push(`/review/edit/${reviewId.reviewId}`);
                          }}
                        >
                          <Edit body1 color={theme.pallete.primary900}>
                            수정하기
                          </Edit>
                        </Flex>
                        <Flex padding="6px 0 6px 6px" onClick={deleteFunc}>
                          <Delete body1 color={theme.pallete.primary900}>
                            삭제하기
                          </Delete>
                        </Flex>
                      </>
                    ) : (
                      <>
                        <Flex padding="6px" onClick={followToggle}>
                          <FollowCheck text follow={nowFollowing} />
                        </Flex>
                      </>
                    )}
                  </Flex>
                </Flex>
              </Wrap>
              <ImageCarousel src={v.images} />

              <Wrap margin="16px 16px 16px 16px">
                <Text contents={v.reviewContent}></Text>
              </Wrap>

              <Wrap
                padding="10px 16px 16px"
                onClick={() => history.push(`/store/view/${v.seller.postId}`)}
                bc={`${theme.pallete.primary100}`}
              >
                <Flex>
                  <Text h2 lineHeight="22px" margin="0 0 8px">
                    구매한 작품
                  </Text>
                </Flex>
                <Flex>
                  <Image
                    width="96px"
                    height="96px"
                    src={`${v.seller.imageUrl}`}
                  />
                  <Wrap margin="0 0 0 16px ">
                    <Text h3 medium margin="0 0 8px">
                      {v.seller.postTitle}
                    </Text>
                    <Text margin="0 0 8px">
                      {v.seller.price ? priceComma(v.seller.price) : 0}원
                    </Text>
                    <WrapBuy>
                      <Flex>
                        <Image
                          circle
                          size="32"
                          src={`${v.seller.user.profileImage}`}
                        />
                        <Text margin="0 0 0 8px">{v.seller.user.nickname}</Text>
                      </Flex>
                    </WrapBuy>
                  </Wrap>
                </Flex>
              </Wrap>

              <Wrap margin="16px">
                <Flex margin="0 0 11px">
                  <Text h2>{v.seller.user.nickname}의 다른 작품</Text>
                  {isMe ? (
                    <>
                      <Wrap fg="1"></Wrap>
                      <Text lineHeight="22px">
                        <Button
                          fontSize="16px"
                          color={`${theme.color.brandColor}`}
                          text
                          onClick={() =>
                            history.push(`/userprofile/${v.seller.user.userId}`)
                          }
                        >
                          더보기
                        </Button>
                      </Text>
                    </>
                  ) : (
                    <>
                      <Wrap margin="0 0 0 8px" fg="1">
                        <Flex padding="6px" onClick={sellerfollow}>
                          <FollowCheck text follow={nowsellerFollowing} />
                        </Flex>
                      </Wrap>
                      <Text lineHeight="22px">
                        <Button
                          fontSize="16px"
                          color={`${theme.color.brandColor}`}
                          text
                          onClick={() =>
                            history.push(`/userprofile/${v.seller.user.userId}`)
                          }
                        >
                          더보기
                        </Button>
                      </Text>
                    </>
                  )}
                </Flex>
                <NoInfo
                  list={detailData.defferentInfo}
                  text1="아직 작가의 다른 작품이 없어요."
                  text2="다른 작가의 작품을 구경해보시겠어요?"
                  underlineBtn="스토어로 이동"
                  movePage="/store"
                >
                  <Grid gtc="1fr 1fr">
                    {detailData.defferentInfo &&
                      detailData.defferentInfo.map((v, i) => {
                        return (
                          <>
                            <OtherWorkCard
                              key={`${v}_${i}`}
                              {...v}
                              onClick={() =>
                                history.push(`/store/view/${v.postId}`)
                              }
                              src={v.images && v.images[0].imageUrl}
                            />
                          </>
                        );
                      })}
                  </Grid>
                </NoInfo>
              </Wrap>
            </Wrap>
            <FixedChatBar>
              <Icon width="fit-content" height="fit-content" onClick={likeFunc}>
                <Flex>
                  {myReviewLikeCheck && myReviewLikeCheck ? (
                    <FavoriteFilled color={theme.color.brandColor} />
                  ) : (
                    <Favorite color={theme.color.brandColor} />
                  )}
                  <Text
                    h3
                    medium
                    margin="0 0 0 4px"
                    color={theme.pallete.gray3}
                  >
                    {v.likeCnt}
                  </Text>
                </Flex>
              </Icon>
            </FixedChatBar>
          </>
        ))}
    </>
  );
};

const FixedChatBar = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 8px 16px;
  border-top: 1px solid ${theme.pallete.gray1};
  max-width: ${theme.view.maxWidth};
  height: 56px;
`;
const Edit = styled.p`
  cursor: pointer;
  color: ${({ theme }) => theme.pallete.primary900};
`;
const Delete = styled.p`
  cursor: pointer;
  color: ${({ theme }) => theme.pallete.primary900};
`;

const Time = styled.div`
  font-size: 14px;
  color: #999;
  text-align: right;
  padding: 0 16px 5px 0;
`;
const ProfileBtn = styled.div`
  cursor: pointer;
`;

const WrapBuy = styled.div`
  cursor: pointer;
`;
export default ReviewDetail;
