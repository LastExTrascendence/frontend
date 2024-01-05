import styled from "styled-components";

export default function SearchBar({
  placeholder,
  onChange,
  value,
}: {
  placeholder: string;
  onChange: any;
  value: string;
}) {
  return (
    <SearchBarContainerStyled>
      <input
        className="search-bar"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </SearchBarContainerStyled>
  );
}

const SearchBarContainerStyled = styled.div`
  .search-bar {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 20px;
    background-color: var(--search-bar-color);
    padding: 1.5rem;
    margin-top: 1.5rem;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
