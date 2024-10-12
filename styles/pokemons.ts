import styled from "styled-components";
import { typeColors } from "../utils/typeColors";

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Tr = styled.tr`
  &:hover {
    background-color: #777;
    cursor: pointer;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 10px 10px;

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
  }
`;

export const Th = styled.th`
  background-color: #000000;
  padding: 12px;
  text-align: left;
  border: none;
  border-radius: 5px;
`;

export const Td = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const TypeBadge = styled.span<{ pokemonType: string }>`
  background-color: ${props => typeColors[props.pokemonType.toLowerCase()] || '#777'};
  color: white;
  padding: 10px 10px;
  border-radius: 4px;
  font-size: 0.8em;
  margin-right: 4px;
  margin-bottom: 4px;
  display: inline-block;
`;

export const TypeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px; 
`;