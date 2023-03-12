interface PropType {
  label?: string;
  options: any[];
  getSelectValue: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isLoading: boolean;
}

const CustomSelect = ({ label, options, getSelectValue, isLoading }: PropType) => {
  return (
    <div>
      <label className="block font-medium mb-2" htmlFor="select-field">
        {label}
      </label>
      <select
        className="py-2 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        onChange={e => getSelectValue(e)}
      >
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            {options.map((opt: any, index) => {
              return (
                <option key={index} value={opt}>
                  {opt}
                </option>
              );
            })}
          </>
        )}
      </select>
    </div>
  );
};

export default CustomSelect;
