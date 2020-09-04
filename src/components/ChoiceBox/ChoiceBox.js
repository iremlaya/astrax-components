import { FormCtx } from '../Form/Form';
import React,{ useState, useEffect, useContext } from 'react'; 
import PropTypes from 'prop-types';
import Radio from '../Radio';
import Checkbox from '../Checkbox';
import './choicebox.scss';
import { check } from 'prettier';
export const ChoiceBox = ({id, label, multiple, choices, ...props}) => {
    const [selectedChoices, setSelectedChoices] = useState([]);
    const [selectedChoicesHistory, setSelectedChoicesHistory] = useState([]);
    const { fields, addField, setFields } = useContext(
        FormCtx
    );
    const field = fields[id] || {};

    useEffect(() => {
        addField({
          field: {id,...props},
          value: "",
        });
      }, []);
    const selectChoice = (event, choice) => {

        if (!multiple) {
            setSelectedChoices(() => selectedChoices.pop());
        }
        if(selectedChoices.includes(choice)) {
            setSelectedChoices(() => selectedChoices.splice(selectedChoices.indexOf(choice),1));
        }else{
            setSelectedChoices(() => selectedChoices.concat(choice));
            setSelectedChoicesHistory(() => selectedChoicesHistory.concat(choice));
        }
        
        field.value = choice.title;
        setFields(null, field);
    }
    const check = (choice) => {
        
        if (!selectedChoices.includes(choice) && selectedChoicesHistory.includes(choice)) {
            
            return false;
        }
        if (selectedChoices.includes(choice)) {
            
            return true;
        }
        return null;
    }
    return ( 
        <div className="choicebox-container" {...props}>
            <div className="choicebox-wrapper">
                <p className="cb-label">{label}</p>
                <ul onClick={(e) => e.stopPropagation()}>
                {choices.map(choice => (
                    <li
                    className="cb-row"
                    key={choice.id}
                    onClick={(event) => selectChoice(event, choice)}
                    >
                        {multiple ? <Checkbox/> :<Radio checked={check(choice)}/>}
                        <p className="cb-choice">
                            {choice.title}
                        </p>
                    </li>
                ))}
                </ul>
            </div>
            
        </div>
        
     
    ); 

}


ChoiceBox.propTypes = {

    multiple: PropTypes.bool,
    label: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    choices: PropTypes.array,
    /**
           * Optional click handler
           */
    onClick: PropTypes.func,
  };
  
  ChoiceBox.defaultProps = {
    multiple: false,
    label: "",
    id: null,
    choices:[],
    onClick: () => { console.log('pressed'); },
  };
  