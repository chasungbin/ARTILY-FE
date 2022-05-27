import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Preview } from "../components";
import ImagePreview from "../components/ImagePreview";
import {
  Button,
  Checkbox,
  Flex,
  Grid,
  Image,
  Input,
  Text,
  Textarea,
  Wrap,
  Icon,
} from "../elements";
import { clearPreview } from "../redux/modules/image";
import { getReviewOne, getNowReview } from "../redux/modules/reviews";
import { openModal } from "../redux/modules/modal";
import { postReviewDB, editReviewDB } from "../redux/modules/reviews.jsx";
import { resetImageDt, editPosts3Url } from "../redux/modules/image";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { history } from "../redux/configureStore";
import { inputSpaceReg, priceComma } from "../shared/utils";
import { NavigationNext, Close } from "../assets/icons/index";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styled from "styled-components";
import { set } from "lodash";
import theme from "../styles/theme";

const MySwal = withReactContent(Swal);

const ReviewWrite = () => {
  const dispatch = useDispatch();

  // 할당
  const { postId, reviewId } = useParams();
  const path = useLocation().pathname;

  const [inputs, setinputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { imageDt, imageArr, fileObj } = useSelector((state) => state.image);
  const buyer = useSelector((state) => state.review?.detailData?.buyer);

  // redux 리셋
  useEffect(() => {
    dispatch(clearPreview());
    setIsLoading(false);
    dispatch(
      getNowReview({
        buyer: [],
        defferents: [],
        myLike: "-",
      })
    );
    dispatch(resetImageDt([]));
    dispatch(editPosts3Url([]));
  }, []);

  useEffect(() => {
    if (path === `/review/write/${postId}`) {
      dispatch(editPosts3Url([]));
    }
    if (path === `/review/edit/${reviewId}`) {
      dispatch(editPosts3Url(buyer && buyer[0]?.images));
    }
  }, [buyer[0]?.images]);

  useEffect(() => {
    if (path === `/review/write/${postId}`) {
      setinputs({});
      dispatch(clearPreview());
    }
    if (path === `/review/edit/${reviewId}`) {
      dispatch(getReviewOne(reviewId));
      setinputs({
        reviewTitle: buyer[0]?.reviewTitle,
        reviewContent: buyer[0]?.reviewContent,
      });
    }
  }, [buyer[0]?.reviewTitle]);

  // function
  const InputChange = (e) => {
    const { id, value } = e.target;
    setinputs({ ...inputs, [id]: value });
  };

  const reviewSubmit = () => {
    const { reviewTitle, reviewContent } = inputs;
    setIsLoading(true);
    console.log(isLoading);

    inputSpaceReg(reviewTitle);
    inputSpaceReg(reviewContent);

    setinputs({ ...inputs });

    const formData = new FormData();
    formData.append("reviewTitle", inputs.reviewTitle);
    formData.append("reviewContent", inputs.reviewContent);

    if (path === `/review/write/${postId}`) {
      for (let i = 0; i < fileObj.length; i++) {
        // console.log(fileObj[i]);
        formData.append("imageUrl", fileObj[i]);
      }
    }

    if (path === `/review/edit/${reviewId}`) {
      if (fileObj.length > 0) {
        for (let i = 0; i < fileObj.length; i++) {
          formData.append("imageUrl", fileObj[i]);
        }
      }

      if (imageDt.length > 0) {
        for (let i = 0; i < imageDt.length; i++) {
          // console.log(imageDt[i]);
          formData.append("imgDt", imageDt[i]);
        }
      }
    }

    for (var pair of formData.entries()) {
      // console.log(pair[0] + ", " + pair[1]);
    }

    // console.log(postId);
    // /review/write/4c96e2b7a1e8

    if (path === `/review/write/${postId}`) {
      // console.log("reviewWrite");
      dispatch(postReviewDB(postId, formData));
    } else if (path === `/review/edit/${reviewId}`) {
      // console.log("reviewWrite");
      dispatch(editReviewDB(reviewId, formData));
    }
  };

  return (
    <Wrap margin="0 16px">
      <Preview />
      <Wrap margin="8px 0 0 0" />
      <Input
        id="reviewTitle"
        placeholder="제목을 입력해주세요."
        value={inputs?.reviewTitle}
        onChange={InputChange}
      />
      <Wrap margin="8px 0 0 0" />
      <Textarea
        id="reviewContent"
        value={inputs.reviewContent}
        border="none"
        placeholder="작품에 대한 후기를 작성해주세요. 허위로 작성된 글은 게시가 제한될 수 있습니다."
        onChange={InputChange}
        textLine={100}
      />
      <ButtonWrap>
        <Flex>
          <Icon
            margin="0 0 0 16px"
            onClick={() => {
              history.goBack();
            }}
          >
            <Close />
          </Icon>
          <Wrap fg="1"></Wrap>
          <Button
            color={theme.color.brandColor}
            text
            fontSize="16px"
            padding="14px 16px"
            onClick={reviewSubmit}
          >
            {isLoading ? "업로드중" : "완료"}
          </Button>
        </Flex>
      </ButtonWrap>
    </Wrap>
  );
};

export default ReviewWrite;
const ButtonWrap = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  margin: 0 auto;
  width: 100%;
  max-width: ${theme.view.maxWidth};
`;
