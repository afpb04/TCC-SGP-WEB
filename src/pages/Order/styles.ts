import styled from 'styled-components';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;

    display: flex;
    align-items: center;
    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
      display: flex;
    }
    h1 {
      margin-left: 500px;
    }
    svg {
      color: #999591;
      width: 24px;
      height: 24px;
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 32px auto;
  display: flex;
`;
export const Orders = styled.div`
  flex: 1;
  h1 {
    font-size: 36px;
  }
  > p {
    margin-top: 8px;
    color: #ff9000;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 16px;
      background: #ff9000;
      margin: 0 8px;
    }
  }
`;
export const NextOrders = styled.div`
  margin-top: 64px;

  div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;
    height: 100px;

    > strong {
      color: #999591;
      font-size: 20px;
      font-weight: 400;
    }

    &::before {
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      content: '';
      background: #ff9000;
    }
    strong {
      font-size: 32px;
      color: #fff;
      font-weight: 400;
    }
    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;
    }
    svg {
      width: 30px;
      height: 30px;
      color: #ff9000;
      margin-right: 8px;
    }
  }
`;
export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
`;
export const Product = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }
  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #f4ede8;
  }
  svg {
    color: #ff9000;
    margin-right: 8px;
  }
  div {
    flex: 1;
    background: #3e3b47;
    display: grid;
    grid-template-columns: 0.3fr 0.8fr 1fr 0.5fr 0.5fr;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }
    button {
      margin: 0;
    }
    strong {
      margin-left: 24px;
      color: #fff;
      font-size: 20px;
    }
  }
`;
