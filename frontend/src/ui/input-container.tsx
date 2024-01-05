import styled from "styled-components";

export default function InputContainer({
  width = "300px",
  height = "45px",
  icon,
  placeholder,
  value = "",
  borderRadius = "10px",
  onChange,
}: {
  width: string;
  height: string;
  icon?: string;
  placeholder: string;
  value?: string;
  borderRadius: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <InputContainerStyled width={width} height={height}>
      <InputWrapperStyled>
        {icon && <InputIconStyled src={icon} />}
        <InputStyled
          placeholder={placeholder}
          $borderRadius={borderRadius}
          onChange={onChange}
          value={value}
        />
      </InputWrapperStyled>
    </InputContainerStyled>
  );
}

const InputContainerStyled = styled.div<{
  width: string;
  height: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: 1rem 0;
`;

const InputWrapperStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const InputIconStyled = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;
`;

const InputStyled = styled.input<{
  $borderRadius: string;
}>`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0.5rem;
  color: var(--white);
  border-radius: ${(props) => props.$borderRadius};
  background-color: var(--input-container-color);
`;
