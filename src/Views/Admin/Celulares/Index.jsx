import React from 'react'
import {Link} from 'react-router-dom'
import {Container,Row,Col,Table,Card,CardBody,CardTitle,Button} from 'reactstrap'
import {useState,useEffect} from 'react'
import {confirmacion,enviarPeticion,obtenerUrl} from '../../../funciones'

const IndexCelulares = () => {
    useEffect(()=>{
        obtenerCelulares();
      },[]);
      const [celulares,setcelulares] = useState([]);
      const obtenerCelulares = async() =>{
        const res = await enviarPeticion('GET','','/celulares','',true);
        setcelulares(res.data);
      }
      const eliminarCelular = (id,nombre) =>{
        confirmacion(nombre,('/celulares/'+id),'/cel','',true);
      }
  return (
    <Container>
      <Row className='mt-5'>
        <Col>
          <Card className='mt-5 bg-white mt-3 shadow text-center'>
              <CardBody>
                  <CardTitle className=''>
                    <Link to={'/crear-cel'} className='btn btn-secondary'><i className='fa-solid fa-circle-plus'></i> Añadir</Link>
                  </CardTitle>
                    <Table responsive bordered striped>
                      <thead>
                        <tr><th>#</th><th>MARCA</th><th>MODELO</th><th>COLOR</th><th>PRECIO</th><th>CARACTERISTICAS</th><th>IMAGEN</th><th></th><th></th></tr>
                      </thead>
                      <tbody className='table-group-divider'>
                      { celulares.map( (row,i)=>(
                        <tr key={row._id}>
                          <td>{ (i+1) }</td>
                          <td>{ row.marca}</td>
                          <td>{ row.modelo}</td>
                          <td>{ row.color}</td>
                          <td>{ row.precio}</td>
                          <td>{ row.caracteristicas}</td>
                          <td><img src={obtenerUrl()+row.imagen} height='80px' /></td>
                          <td>
                            <Link to={'/editar-cel/'+row._id} className='btn btn-warning'><i className='fa-solid fa-edit'></i></Link>
                          </td>
                          <td><Button color='danger' onClick={()=> eliminarCelular(row._id,row.marca+' '+row.modelo)}>
                            <i className='fa-solid fa-trash'></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                </Table>
              </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default IndexCelulares