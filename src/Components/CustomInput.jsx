import React from 'react'

const CustomInput = ({
    name, 
    placeholder,
    value
}) => {
  return (
    <div>
        <input 
            style={{
                width: "100%",
                height: "52px",
                border: "1px solid #535770",
                borderRadius: "8px",
                padding : "16px",
                color: "black",
                outline: "none",
                backgroundColor: "#E9EAEC",

            }}
            type="text" 
            name={name} 
            value={value} 
            placeholder={placeholder} 
        />
    </div>

  )
}

export default CustomInput