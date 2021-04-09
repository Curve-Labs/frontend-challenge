import React from 'react';
import Cleave from 'cleave.js/react';
import { CleaveOptions } from 'cleave.js/options';

type Props = {
  label: string
  placeholder?: string
  onChange?: ((e: string) => void)
  value?: any
  readOnly?: boolean
  required?: boolean
  minLength?: number
  min?: number
  cleaveConfig?: CleaveOptions
}

function InputNumber(props: Props) {
  let { label, minLength, min, placeholder, onChange, required } = props
  return (
    <div className="input-style">
      <div className="label">{label}</div>
      <div>
        <Cleave
          options={{
            numeral: true,
            numeralThousandsGroupStyle: "thousand",
            numeralDecimalScale: 8,
            ...props.cleaveConfig
          }}
          value={props.value}
          minLength={minLength ? minLength : 1}
          min={min ? min : 1}
          className="input"
          type="text"
          required={required}
          onChange={(e) => onChange && onChange(e.target.rawValue)}
          placeholder={placeholder}
          readOnly={props.readOnly && props.readOnly}
        />
      </div>
    </div>
  )
}

export default InputNumber;