import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-rows: 105px auto;
  grid-template-areas: "header" "content";

  background-color: ${({theme}) => theme.COLORS.BACKGROUND_PINK_900};
`;

export const Content = styled.div`
  grid-area: content;
  padding: 50px 80px 0;
  overflow-y: auto;
`;

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const EmptyContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 42px;

  h4 {
    font-size: 24px;
    color: ${({theme}) => theme.COLORS.GRAY_100};
  }
`;