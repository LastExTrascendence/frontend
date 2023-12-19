import styled from "styled-components";

interface CardProps {
  title?: string;
  children: React.ReactElement;
  width?: string;
  height?: string;
  isTransparent?: boolean;
}

export default function Card({
  title,
  width = "480px",
  height = "560px",
  children,
  isTransparent = false,
}: CardProps) {
  return (
    <CardStyled $width={width} $height={height} $isTransparent={isTransparent}>
      <CardContentWrapperStyled>
        {title && <CardHeaderStyled>{title}</CardHeaderStyled>}
        {children}
      </CardContentWrapperStyled>
    </CardStyled>
  );
}

const CardStyled = styled.div<{
  $width: string;
  $height: string;
  $isTransparent: boolean;
}>`
  display: flex;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: var(--light-gray);
  box-shadow: 0px 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.25);
  opacity: ${(props) => (props.$isTransparent ? 0 : 1)};
`;

const CardHeaderStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  color: var(--main-dark-purple);
`;

const CardContentWrapperStyled = styled.div`
  width: 400px;
  height: 470px;
  border-radius: 85px;
  background: var(--white);
  box-shadow: 0px 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 40px 0;
`;
