import styled from 'styled-components'

export const CardStyles = styled.div`
  position: relative;
  width: 100%;
  height: 4em;
  background: #eee;
  text-align: center;
  padding: 0.5em;
  box-sizing: border-box;
  user-select: none;
  cursor: pointer;
  p {
    margin: 0;
  }
  h2 {
    margin: 0;
  }
`

export const ColumnStyles = styled.div`
  width: 100px;
  padding: 0 10px;
  border-width: 0 1px 0 0;
  border-color: black;
  border-style: solid;
  display: flex;
  flex-direction: column;
  row-gap: 0.5em;
  :first-of-type {
    border-width: 0 1px;
  }
`

export const ColumnTitle = styled.h1`
  font-size: 1em;
  margin: 0.5em 0;
  text-align: center;
`

export const KanbanDisplay = styled.div`
  display: flex;
  height: 32em;
`
