import styled from "styled-components";

export const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

interface TabProps {
  isActive: boolean;
}

export const Tab = styled.button<TabProps>`
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.highlight : "transparent"};
  color: ${({ isActive, theme }) => (isActive ? theme.gray : theme.color)};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-bottom: 2px solid
    ${({ isActive, theme }) => (isActive ? theme.gray : "transparent")};
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.highlight};
    color: ${({ theme }) => theme.gray};
  }
`;
