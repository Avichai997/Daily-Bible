export interface IDailyLessons {
  date: string;
  timezone: string;
  calendar_items: ICalendarItem[];
}

interface ICalendarItem {
  title: ILanguageOptions;
  displayValue: ILanguageOptions;
  url: string;
  ref?: string;
  heRef?: string;
  order: number;
  category: string;
  extraDetails?: IExtraDetails;
  description?: ILanguageOptions;
}

interface IExtraDetails {
  // eslint-disable-next-line @cspell/spellchecker
  aliyot: string[];
}

interface ILanguageOptions {
  en: string;
  he: string;
}

export interface ILessonSource {
  versions: IVersion[];
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
  lengths: number[];
  length: number;
  textDepth: number;
  sectionNames: string[];
  addressTypes: string[];
  titleVariants: string[];
  heTitleVariants: string[];
  warnings: unknown[];
}

interface IVersion {
  status: string;
  priority: number;
  license: string;
  versionNotes: string;
  formatAsPoetry: string;
  method: string;
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
  actualLanguage: string;
  languageFamilyName: string;
  isBaseText: string;
  isSource: boolean;
  isPrimary: boolean;
  direction: string;
  language: string;
  versionSource: string;
  versionTitle: string;
  text: string[][];
}
