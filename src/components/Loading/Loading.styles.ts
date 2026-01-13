/**
 * @fileoverview Estilos do componente Loading
 */

import styled, { css } from "styled-components";

interface SkeletonProps {
  $width?: string;
  $height?: string;
  $borderRadius?: string;
}

const shimmerAnimation = css`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.borderLight} 0%,
    ${({ theme }) => theme.colors.border} 50%,
    ${({ theme }) => theme.colors.borderLight} 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Skeleton = styled.div<SkeletonProps>`
  width: ${({ $width }) => $width || "100%"};
  height: ${({ $height }) => $height || "20px"};
  border-radius: ${({ $borderRadius, theme }) =>
    $borderRadius || theme.borderRadius.md};
  ${shimmerAnimation}
`;

export const CardSkeleton = styled.div`
  width: 100%;
  max-width: 340px;
  aspect-ratio: 1.586;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  margin: 0 auto;
  ${shimmerAnimation}
`;

export const CardSkeletonContainer = styled.div`
margin: auto 20px;
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  overflow-x: auto;
  padding: ${({ theme }) => theme.spacing.md} 0;
  scroll-snap-type: x mandatory;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const CardSkeletonItem = styled.div`
  flex: 0 0 auto;
  width: 100%;
  max-width: 340px;
  aspect-ratio: 1.586;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  scroll-snap-align: center;
  ${shimmerAnimation}
`;

export const ListSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;
