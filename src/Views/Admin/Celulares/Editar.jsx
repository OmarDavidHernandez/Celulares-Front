import React from 'react'
import FormCelular from '../../../Components/FormCelular'
import { useParams } from 'react-router-dom'

const EditarCelular = () => {
  const {id} = useParams();
  return (
    <FormCelular id={id} titulo='Editar Celular' />
  )
}

export default EditarCelular