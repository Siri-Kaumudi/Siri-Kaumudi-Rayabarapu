import { useState } from 'react';

function NumericKeypad({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleKey = (key) => {
    setValue(value + key);
  };

  const handleClear = () => {
    setValue('');
  };

  const handleSubmit = () => {
    onSubmit(value);
    setValue('');
  };

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '-'];

  return (
    <div className="p-4">
      <input
        type="text"
        value={value}
        readOnly
        className="w-full p-2 border rounded mb-4"
      />
      <div className="grid grid-cols-3 gap-2">
        {keys.map((key) => (
          <button
            key={key}
            onClick={() => handleKey(key)}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            {key}
          </button>
        ))}
        <button
          onClick={handleClear}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear
        </button>
        <button
          onClick={handleSubmit}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default NumericKeypad;