import styled from 'styled-components'

export const CartWrapper = styled.div`
.button:hover {
  background: ${(prop)=> prop.click ? 'var(--lightBlue)' : ''}!important;
}
`