import React, { useEffect, useState }  from 'react'
import { Link } from 'react-router-dom'
import {Container,Row,Col,Card,CardBody,CardTitle,CardText,InputGroup,InputGroupText,Input} from 'reactstrap'
import { enviarPeticion,obtenerUrl } from '../../funciones'

const Pagina = () => {
  const [celulares,setCelulares] = useState([]);
  const [filtro,setFiltro] = useState('');
  const [temporal,setTemporal] = useState([]);
  useEffect(()=>{
    obtenercelulares();
  },[]);
  const obtenercelulares = async() =>{
    const res = await enviarPeticion('GET','','/celulares','');
    setCelulares(res.data);
    setTemporal(res.data); 
  }
  const buscar = (e) =>{
    if(filtro != ''){
        setTemporal(celulares.filter(p => p.marca == filtro));
    }
    else{
      setTemporal(celulares);
    }
  }
  return (
    <Container>
      <Row>
        <Col>
          <InputGroup className='mt-5 mb-3'>
            <InputGroupText><i className='fa-solid fa-search'></i></InputGroupText>
            <Input type="text" placeholder="Buscar por marca" value={filtro} onChange={(e) =>{setFiltro(e.target.value)}} onKeyUpCapture={buscar}/>
          </InputGroup>
        </Col>
      </Row>
      <Row>
      { temporal.map( (row)=>(
        <Col sm='6' md='6' lg='4' xxl='3' className='mb-3' key={row._id}>
        <Card className='bg-light shadow card-hover'>
          <div className='text-center'>
            <img className='rounded mt-2' src={obtenerUrl()+row.imagen} width="180px" height='250px'></img>
          </div>
            <CardBody>
                <CardTitle className='h4 text-center mb-1'>{row.marca}</CardTitle>
                <CardTitle className='h5 text-center mb-3'>{row.modelo}</CardTitle>
                <CardText className='text-center mt-2'>
                A solo ${ row.precio}
                </CardText>
                <CardText className='text-center'>
                    <Link to={'/celular/'+row._id} className='btn btn-warning mb-3'>Detalles <i className="fa-solid fa-arrow-up-right-from-square"></i></Link>
                </CardText>
            </CardBody>
        </Card>
        </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Pagina