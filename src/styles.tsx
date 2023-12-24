import { Paper, Typography, styled } from '@mui/material'

export const BasicPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '8px',
  'background-color': '#800000' /* Deep red */,
  color: 'gold',
  'font-family': 'Playfair Display, serif',
}))

export const SolvedText = styled(Typography)(({ theme }) => ({
  // color: theme.palette.text.secondary,
  // backgroundColor: theme.palette.secondary.main,
  // fontWeight: 'bold',
  // fontSize: theme.typography.h4.fontSize,
}))
