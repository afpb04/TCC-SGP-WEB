import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;
export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }
  button {
    margin-left: auto;
    background: transparent;
    border: 0;
  }
  svg {
    color: #999591;
    width: 20px;
    height: 20px;
  }
  h1 {
    a {
      text-decoration: none;
      color: #fff;
    }
  }
`;
export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
  }
  span {
    color: #f4ede8;
  }
  strong {
    color: #ff9000;
  }
`;
export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;
export const Products = styled.div`
  flex: 1;
  h1 {
    font-size: 36px;
  }
  p {
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
export const Product = styled.div`
  margin-top: 12px;

  div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

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
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    strong {
      margin-left: 24px;
      color: #fff;
    }
    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;
    }
    svg {
      height: 20px;
      width: 20px;
      color: #ff9000;
      margin-right: 8px;
    }
  }
`;
