/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/prefer-default-export */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './dropdown.scss';
// import Arrow from './assets/dropdown-arrow.svg';

/**
 * Primary UI component for user interaction
 */

export const Dropdown = ({
  searchable, ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCollectionTitle, setSelectedCollectionTitle] = useState('');
  const [selected, setSelected] = useState([]);

  const list = [
    { id: 0, title: 'featured', selected: false },
    { id: 1, title: 'city', selected: false },
    { id: 2, title: 'cool', selected: false },
  ];

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

  const selectCollection = (title, id) => {
    setIsOpen(false);
    setSelectedCollectionTitle(title);
    selected.pop();
    setSelected((selected) => selected.concat(id));
    /*
    if (selected.length > 1) {
      let prevSelected = selected[selected.length - 2];
      list[list.findIndex(el => el.id === prevSelected)].selected = false;
    }
    */
    props.handleCollectionChange(id);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const handleKeyDown = (e) => {
    // check keys if you want
    if (e.keyCode === 13) {
      toggle();
    }
  };
  /*
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
      console.log('annen');
      return (
        tempList.map((item) => (
          <button
            type="button"
            className="dd-list-item"
            key={item.id}
            onClick={() => selectItem(item.title, item.id, item.key)}
          >
            {item.title}
            {' '}
            {item.selected && 'selected'}
          </button>
        ))
      );
    }

    return <div className="dd-list-item no-result">{searchable[1]}</div>;
  };
*/
  const isSelected = (item) => {
    console.log(selected);
    if (selected && selected.includes(item.id)) {
      return true;
    }
    return false;
  };
  return (
    <div className={`dd-wrapper ${isOpen ? 'dd-open' : ''}`} onClick={toggle} onKeyDown={handleKeyDown} role="button" tabIndex={0}>
      <div className="dd-header">
        {selectedCollectionTitle ? (
          <div className="dd-header-chosen">{selectedCollectionTitle}</div>
        ) : (
          <div className="dd-header-title">Collections</div>
        )}
      </div>
      {isOpen && (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <ul className="dd-list" onClick={(e) => e.stopPropagation()}>
        {list.map((item) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <li
            className={`dd-list-item${isSelected(item) ? ' dd-list-item-selected' : ''}`}
            key={item.id}
            onClick={() => selectCollection(item.title, item.id)}
          >
            {item.title}
          </li>
        ))}
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
