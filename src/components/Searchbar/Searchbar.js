/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './searchbar.scss';
// import Arrow from './assets/dropdown-arrow.svg';

/**
 * Primary UI component for user interaction
 */

export const Searchbar = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [search, setSearch] = useState('');

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
    setSearch(item.title);
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
    setIsOpen(true);
    setKeyword(e.target.value.toLowerCase());
    setSearch(e.target.value);
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
            className={`searchbar-list-item${isSelected(item) ? ' searchbar-list-item-selected' : ''}`}
            key={item.id}
            onClick={() => selectCollection(item)}
          >
            {item.title}
          </li>
        ))
      );
    }

    return <div className="dd-list-item no-result"> </div>;
  };

  const isSelected = (item) => {
    if (search && search === item.title) {
      return true;
    }
    return false;
  };
  const cancel = () => {
    setKeyword('');
    setSearch('');
    setIsOpen(false);
  };
  const renderHeader = () => (
    <div>
      {search && <div className="cancel" onClick={cancel} />}
      {search ? <div className="search-bold" /> : <div className="search-fade" />}
      <input
        ref={searchField}
        className="searchbar-list-search-bar"
        value={search}
        placeholder="Enter the keyword..."
        onChange={(e) => filterList(e)}
      />
    </div>

  );
  return (
    <div ref={clickRef} className={`searchbar-wrapper ${isOpen ? 'dd-open' : ''}`} onClick={toggle} onKeyDown={handleKeyDown} role="button" tabIndex={0}>
      {renderHeader()}
      {isOpen && (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <ul className="searchbar-list searchable" onClick={(e) => e.stopPropagation()}>
        {listItems()}

      </ul>
      )}
    </div>
  );
};

Searchbar.propTypes = {
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

Searchbar.defaultProps = {
  searchable: false,
  listOpen: false,
  headerTitle: 'Title',
  onClick: () => { console.log('pressed'); },
};
