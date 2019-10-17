import React, { useState, useRef, useEffect } from "react";
import Icon from "./Icon";
import "./Dropdown.scss";

const Dropdown = ({
  label,
  numberOfDataGroups,
  dataIsRelated,
  onChange,
  options,
  placeholder,
  selectedOption,
  size
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [distanceToEdges, setDistanceToEdges] = useState({
    top: null,
    right: null,
    bottom: null,
    left: null
  });

  // Refs
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);
  const searchRef = useRef(null);

  // Event Handlers
  const handleOpeningClosingDropdown = event => {
    // Close if event does not originate within dropdown component
    if (!dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }

    // close if Escape key is pressed
    if (event.key === "Escape") {
      setIsOpen(false);
    }
    // Close if a selection occurs
    if (
      listRef.current.contains(event.target) &&
      isOpen &&
      (event.type === "click" ||
        event.type === "mousedown" ||
        event.key === "Enter" ||
        event.key === "Tab")
    ) {
      setIsOpen(false);
    }

    // Event originates at dropdown button
    if (
      buttonRef.current === event.target &&
      (event.type === "click" ||
        event.key === "Enter" ||
        event.key === "ArrowDown" ||
        event.key === " ")
    ) {
      if (!isOpen) {
        event.preventDefault();
        setIsOpen(true);
      }
      if (isOpen && event.type === "click") {
        setIsOpen(false);
      }
    }
  };

  const handleFocusAndSelectionOfOptions = event => {
    if (
      document.activeElement === searchRef.current &&
      event.key === "ArrowDown"
    ) {
      listRef.current.firstChild.focus();
    }
    // Handles events that originate within options list
    if (listRef.current.contains(event.target)) {
      if (event.key === "ArrowUp") {
        return event.target.previousElementSibling
          ? event.target.previousElementSibling.focus()
          : searchRef.current.focus();
      }
      if (event.key === "ArrowDown") {
        return event.target.nextElementSibling
          ? event.target.nextElementSibling.focus()
          : event.target.focus();
      }
      if (event.key === "Enter" || event.type === "click") {
        const nextSelectedOption = options.find(
          option => option.id === parseInt(document.activeElement.id, 10)
        );
        return onChange(nextSelectedOption);
      }
    }
  };

  const handleSearch = () => {};

  const handleResize = () => {};

  // Handle click outside
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOpeningClosingDropdown);
      searchRef.current.focus();
    } else {
      document.removeEventListener("mousedown", handleOpeningClosingDropdown);
    }
    return () => {
      document.removeEventListener("mousedown", handleOpeningClosingDropdown);
    };
  }, [isOpen]);

  // Determine whether sufficient space exists for menu below on resize.
  useEffect(() => {
    document.addEventListener("resize", handleResize);
  });

  return (
    <div
      role="menu"
      tabIndex="-1"
      className="Dropdown"
      ref={dropdownRef}
      onKeyDown={handleOpeningClosingDropdown}
      onClick={handleOpeningClosingDropdown}
    >
      <button
        className="Dropdown__button Dropdown__button--medium"
        type="button"
        ref={buttonRef}
        aria-pressed={isOpen}
        aria-expanded={isOpen}
      >
        {selectedOption.name}
      </button>
      <i className="Dropdown__button__icon" />
      <div
        className={`Dropdown__list__wrapper--${isOpen ? "visible" : "hidden"}`}
      >
        <input
          className="Search_input"
          ref={searchRef}
          onKeyDown={handleFocusAndSelectionOfOptions}
          type="text"
          value={userInput}
          onChange={event => setUserInput(event.target.value)}
        />
        <ul ref={listRef} className="Dropdown__list__filtered_items">
          {options.map((option, index) => {
            return (
              <li
                className="Dropdown__list_item"
                key={option.id}
                onClick={handleFocusAndSelectionOfOptions}
                onKeyDown={handleFocusAndSelectionOfOptions}
                id={option.id}
                role="option"
                tabIndex="-1"
                aria-posinset={index + 1}
                aria-selected={document.activeElement.id === option.id}
                aria-setsize={options.length}
              >
                <div>{option.name}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
// // Search Shenanigans
// const filteredAndSortedOptions = () => {
//   const matches = [];
//   options.forEach((option, index) =>
//     option.splitName.forEach(word => {
//       if (word.startsWith(userInput)) {
//         matches.push({ index: option });
//       }
//     }),
//   );
//   return matches;
// };

// // // Add name as separate word array to each option
// // options.map(
// //   option => (option.splitName = option.name.toLowerCase().split(' ')),
// // );
