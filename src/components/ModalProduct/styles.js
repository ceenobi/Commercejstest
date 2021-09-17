import styled from 'styled-components'

export const ModalWrapper = styled.div`
  .modal {
    background: var(--mainWhite);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-content {
      width: 500px;
  }
  .modal-body {
      padding: 10px;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
  }
  .modal-footer {
      padding: 10px;
  }
`
