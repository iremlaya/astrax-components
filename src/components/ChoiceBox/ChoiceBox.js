import { FormCtx } from '../Form/Form';
import React,{ useState, useEffect, useContext } from 'react'; 
import PropTypes from 'prop-types';
import Radio from '../Radio';
import Checkbox from '../Checkbox';
import './choicebox.scss';
export const ChoiceBox = ({id, label, multiple, choices, ...props}) => {
    const [selectedChoices, setSelectedChoices] = useState([]);
    const { fields, addField, setFields } = useContext(
        FormCtx
    );
    const field = fields[id] || {};

    useEffect(() => {
        addField({
          field: {id,...props},
          value: [],
        });
      }, []);
    const selectChoice = (event, choice) => {
        setSelectedChoices(() => selectedChoices.concat(choice));
        //console.log(field);
        field.value = selectedChoices;
        setFields(event, field);
    }
    return ( 
        <div className="choicebox-container">
            <p className="cb-label">{label}</p>
            <ul onClick={(e) => e.stopPropagation()}>
            {choices.map(choice => (
                <li
                className="cb-row"
                key={choice.id}
                onClick={(event) => selectChoice(event, choice)}
                >
                    {multiple ? <Checkbox/> :<Radio/>}
                    <p className="cb-choice">
                        {choice.title}
                    </p>
                </li>
            ))}
            </ul>
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
  