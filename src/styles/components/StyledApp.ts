import styled from "styled-components";

const StyledApp = {
    Wrap: styled.div`
      padding: 10px;
    `,
    Row: styled.div`
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      align-items: center;
    `,
    GridRow: styled.div`
      display: grid;
      grid-template-columns: 0.85fr 2fr 3fr;
      margin-bottom: 20px;
    `
}

export const StyledLabel = styled.label`
  margin-right: 10px;
`

export default StyledApp