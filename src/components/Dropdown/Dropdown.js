/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './dropdown.scss';
// import Arrow from './assets/dropdown-arrow.svg';

/**
 * Primary UI component for user interaction
 */

export const Dropdown = ({
  searchable, multiSelect, ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCollectionTitle, setSelectedCollectionTitle] = useState('');
  const [keyword, setKeyword] = useState('');
  const [selected, setSelected] = useState([]);

  const clickRef = useRef(null);
  const searchField = useRef(null);

  const list = [
    { id: 0, title: 'featured', selected: false },
    { id: 1, title: 'city', selected: false },
    { id: 2, title: 'cool', selected: false },
  ];
  useEffect(() => {
    /**
     * Close if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (clickRef.current && !clickRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [clickRef]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOpen) {
        window.addEventListener('click', setIsOpen(false));
      } else {
        window.removeEventListener('click', setIsOpen(false));
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.removeEventListener('click', setIsOpen(false));
  }, []);

  const selectCollection = (item) => {
    setIsOpen(false);
    if (!multiSelect) {
      setSelected(() => selected.pop());
    }
    setSelectedCollectionTitle(item.title);
    setSelected(() => selected.concat(item));
    /*
    if (selected.length > 1) {
      let prevSelected = selected[selected.length - 2];
      list[list.findIndex(el => el.id === prevSelected)].selected = false;
    }
    */
  };

  const toggle = () => {
    setIsOpen(!isOpen);
    setKeyword('');
    // ??????????
    if (isOpen && searchField.current) {
      searchField.current.focus();
      setKeyword('');
    }
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      toggle();
    }
  };
  const filterList = (e) => {
    setKeyword(e.target.value.toLowerCase());
  };

  const listItems = () => {
    let tempList = list;

    if (keyword.length) {
      tempList = list
        .filter((item) => (
          item.title.toLowerCase().slice(0, keyword.length).includes(keyword)
        )).sort((a, b) => {
          if (a.title < b.title) { return -1; }
          if (a.title > b.title) { return 1; }
          return 0;
        });
    }

    if (tempList.length) {
      return (
        tempList.map((item) => (
          <li
            className={`dd-list-item${isSelected(item) ? ' dd-list-item-selected' : ''}`}
            key={item.id}
            onClick={() => selectCollection(item)}
          >
            {item.title}
          </li>
        ))
      );
    }

    return <div className="dd-list-item no-result">{searchable[1]}</div>;
  };

  const isSelected = (item) => {
    if (selected && selected.some((el) => el.id === item.id)) {
      return true;
    }
    return false;
  };
  const renderHeader = () => {
    if (multiSelect) {
      return (
        <div className="dd-header">
          { selected.map((item) => (
            <div className="dd-header-multi-title">
              {item.title}
              {' '}
            </div>
          ))}
        </div>
      );
    }
    if (searchable) {
      return (
        <input
          ref={searchField}
          className="dd-list-search-bar"
          // value={keyword}
          // TODO:: CLEAR INPUT AFTER SELECTION
          placeholder={selectedCollectionTitle || 'Enter the keyword...'}
          onChange={(e) => filterList(e)}
        />
      );
    }
    return (
      <div className="dd-header">
        {selectedCollectionTitle ? (
          <div className="dd-header-chosen">{selectedCollectionTitle}</div>
        ) : (
          <div className="dd-header-title">Collections</div>
        )}
      </div>
    );
  };
  return (
    <div ref={clickRef} className={`dd-wrapper ${isOpen ? 'dd-open' : ''}`} onClick={toggle} onKeyDown={handleKeyDown} role="button" tabIndex={0}>

      {renderHeader()}
      {isOpen && (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <ul className={`dd-list ${searchable ? 'searchable' : ''}`} onClick={(e) => e.stopPropagation()}>
        {listItems()}

      </ul>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  /**
         * Is this the principal call to action on the page?
         */
  searchable: PropTypes.bool,
  /**
         * What background color to use
         */
  headerTitle: PropTypes.string,
  listOpen: PropTypes.bool,
  /**
         * Button contents
         */
  label: PropTypes.string.isRequired,
  /**
         * Optional click handler
         */
  onClick: PropTypes.func,
};

Dropdown.defaultProps = {
  searchable: false,
  listOpen: false,
  headerTitle: 'Title',
  onClick: () => { console.log('pressed'); },
};
