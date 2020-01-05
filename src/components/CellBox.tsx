import React, { MouseEvent } from 'react';
import styled from 'styled-components';

const CellBoxBlock = styled.button`
  display: block;
  float: left;
  width: 32px;
  font-size: 16px;
  font-weight: bold;
  height: 32px;
  line-height: 32px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;

  &.box {
    cursor: pointer;
  }

  &.opened {
    background-color: lightgray;
  }

  &.mine {
    color: red;
  }

  &:focus {
    outline: none;
  }
`;

interface CellBoxProps {
  id: string;
  className: string;
  text: string;
  handleBox: (key: string) => void;
  handleFlag: (key: string) => void;
}

const CellBox: React.SFC<CellBoxProps> = props => {
  const { id, className, text, handleBox, handleFlag } = props;

  const handleClick = () => {
    handleBox(id);
  };

  const handleContextMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleFlag(id);
  };

  return (
    <CellBoxBlock
      id={id}
      className={className}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {text}
    </CellBoxBlock>
  );
};

export default CellBox;
