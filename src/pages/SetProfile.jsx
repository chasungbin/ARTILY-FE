import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Flex,
  Input,
  Text,
  Textarea,
  Button,
  Image,
  Wrap,
  Grid,
} from "../elements";
import { history } from "../redux/configureStore";
// import { actionCreators as userActions } from "../redux/modules/user";
import { setProfileImage } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";
import ToastMessage from "../shared/ToastMessage";
import { Front, Back } from "../shared/NicknameDummy.js";
//아이콘
import { Refresh } from "../assets/icons";
import { Logo } from "../assets/images";
import { getUserInfo, setProfileDB } from "../redux/modules/user";
import Swal from "sweetalert2";
import { nicknameCheck } from "../shared/regCheck/RegCheck";
const Setprofile = () => {
  const dispatch = useDispatch();

  const fileInput = useRef();
  const preview = useSelector((state) => state.image.preview);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user.nickname === "") {
      // window.location.reload();
      // window.location.replace("/");
    }
  }, [user.nickname]);

  //랜덤 닉네임 생성
  const randomnickFront = Front;
  const randomnickBack = Back;
  const randomNick =
    randomnickFront[Math.floor(Math.random() * randomnickFront.length)] +
    " " +
    randomnickBack[Math.floor(Math.random() * randomnickBack.length)];

  const [nickname, setNickname] = useState(randomNick);
  const renameRandom = () => {
    const addNick =
      randomnickFront[Math.floor(Math.random() * randomnickFront.length)] +
      " " +
      randomnickBack[Math.floor(Math.random() * randomnickBack.length)];

    setNickname(addNick);
  };

  const selectFile = (e) => {
    const reader = new FileReader();
    console.log(reader);
    const file = fileInput.current.files[0];
    console.log(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(setProfileImage(reader.result));
    };
  };

  const editUser = () => {
    if (!nicknameCheck(nickname)) {
      return;
    }
    if (!preview) {
      alert("프로필 이미지를 선택해주세요!");
      return;
    }

    const file = fileInput.current.files[0];
    //새로운 객체 생성
    const formData = new FormData();

    formData.append("profileImage", file);
    formData.append("nickname", nickname);

    console.log("formData", formData);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    dispatch(setProfileDB(formData, "goDetail"));
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Wrap textAlign="center" margin="0 0 50px">
        <img src="/images/artily.svg" alt="logo" />
        <Text body1 color="#999">
          내 프로필을 완성해주세요!
        </Text>

        <Wrapprofile>
          <Flex jc="center" margin="50px 0">
            <Image
              alt="profile"
              width="120px"
              height="120px"
              br="60px"
              border="1px solid #eee"
              shadow="1px 1px 3px #ddd"
              src={preview ? preview : ""}
            ></Image>

            <ImgBox>
              <label htmlFor="image">
                <img src="../../images/edit.png" alt="파일 선택" />
              </label>
              <input
                type="file"
                id="image"
                ref={fileInput}
                onChange={selectFile}
              />
            </ImgBox>
          </Flex>
        </Wrapprofile>
        <Wrap padding="0 20px 30px 20px">
          <Flex>
            <Text textAlign="left" fg="1">
              닉네임
            </Text>
            <Input
              icon={
                <span onClick={renameRandom}>
                  <Refresh />
                </span>
              }
              square
              width="100%"
              border="1px solid #d3d3d3"
              br="6px"
              type="text"
              fg="1"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </Flex>
        </Wrap>
        <Flex>
          <Button width="90%" margin="20px auto" onClick={editUser}>
            프로필 저장하기
          </Button>
        </Flex>
      </Wrap>
    </div>
  );
};

const Wrapprofile = styled.div`
  position: relative;
  margin: auto;
  width: 120px;
`;

const ImgBox = styled.div`
  label {
    position: absolute;
    bottom: 0;
    right: -0.5em;
    display: inline-block;
    padding: 0.5em 0.5em;
    line-height: normal;
    vertical-align: middle;
    background-color: ${({ theme }) => `${theme.color.brandColor}`};
    width: 35px;
    height: 35px;
    cursor: pointer;
    border-radius: 50%;
  }
  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;
export default Setprofile;
