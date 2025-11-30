'use client'
import { ChangeEvent, useState, useActionState } from 'react';
import {createJobWatchList, State} from '@/app/lib/actions';

const optionsList = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

export default function Form() {
  // State holds an array of selected options
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const initialState:State = {message: null, errors: {}};
  const [state, formAction] = useActionState(createJobWatchList, initialState)

  const handleCheckboxChange = (event:ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      // If checked, add the value to the array
      setSelectedOptions((prevSelected) => [...prevSelected, value]);
    } else {
      // If unchecked, remove the value from the array
      setSelectedOptions((prevSelected) =>
        prevSelected.filter((option) => option !== value)
      );
    }
  };

  return (
    <form action={formAction}>
      {optionsList.map((option) => (
        <div key={option}>
          <label>
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)} // Check if the option is in the array
              onChange={handleCheckboxChange}
            />
            {option}
          </label>
        </div>
      ))}
      <p>Selected: {selectedOptions.join(', ')}</p>
      <button type='submit'>
        Submit
      </button>
    </form>
  );
};

