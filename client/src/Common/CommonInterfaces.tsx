import {
  SelectChangeEvent,
  SvgIconTypeMap,
  SxProps,
  TextFieldVariants,
  Theme,
} from '@mui/material';
import { QueryKey, UseQueryOptions } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import { CSSProperties, HTMLInputTypeAttribute } from 'react';
import { AxiosRequestConfig } from 'axios';
import { OverridableComponent } from '@mui/material/OverridableComponent';

// React Query
export type EmptyObject = Record<string, never>;

export type FetchMethod = 'Get' | 'Post' | 'Patch' | 'Put' | 'Delete';

export type QueryOptions<TData> = Omit<
  UseQueryOptions<TData, unknown, TData, QueryKey>,
  'initialData' | 'queryKey'
> & {
  initialData?: () => undefined;
};
export interface IMutation<TData> {
  path: string;
  method: FetchMethod;
  data: TData;
  headers?: AxiosRequestConfig['headers'];
}

// Accordion
export interface IAccordion {
  labelClosed?: string;
  labelOpen?: string;
  labelDefault?: string;
  summaryString?: string;
  children?: JSX.Element;
  labelStyle?: SxProps<Theme> | undefined;
  summaryStyle?: SxProps<Theme> | undefined;
  accordionSx?: SxProps<Theme> | undefined;
  isOpenDefault?: boolean;
}

// Formik
export interface IOptionsFormikSelect {
  text: string;
  value: number | string;
  colorText?: string;
  backgroundColor?: string;
}

export interface ISelectOnChangeHandler<TValues> {
  formik: FormikProps<TValues>;
  options: IOptionsFormikSelect[];
  event: SelectChangeEvent<string | number>;
  textOrValue: boolean;
  name: string;
  setEffectedFieldName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onItemClicked?: (formik: FormikProps<any>, event: SelectChangeEvent<string | number>) => void;
  setShowPopupStatus?: ReactSetState<string | undefined>;
}
export interface IFormikSelect<TValues> {
  formik: FormikProps<TValues>;
  label: string;
  name: string;
  setEffectedFieldName?: string;
  value: number | string;
  style?: SxProps;
  styleWrap?: SxProps;
  options: IOptionsFormikSelect[];
  colorStyle?: SxProps;
  textOrValue?: boolean;
  imgLabel?: string;
  disabled?: boolean;
  setIsImgLabelClicked?: (isClicked: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onItemClicked?: (formik: FormikProps<any>, event: SelectChangeEvent<string | number>) => void;
  optionsPaddingRight?: string;
  setShowPopupStatus?: ReactSetState<string | undefined>;
}

export interface IFormikInput {
  name: string;
  value?: string | number;
  required?: boolean;
  variant?: TextFieldVariants;
  label?: string;
  autoFocus?: boolean;
  autoComplete?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  style?: SxProps;
  styleTextArea?: CSSProperties & SxProps;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  disableUnderline?: boolean;
  textAlign?: CSSProperties['textAlign'];
  outerLabel?: boolean;
}

export type ReactSetState<TState> = React.Dispatch<React.SetStateAction<TState>>;

// ProtectRoute.tsx
export interface IProtectRoute {
  children: React.ReactNode;
}

// useWindowSize.tsx
export interface ISize {
  width: number | undefined;
  height: number | undefined;
}

export interface IGetTooltipStyle {
  tooltipSx?: SxProps;
  arrowSx?: SxProps;
}

export type MuiIcon = OverridableComponent<SvgIconTypeMap<object, 'svg'>> & { muiName: string };
