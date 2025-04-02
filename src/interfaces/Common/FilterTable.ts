export interface FilterItemType {
  isCheckbox?: boolean;
  isDate?: boolean;
  isSet?: boolean;
  isRange?: boolean;
  minValue?: string;
  maxValue?: string;
  startDate?: string;
  endDate?: string;
}

export interface FilterInputType {
  label?: string;
  value?: string;
}