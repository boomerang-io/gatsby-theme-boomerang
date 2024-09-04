import React, { useCallback, useEffect, useState } from "react";
import cx from "classnames";
import Downshift from "downshift";
import debounce from "lodash.debounce";
import { useQuery } from "react-query";
import { InlineLoading } from "@carbon/react";
import { TextInput } from "@boomerang-io/carbon-addons-boomerang-react";
import { resolver, serviceUrl } from "@gatsby-theme-boomerang/config/servicesConfig";
import styles from "./AutocompleteInput.module.scss";

export default function AutocompleteInput(props) {
  const {
    setFieldValue,
    handleChange,
    optionsEIAAvailable,
    hasValidId,
    setIsIdValid,
    isInBasicDetails,
    ...inputProps
  } = props;
  const [optionsQuery, setOptionsQuery] = useState("");
  const [basedOnId, setBasedOnId] = useState(hasValidId);

  /** Get auto complete options */
  const getOptionsUrl = serviceUrl.getClientNames({
    query: optionsQuery,
  });

  const queryOptions = useQuery({
    queryKey: getOptionsUrl,
    queryFn: resolver.query(getOptionsUrl, undefined),
    enabled: false,
  });

  // Open menu on search focus only when there is a value
  const handleSearchFocus = (e, openMenu) => {
    if (e.target.value) {
      openMenu();
    }
  };

  useEffect(() => {
    if (optionsQuery) {
      queryOptions.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsQuery]);

  // Keep the function as a constant for debounce to work
  const handleQueryChange = (e) => {
    setOptionsQuery(e.target.value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearchRequest = useCallback(debounce(handleQueryChange, 300), [optionsQuery]);

  const optionsArray = optionsQuery && (queryOptions)?.data?.suggest?.["autocomplete-fuzzy"]?.length > 0
    ? (queryOptions)?.data?.suggest?.["autocomplete-fuzzy"]?.reduce((acc, obj) => (obj?.options ? [...acc, ...obj?.options] : [...acc]), [])
    : [];

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <Downshift onSelect={(selection) => setFieldValue(inputProps.id, selection)}>
          {(downshiftProps) => {
            const { getInputProps, getRootProps, getItemProps, getMenuProps, isOpen, openMenu } = downshiftProps;
            return (
              <div className={styles.downshift}>
                <div {...getRootProps(undefined, { suppressRefError: true })}>
                  <TextInput
                    {...getInputProps({
                      ...inputProps,
                      onFocus: (e) => handleSearchFocus(e, openMenu),
                      onChange: (e) => {
                        handleChange(e);
                        setBasedOnId(false);
                        if (e.target.value && optionsEIAAvailable) {
                          debouncedSearchRequest(e);
                        }
                      },
                    })}
                  />
                </div>
                {isOpen &&
                  (Boolean(optionsArray.length) ? (
                    <div
                      className={cx({
                        [styles.optionsContainer]: true,
                        [styles.basicDetails]: isInBasicDetails,
                      })}
                    >
                      <ul {...getMenuProps({ className: styles.options })}>
                        {optionsArray.map((option, index) => {
                          return (
                            <li
                              {...getItemProps({
                                className: styles.option,
                                item: option.text,
                                key: index,
                                id: index,
                                index,
                              })}
                            >
                              {option.text}
                            </li>
                          );
                        })}
                        <li
                          {...getItemProps({
                            className: cx(styles.option, styles.optionUse),
                            item: optionsQuery,
                            key: optionsArray.lenght,
                            id: optionsArray.lenght,
                            index: optionsArray.lenght,
                          })}
                        >
                          {`Use ${optionsQuery}`}
                        </li>
                      </ul>
                    </div>
                  ) : (
                    optionsQuery && (
                      <div
                        className={cx({
                          [styles.optionsContainer]: true,
                          [styles.basicDetails]: isInBasicDetails,
                        })}
                      >
                        <ul {...getMenuProps({ className: styles.options })}>
                          <li
                            {...getItemProps({
                              className: cx(styles.option, styles.optionUse),
                              item: optionsQuery,
                              key: optionsArray.lenght,
                              id: optionsArray.lenght,
                              index: optionsArray.lenght,
                            })}
                          >
                            {`Use ${optionsQuery}`}
                          </li>
                        </ul>
                      </div>
                    )
                  ))}
              </div>
            );
          }}
        </Downshift>
        {basedOnId && <InlineLoading status="finished" className={styles.validityStatusComponent} description="" />}
      </div>
      <p className={cx(styles.message, { [styles.isValid]: basedOnId })}>
        The Organization has been updated based off of the ID
      </p>
    </div>
  );
}
