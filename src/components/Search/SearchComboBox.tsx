import {
  GetPropsCommonOptions,
  useCombobox,
  UseComboboxGetInputPropsOptions,
  UseComboboxGetItemPropsOptions,
  UseComboboxGetMenuPropsOptions,
} from "downshift";
import type { BaseHit, Hit } from "instantsearch.js";
import { ChangeEventHandler } from "react";
import { useHits, useSearchBox } from "react-instantsearch-hooks-web";

export interface SearchComboBoxProps {
  onSelect?: (value: string) => void;
  onClose?: () => void;
  children: (props: {
    query: string;
    hits: Array<Hit<BaseHit>>;
    getMenuProps: (
      options?: UseComboboxGetMenuPropsOptions,
      otherOptions?: GetPropsCommonOptions
    ) => any;
    getInputProps: (
      options?: UseComboboxGetInputPropsOptions,
      otherOptions?: GetPropsCommonOptions
    ) => any;
    highlightedIndex: number;
    getItemProps: (options: UseComboboxGetItemPropsOptions<any>) => any;
    onClear?: () => void;
  }) => JSX.Element;
}

export const SearchComboBox = ({
  onSelect,
  onClose,
  children,
}: SearchComboBoxProps) => {
  const { hits } = useHits();
  const { query, clear, refine } = useSearchBox();
  const { getMenuProps, getInputProps, highlightedIndex, getItemProps } =
    useCombobox({
      inputValue: query,
      items: hits,
      stateReducer: (state, actionAndChanges) => {
        const { type, changes } = actionAndChanges;

        switch (type) {
          case useCombobox.stateChangeTypes.InputKeyDownEscape:
            if (onClose) {
              onClose();
            }
            return state;
          default:
            return changes;
        }
      },
      onSelectedItemChange: ({ selectedItem }) => {
        if (onSelect) {
          onSelect(selectedItem.url as string);
        }
      },
    });

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    refine(event.currentTarget.value);
  };

  return children({
    query,
    hits,
    getMenuProps,
    getInputProps: (
      options?: UseComboboxGetInputPropsOptions,
      otherOptions?: GetPropsCommonOptions
    ) => getInputProps({ ...options, value: query, onChange }, otherOptions),
    highlightedIndex,
    getItemProps,
    onClear: clear,
  });
};
