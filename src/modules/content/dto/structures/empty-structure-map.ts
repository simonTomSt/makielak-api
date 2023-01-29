import { ContentType } from '@prisma/client';
import { serialize } from 'class-transformer';
import { HomePageStructureDto } from './home-page-structure.dto';

const emptyStructureMap = new Map();

emptyStructureMap.set(ContentType.HOME_PAGE, {
  welcomeTitle: '',
  welcomeSubtitle: '',
  welcomeButtonText: '',
  aboutUsText: '',
  offerTitle: '',
  offerButtonText: '',
  serviceItems: [
    {
      title: '',
      description: '',
    },
  ],
});

export const createEmptyStructure = (name: ContentType) => {
  const structure = emptyStructureMap.get(name);

  if (structure) return JSON.stringify(structure);

  return null;
};
