// ** Icon Imports
import { TextField, TextFieldProps } from '@mui/material'

// const TextFieldStyled = styled(TextField)<TextFieldProps>(({ theme }) => {
//   console.log({ theme })

//   return {}
// })

const CustomTextField = (props: TextFieldProps) => {
  const { InputLabelProps, size = 'small', variant = 'filled', ...rests } = props

  return <TextField size={size} variant={variant} InputLabelProps={{ ...InputLabelProps, shrink: true }} {...rests} />
}

export default CustomTextField
