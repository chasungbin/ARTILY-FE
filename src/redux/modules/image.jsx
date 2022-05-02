import { createSlice } from "@reduxjs/toolkit";

/*
 * @ 작성자 한울
 * 스토어, 리뷰 작성단계에서 쓸수있는 프리뷰 이미지를 저장하는 리덕스
 *
 */

// represent 대표이미지, imageArr 추가로 올리는사진들
const initialState = {
  represent: null,
  imageArr: [],
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    // 사진을 하나씩 추가할때
    accrueImage: (state, action) => {
      // 첫게시라면 represent 에 저장
      if (!state.represent) {
        state.represent = action.payload;
        // 대표이미지가 이미 있다면 imageArr 에 순서대로 push
      } else {
        state.imageArr.push(action.payload);
      }
    },

    // 프리뷰 사진을 지울때
    removePreview: (state, action) => {},
    // 사용자가 대표이미지를 바꾸고싶을때
    setRepresent: (state, action) => {
      // 기존 대표이미지
      let temp = state.represent;
      // 설정한 이미지로 대표이미지 바꿈
      state.represent = action.payload;
      // imageArr에서 설정한 이미지를 뺌
      let newArr = state.imageArr.filter((el) => el !== action.payload);
      // 빠진 배열과 기존 대표이미지 합쳐서 넣기
      state.imageArr = [...newArr, temp];
    },

    // 한꺼번에 올릴때
    // 추가: 한꺼번에 올릴때도 for문 안에서 accrueImage로 올리고있습니다 지금당장은 안쓰는 액션임
    setPreview: (state, action) => {
      let repImg = action.payload[0];
      state.represent = repImg;
      state.imageArr = action.payload.filter((el) => el !== repImg);
    },

    // 업로드하지않았을때
    clearPreview: (state) => {
      state.represent = null;
      state.imageArr = [];
    },
  },
});

const { reducer, actions } = imageSlice;
export const {
  accrueImage,
  removePreview,
  setRepresent,
  // setPreview,
  clearPreview,
} = actions;
export default reducer;