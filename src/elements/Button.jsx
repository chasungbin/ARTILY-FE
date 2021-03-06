import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const Button = (props) => {
  const {
    children,
    onClick,
    display,
    jc,
    width,
    height,
    margin,
    padding,
    br,
    fg,
    bc,
    outline,
    position,
    top,
    left,
    right,
    bottom,
    text,
    border,
    borderRight,
    fontSize,
    color,
    shadow,
    cursor,
    outlineColor,
  } = props;

  const styles = {
    display,
    jc,
    width,
    height,
    margin,
    padding,
    br,
    fg,
    outline,
    bc,
    position,
    top,
    left,
    right,
    bottom,
    text,
    border,
    borderRight,
    fontSize,
    color,
    shadow,
    cursor,
    outlineColor,
  };

  return (
    <React.Fragment>
      <ButtonStyle onClick={onClick} {...styles}>
        {children}
      </ButtonStyle>
    </React.Fragment>
  );
};

Button.defaultProps = {
  onClick: () => {},
  display: null,
  jc: "0",
  width: "fit-content",
  height: "fit-content",
  margin: "0",
  padding: "16px",
  border: "none",
  br: "8px",
  fg: "0",
  bc: `${theme.color.brandColor}`,
  position: null,
  top: null,
  bottom: null,
  left: null,
  right: null,
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "500",
};

const ButtonStyle = styled.button`
  -webkit-tap-highlight-color: transparent;
  display: ${({ display }) => display};
  flex-grow: ${({ fg }) => fg};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ br }) => br};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  border: ${({ border }) => border};
  border-right: ${({ borderRight }) => borderRight};
  font-size: ${({ fontSize }) => fontSize}; // 5.12 민경
  font-weight: ${({ fontWeight }) => fontWeight}; // 5.12 민경
  color: ${({ color }) => color}; // 5.12 민경
  justify-content: center;
  cursor: ${({ cursor }) => cursor};

  ${(props) =>
    props.text
      ? `
    background-color: transparent;
    padding: ${(props) => (props.padding ? props.padding : "8px")}
    font-size: ${({ fontSize }) => fontSize}; 
    font-weight: ${({ fontWeight }) => fontWeight};
    
    :focus {      
    }
    :hover {
      cursor: pointer;
    }
    `
      : props.outline
      ? `
    background-color: transparent;
    color: ${theme.color.black};
    border: ${({ border }) => border};
    font-size: ${({ fontSize }) => fontSize}; 
    font-weight: ${({ fontWeight }) => fontWeight};
    :focus {
      background-color: ${theme.color.lightGray};
      opacity: 1;
    }
    :hover {
      opacity: 1;
      cursor: pointer;
    }
    `
      : props.shadow
      ? `
      background-color: ${props.bc};
      color: ${theme.color.white};
      border: none;
      font-size: ${({ fontSize }) => fontSize}; 
      font-weight: ${({ fontWeight }) => fontWeight};
      
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    `
      : `
    background-color: ${props.bc};
    color: ${theme.color.white};
    font-size: ${({ fontSize }) => fontSize}; 
    font-weight: ${({ fontWeight }) => fontWeight};
    border: none;
    border-right: ${({ borderRight }) => borderRight};
    :focus {
      opacity: 1;
    }
    :hover {
      opacity: 1;
      cursor: pointer;
    }
    

    `};
`;

export default Button;
