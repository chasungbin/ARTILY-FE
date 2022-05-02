import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Grid, Text } from "../../elements";
import ModalPortal from "./Portals";

const Modal = () => {
  const modal = useSelector((state) => state.modal);

  return (
    <ModalPortal>
      <Grid>
        <Text h1>{modal.title}</Text>
        {modal.content}
      </Grid>
    </ModalPortal>
  );
};

export default Modal;