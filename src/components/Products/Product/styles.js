import styled from 'styled-components'

export const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 1s linear;
  }

  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 1s linear;
  }
  & :hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
      background: var(--mainDark);
      opacity: 0.8;
    }
    .card-footer {
      background: rgba(247, 247, 247);
    }
  }
  .cast {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(56, 40, 21, 0.397);
    overflow: hidden;
    width: 100%;
    height: 0;
    transition: 0.5s ease;
    opacity: 0.5;
  }
  .card:hover .cast {
    height: 100%;
    opacity: 1;
    transition: all 0.3s linear;
  }
  .text {
    white-space: nowrap;
    color: rgb(255, 255, 255);
    font-size: 12px !important;
    position: absolute;
    overflow: hidden;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    align-items: center;
  }
`