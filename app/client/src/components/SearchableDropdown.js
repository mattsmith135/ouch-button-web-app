import React from 'react'; 
import AsyncSelect from 'react-select/async';
import axios from 'axios'; 

function SearchableDropdown() {
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
                    label: item.ClientName,
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

    return (
        <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions
        />
    )
}

export default SearchableDropdown; 