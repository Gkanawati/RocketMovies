import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-rows: 105px auto;
  grid-template-areas: "header" "content";
`;

export const Content = styled.div`
  grid-area: content;
  padding: 50px 80px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 40px;

  > div a {
    display: flex;
    align-items: center;
    gap: 12px;
    color: ${({ theme }) => theme.COLORS.PINK};

    margin-bottom: 12px;
  }

  .tags {
    display: flex;
    gap: 24px;
    padding: 16px;
    border-radius: 8px;
    flex-wrap: wrap;
    background: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
`;