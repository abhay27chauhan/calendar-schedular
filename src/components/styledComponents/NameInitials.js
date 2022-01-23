import styled from "styled-components";

const bgColor = {
  bgLightGray: "#f7f8fa",
};

const textColor = {
  textDarkGray: "#566474",
};

const NameInitials = styled.div`
  font-family: Roboto;
  height: ${(props) => (props.height ? props.height : "45px")};
  width: ${(props) => (props.width ? props.width : "45px")};
  border-radius: 50%;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "16px")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "700")};
  color: ${textColor.textDarkGray};
  background-color: ${bgColor.bgLightGray};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default NameInitials;
