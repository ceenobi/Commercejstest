import styled from 'styled-components'
export const CheckoutWrapper = styled.div`
  .wrapper-progressBar {
    width: 100%;
  }

  .progressBar {
    margin: 10px 30px;
  }

  .progressBar li {
    list-style-type: none;
    float: left;
    width: 50%;
    position: relative;
    text-align: center;
  }

  .progressBar li:before {
    content: ' ';
    line-height: 30px;
    border-radius: 50%;
    width: 17px;
    height: 17px;
    border: 1px solid #ddd;
    border-left: none;
    display: block;
    text-align: center;
    margin: 0 auto 10px;
    background-color: #eee;
  }
  .progressBar li:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: #ddd;
    top: 15px;
    left: -50%;
    z-index: -1;
  }

  .progressBar li:first-child:after {
    content: none;
  }

  .progressBar li.active {
    color: var(--mainDark);
  }

  .progressBar li.active:before {
    border-color: var(--mainYellow);
    background-color: var(--mainYellow);
  }

  .progressBar .active:after {
    background-color: blue;
  }
  @media (min-width: 992px) {
    container {
      max-width: 30%!important;
    }
  }
`