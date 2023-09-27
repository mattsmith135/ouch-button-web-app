import React, { useState, useEffect } from 'react'; 
import AsyncSelect from 'react-select/async';
import axios from 'axios'; 

function SearchableDropdown({ onSelect }) {
    const [selectedValue, setSelectedValue] = useState(null); 

    const filterOptions = (inputValue, options) => {
        return options.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    }; 

    const loadOptions = (inputValue, callback) => {
        const url = "http://localhost:5000/clientdata";

        axios.get(url)
            .then((response) => {
                const clientRes = response.data; 

                const options = clientRes.map((item) => ({
                    value: item.ClientID,
                    label: `${item.ClientName} (${item.ClientID})`,
                }))

                setTimeout(() => {
                    callback(filterOptions(inputValue, options)); 
                }, 1000); 
            })
            .catch((error) => {
                console.error("Error fetching data:", error); 
                callback([]); 
            });
    }

    const onChangeSelectedOption = e => {
        setSelectedValue(e.value); 
    }

    useEffect(() => {
        if (selectedValue) {
            onSelect(selectedValue); // Pass selected value to parent component
        }
    }, [selectedValue, onSelect])

    return (
        <AsyncSelect
            onChange={onChangeSelectedOption}
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions
        />
    )
}

export default SearchableDropdown; 