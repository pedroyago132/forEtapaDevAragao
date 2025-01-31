import { List } from "@mui/material";
import styled from "styled-components";

export const StyledList = styled(List)`
    width: max-content;
`

export const StyledImage = styled.img`
width:100%;
height:80px;
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  content: "";
`;