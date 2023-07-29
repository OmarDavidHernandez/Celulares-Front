import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import {Container,Row,Col,Card,CardBody,CardTitle,CardText,Button,Form,InputGroup,InputGroupText,Input} from 'reactstrap'
import { enviarPeticion,obtenerUrl } from '../../funciones'

const Detalle = () => {
    const {id} = useParams();
    const [marca,setMarca] = useState('');
    const [modelo,setModelo] = useState('');
    const [color,setColor] = useState('');
    const [caracteristicas,setCaracteristicas] = useState('');
    const [precio,setPrecio] = useState('');
    const [imagen,setImagen] = useState('');
    const [review,setReview] = useState([]);
    const [comentario,setComentario] = useState('');
    useEffect( () =>{
        obtenerCelular();
    },[]);
    const guardar = async(e) =>{
        e.preventDefault();
        let url = '/review/'+id;
        await enviarPeticion('PUT',{review:comentario},url,('/celular/'+id),false);
    }
    const obtenerCelular = async() =>{
        if(id !== null){
            const res = await enviarPeticion('GET','',('/celulares/'+id),'',false);
            setMarca(res.data.marca);
            setModelo(res.data.modelo);
            setCaracteristicas(res.data.caracteristicas);
            setImagen(obtenerUrl()+res.data.imagen);
            setColor(res.data.color);
            setPrecio(res.data.precio);
            setReview(res.data.review.split('*-*'));
        }
    }
  return (
    <Container>
      <Row>
        <Col>
          <Card className='mt-5 bg-white mt-3 shadow text-center'>
            <CardBody>
            <CardTitle className='h3 text-center'>
            { marca+' '+modelo}
            </CardTitle>
            <Row>
                <Col md='9'>
                    <CardText className='text-justificado'>Características: <b>{ caracteristicas }</b></CardText>
                    <CardText className='text-start'>Marca: <b>{ marca }</b></CardText>
                    <CardText className='text-start'>Modelo: <b>{ modelo }</b></CardText>
                    <CardText className='text-start'>Color: <b>{ color }</b></CardText>
                    <CardText className='text-start'>Precio: <b>${ precio }</b></CardText>
                </Col>
                <Col md='3'>
                    <img className='shadow mt-3 mt-md-0' src={imagen} height='250px'></img>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col md='12'>
                    <div className="hr"></div>
                    <CardText className='h3 text-center'>Reseñas</CardText>
                </Col>    
                { review.map( (row,i)=>(
                    <Col md='12' key={i} className='border-bottom'>
                        <CardText className='text-start fst-italic'>{row}</CardText>
                    </Col>
                ))}
            </Row>
            <Row className='mt-3'>
                <Col md='12'>
                    <Form onSubmit={guardar}>
                        <InputGroup className='mt-5 mb-3'>
                            <InputGroupText><i className='fa-solid fa-comment'></i></InputGroupText>
                            <Input value={comentario} placeholder="Deja tu reseña"  onChange={(e) => setComentario(e.target.value)} required />
                        </InputGroup>
                        <p className='text-center mt-3'><Button color='dark'><i className='fa-solid fa-save'></i> Guardar</Button></p>
                    </Form>
                </Col>
            </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Detalle