/* eslint-disable @cspell/spellchecker */
export interface ISpotifySearchResponse {
  versions: IVersion[];
  available_versions: IAvailableVersion[];
  ref: string;
  heRef: string;
  sections: string[];
  toSections: string[];
  sectionRef: string;
  heSectionRef: string;
  firstAvailableSectionRef: string;
  isSpanning: boolean;
  spanningRefs: string[];
  next: string;
  prev: string;
  title: string;
  book: string;
  heTitle: string;
  primary_category: string;
  type: string;
  indexTitle: string;
  categories: string[];
  heIndexTitle: string;
  isComplex: boolean;
  isDependant: boolean;
  order: number[];
  collectiveTitle: string;
  heCollectiveTitle: string;
  alts: unknown[];
  lengths: number[];
  length: number;
  textDepth: number;
  sectionNames: string[];
  addressTypes: string[];
  titleVariants: string[];
  heTitleVariants: string[];
  index_offsets_by_depth: unknown;
  warnings: unknown[];
}
// eslint-disable-next-line @cspell/spellchecker
interface IAvailableVersion {
  status: string;
  priority: number | string;
  license: string;
  versionNotes: string;
  formatAsPoetry: boolean | string;
  digitizedBySefaria: boolean | string;
  method: string;
  // eslint-disable-next-line @cspell/spellchecker
  heversionSource: string;
  versionUrl: string;
  versionTitleInHebrew: string;
  versionNotesInHebrew: string;
  shortVersionTitle: string;
  shortVersionTitleInHebrew: string;
  extendedNotes: string;
  extendedNotesHebrew: string;
  purchaseInformationImage: string;
  purchaseInformationURL: string;
  hasManuallyWrappedRefs: string;
  language: string;
  title: string;
  versionSource: string;
  versionTitle: string;
  actualLanguage: string;
  languageFamilyName: string;
  isSource: boolean;
  isPrimary: boolean;
  direction: string;
}

interface IVersion {
  status: string;
  priority: number;
  license: string;
  versionNotes: string;
  formatAsPoetry: string;
  digitizedBySefaria: string;
  method: string;
  heversionSource: string;
  versionUrl: string;
  versionTitleInHebrew: string;
  versionNotesInHebrew: string;
  shortVersionTitle: string;
  shortVersionTitleInHebrew: string;
  extendedNotes: string;
  extendedNotesHebrew: string;
  purchaseInformationImage: string;
  purchaseInformationURL: string;
  hasManuallyWrappedRefs: string;
  language: string;
  versionSource: string;
  versionTitle: string;
  actualLanguage: string;
  languageFamilyName: string;
  isSource: boolean;
  isPrimary: boolean;
  direction: string;
  text: string[];
}
