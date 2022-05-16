import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Grid, Flex, Text, Image, Button } from "../elements";
import {
  addFollowDB,
  DeleteFollowDB,
  getFollowDB,
  getFollowerDB,
} from "../redux/modules/follow";
const Follow = () => {
  const history = useHistory();
  const getfollowList = useSelector((state) => state.user.user);
  //내가 팔로잉한 목록
  const nowfollowList = useSelector((state) => state.followUser.list); //나를 팔로워한 유저도 담기겠지? 현재 카카오 로그인 오류로 인해 확인불가. 5/15
  console.log("내가 팔로잉한 목록:", nowfollowList);
  const nowfollowerList = useSelector((state) => state.followUser.follower);
  console.log("나를 팔로우한 목록:", nowfollowerList);
  useEffect(() => {
    dispatch(getFollowerDB());
    dispatch(getFollowDB());
    // dispatch(addFollowDB());
  }, []);
  // console.log(followUserNickname);
  //이 userId를 가진 사람을 찾아서 이사람의 닉네임과 프로필사진을 가져와야 한다.
  //나를 팔로우한 목록

  const menus = [
    `팔로워 ${getfollowList?.followerCnt}명`,
    `팔로잉 ${getfollowList?.followCnt}명`,
    // `팔로잉 ${getfollowList?.followCnt}명`,
  ];
  const [current, setCurrent] = useState(menus[0]);

  // 네비게이션 탭을 직접 눌렀을때
  const handleChangeCurrent = (e) => {
    const { innerText } = e.target;
    setCurrent(menus.find((l) => l === innerText));
  };
  const dispatch = useDispatch();

  return (
    <>
      <Grid gtc="auto auto" cg="20px" margin="10px 0 0 0">
        {menus.map((menu) => {
          return (
            <CurrentDiv
              key={menu}
              onClick={(e) => {
                handleChangeCurrent(e);
              }}
              current={menu === current}
            >
              <Nav>{menu}</Nav>
            </CurrentDiv>
          );
        })}
      </Grid>
      {/* 팔로워 */}
      {current === `팔로워 ${getfollowList?.followerCnt}명` &&
        nowfollowerList?.map((follower, l) => {
          return (
            <Profile
              key={l}
              onClick={() => {
                // history.push(`/userprofile/${followId}`);//누르면 팔로우한 유저의 프로필로 이동
              }}
            >
              <Flex>
                <Image
                  margin="0 16px 0 0"
                  width="60px"
                  height="60px"
                  bg="#ddd"
                  shadow="1px 0.5px 2px #888"
                  br="30px"
                  src={follower?.profileImage}
                ></Image>
                <Text fg="1" body2 bold margin="5px 0 10px 0">
                  {nowfollowerList.length ? follower.followName : ""}
                </Text>
                {/* 자신의 마이페이지일 경우 삭제버튼만 존재 */}
                <Button outline height="38px" padding="3px 17px">
                  삭제
                </Button>
                {/* 다른사람의 리스트일경우 팔로잉(나도 팔로우 누른 유저), 팔로우 버튼으로 나뉨 */}
              </Flex>
            </Profile>
          );
        })}
      {current === `팔로잉 ${getfollowList?.followCnt}명` &&
        nowfollowList?.map((follow, l) => {
          console.log(follow);
          return (
            <Profile
              key={l}
              onClick={() => {
                // history.push(`/userprofile/${followId}`);//누르면 팔로우한 유저의 프로필로 이동
              }}
            >
              <Flex>
                <Image
                  margin="0 16px 0 0"
                  width="60px"
                  height="60px"
                  bg="#ddd"
                  shadow="1px 0.5px 2px #888"
                  br="30px"
                  src={follow?.profileImage}
                  onClick={() => {
                    history.push(`/userprofile/${follow.userId}`);
                  }}
                ></Image>
                <Text fg="1" body2 bold margin="5px 0 10px 0">
                  {nowfollowList.length ? follow.followName : ""}
                </Text>
                {/* 이미 팔로잉 한 상태일때 */}
                <FollowBtn
                  height="38px"
                  padding="3px 17px"
                  onClick={() => {
                    dispatch(DeleteFollowDB(follow.followId));
                  }}
                >
                  팔로잉
                </FollowBtn>
                {/* //다른사람의 페이지 일 경우 */}
                {/* 한번 더 누르면 팔로우 버튼으로 바뀌어야함 */}
              </Flex>
            </Profile>
          );
        })}
    </>
  );
};

const CurrentDiv = styled.div`
  font-weight: bold;
  padding: 5px 10px;
  margin: 10px 0 0;
  cursor: pointer;
  text-align: center;
  /* animation: all 3s ease-out; */
  border-bottom: ${({ current, theme }) =>
    current ? `3px solid ${theme.color.brandColor}` : "3px solid transparent;"};
  &:focus {
    /* outline: none; */
  }
  // 모바일 파란박스 없애기
  -webkit-tap-highlight-color: transparent;
`;

const Nav = styled.div`
  display: grid;
  width: 100%;
`;
const Profile = styled.div`
  padding: 15px 16px;
  border-bottom: 1px solid #ddd;
`;
const FollowBtn = styled.button`
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.pallete.gray2};
  width: 73px;
  height: 38px;
`;

export default Follow;
