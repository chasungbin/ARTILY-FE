import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { closeModal } from "../../redux/modules/modal";
import theme from "../../styles/theme";

const DragProtals = ({ children }) => {
  const el = document.getElementById("portals");

  const dispatch = useDispatch();
  const modalClose = () => {
    dispatch(closeModal());
  };

  return ReactDOM.createPortal(
    <Background onClick={modalClose}>
      <Content onClick={(e) => e.stopPropagation()}>{children}</Content>
    </Background>,
    el
  );
};

// 백그라운드: 모달 뒤의 기존 뷰
const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 203;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;

  text-align: center;
  background-color: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  padding-top: 20px;
`;

// 컨텐츠: 모달 본체
const Content = styled.div`
  z-index: 204;
  height: 100%;

  margin: 0 auto;
  width: calc(${({ theme }) => theme.view.maxWidth} - 32px);
  border-radius: 8px;
  background-color: #fff;

  position: relative;
  overflow: scroll;
`;

export default DragProtals;
