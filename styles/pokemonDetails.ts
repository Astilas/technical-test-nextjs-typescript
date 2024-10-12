import styled from "styled-components";

export const Table = styled.table`
  width: 100vh;
  border-collapse: separate;
  border-spacing: 10px 10px;

  td:nth-child(1) {
    width: 20%; // Column stat name
  }

  td:nth-child(2) {
    width: 50%; // Column stat bar
    text-align: right;
  }

  td:nth-child(3) {
    width: 30%; // Column value
  }

  @media (max-width: 768px) {
    display: block;
    
    thead {
      display: none;
    }

    tbody, tr, td {
      display: block;
    }

    tr {
      margin-bottom: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 10px;
    }

    td {
      border: none;
      position: relative;
      padding-left: 50%;
      text-align: right;
      width: 100% !important; // Reset width for mobile

      &:before {
        content: attr(data-label);
        position: absolute;
        left: 6px;
        width: 45%;
        padding-right: 10px;
        white-space: nowrap;
        text-align: left;
        font-weight: bold;
      }
    }

    td:nth-child(3) {
      padding-left: 0;
    }
  }
`;

export const Container = styled.div`
display: flex;
flex-direction: row;
width: 100vh;
gap: 20px;

@media (max-width: 768px) {
  flex-direction: column;
}
`;

export const StatBar = styled.div<{ width: number }>`
  background-color: #30a7d7;
  height: 10px;
  width: ${props => props.width || 0}%;
  border-radius: 2px;
`;

export const StatBarContainer = styled.div`
  background-color: #f4f4f4;
  height: 10px;
  width: 100%;
  border-radius: 2px;
`;