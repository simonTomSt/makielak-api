import { ContentType } from "@prisma/client";
import { AboutUsStructureDto, CertificatesStructureDto, FooterStructureDto, HomePageStructureDto, ServicesStructureDto } from "./dto/structures";
import { ContactStructureDto } from "./dto/structures/contact-structure.dto";

export const contentTypeDtoMap = {
    [ContentType.HOME_PAGE]: HomePageStructureDto,
    [ContentType.ABOUT_US]: AboutUsStructureDto,
    [ContentType.SERVICES]: ServicesStructureDto,
    [ContentType.CERTIFICATES]: CertificatesStructureDto,
    [ContentType.CONTACT]: ContactStructureDto,
    [ContentType.FOOTER]: FooterStructureDto,
};
  
export const contentFileFields = {
    [ContentType.HOME_PAGE]: ['serviceItems'],
    [ContentType.ABOUT_US]: ['serviceItems'],
    [ContentType.SERVICES]: ['serviceItems'],
    [ContentType.CERTIFICATES]: ['serviceItems'],
    [ContentType.CONTACT]: ['serviceItems'],
    [ContentType.FOOTER]: ['serviceItems']
  };