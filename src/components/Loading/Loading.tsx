/**
 * @fileoverview Componente Loading com variantes
 */

import type { FC } from "react";
import * as S from "./Loading.styles";

interface LoadingProps {
  readonly text?: string;
}

interface SkeletonProps {
  readonly width?: string;
  readonly height?: string;
  readonly borderRadius?: string;
}

export const Loading: FC<LoadingProps> = ({ text = "Carregando..." }) => {
  return (
    <S.LoadingContainer>
      <S.Spinner />
      <S.LoadingText>{text}</S.LoadingText>
    </S.LoadingContainer>
  );
};

export const Skeleton: FC<SkeletonProps> = ({
  width,
  height,
  borderRadius,
}) => {
  return (
    <S.Skeleton
      $width={width || "100%"}
      $height={height || "20px"}
      $borderRadius={borderRadius || "0.5rem"}
    />
  );
};

export const CardSkeleton: FC<{ count?: number }> = ({ count = 1 }) => {
  if (count === 1) {
    return <S.CardSkeleton />;
  }

  return (
    <S.CardSkeletonContainer>
      {Array.from({ length: count }).map((_, index) => (
        <S.CardSkeletonItem key={index} />
      ))}
    </S.CardSkeletonContainer>
  );
};

export const ListSkeleton: FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <S.ListSkeleton>
      {Array.from({ length: count }).map((_, index) => (
        <S.Skeleton
          key={index}
          $height="60px"
        />
      ))}
    </S.ListSkeleton>
  );
};
