import { useCreator as useCreatorContext } from '../contexts/CreatorContext';

export function useCreator() {
  return useCreatorContext();
}

