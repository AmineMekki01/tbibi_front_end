
import styled from 'styled-components';

export const RadioButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

export const RadioButton = styled.label`
  position: relative;
  padding-left: 35px;
  margin-right: 15px;
  cursor: pointer;
  font-size: 16px;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #ccc;
    border-radius: 50%;
  }

  input:checked ~ span {
    background-color: #2196F3;
  }

  span:after {
    content: "";
    position: absolute;
    display: none;
  }

  input:checked ~ span:after {
    display: block;
  }

  span:after {
    top: 9px;
    left: 9px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
  }
`;
