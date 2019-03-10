import React from 'react'

export const FormGroup = ({ className, title, error, children }) => (
  <div className={'mb-6 ' + className}>
    {!!title && (
      <label
        htmlFor={title}
        className="text-sm text-grey-600 font-bold mb-2 block "
      >
        {title}
      </label>
    )}
    {children}
    {error && <p className="text-sm text-red-400 font-medium mt-2">{error}</p>}
  </div>
)

const textInputStyle = error =>
  'shadow appearance-none border rounded w-full py-2 px-3 ' +
  'text-grey-500 leading-tight focus:outline-none focus:shadow-outline ' +
  (error ? 'border-red-400' : 'border-grey-200')

export const TextArea = ({
  className,
  title,
  value,
  onChange = () => null,
  error = null,
  ...props
} = {}) => (
  <FormGroup title={title} className={className} error={error}>
    <textarea
      value={value}
      // className="block focus:outline-none w-full bg-grey-050 rounded-sm px-4 py-2 text-lg"
      className={textInputStyle(error)}
      onChange={e => onChange(e.target.value)}
      {...props}
    />
  </FormGroup>
)
export const Input = ({
  className,
  model = null,
  title,
  onBlur = () => null,
  type = 'text',
  value,
  onChange = () => null,
  error = null,
  ...props
} = {}) => (
  <FormGroup
    title={title}
    className={className}
    error={model ? model.error : error}
  >
    <input
      type={type}
      value={model ? model.value : value}
      className={textInputStyle(error)}
      onChange={e =>
        model ? model.onChange(e.target.value) : onChange(e.target.value)
      }
      onBlur={e =>
        model ? model.onBlur(e.target.value) : onBlur(e.target.value)
      }
      {...props}
    />
  </FormGroup>
)
