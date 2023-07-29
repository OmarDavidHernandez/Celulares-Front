import React,{useEffect,useState} from 'react'
import {Container,Row,Col,Card,CardBody,CardTitle,Button,Form,InputGroup,InputGroupText,Input} from 'reactstrap'
import { enviarPeticion,obtenerUrl } from '../funciones'

const FormCelular = (parametros) => {
    const [marca,setMarca] = useState('');
    const [modelo,setModelo] = useState('');
    const [color,setColor] = useState('');
    const [caracteristicas,setCaracteristicas] = useState('');
    const [precio,setPrecio] = useState('');
    const [imagen,setImagen] = useState('');
    const [srcImg,setSrcImg] = useState('/img/default.png');
    const [requerida,setRequerida] = useState(true);
    let metodo = 'POST';
    let url = '/celulares';
    
    useEffect( () =>{
        obtenerCelular();
    },[]);
    const obtenerCelular = async() =>{
        if(parametros.id !== null){
            const res = await enviarPeticion('GET','',(url+'/'+parametros.id),'',true);
            setMarca(res.data.marca);
            setModelo(res.data.modelo);
            setCaracteristicas(res.data.caracteristicas);
            setImagen(obtenerUrl()+res.data.imagen);
            setColor(res.data.color);
            setPrecio(res.data.precio);
            setSrcImg(obtenerUrl()+res.data.imagen);
            setRequerida(false);
        }
    }
    const ver = (e) =>{
        setImagen(e.files[0]);
        setSrcImg(URL.createObjectURL(e.files[0]));
    }
    const guardar = async(e) =>{
        e.preventDefault();
        if(parametros.id !== null){
            metodo= 'PUT';
            url = '/celulares/'+parametros.id;
        }
        const formData = new FormData();
        formData.append('marca', marca);
        formData.append('modelo', modelo);
        formData.append('color', color);
        formData.append('precio', precio);
        formData.append('caracteristicas', caracteristicas);
        if(imagen != ''){
            formData.append('imagen', imagen);
        }
        await enviarPeticion(metodo,formData,url,'/cel',true);
        
    }
  return (
    <Container>
      <Row>
        <Col>
        <Card className='mt-5 bg-white mt-3 shadow text-center'>
              <CardBody>
                  <CardTitle className=''>
                  <p className='h3 text-center'>{ parametros.titulo}</p>
                  </CardTitle>
                    <Row>
                        <Col md='9'>
                        <Form onSubmit={guardar}>
                            <InputGroup className='mt-5 mb-3'>
                                <InputGroupText><i className='fa-solid fa-mobile'></i></InputGroupText>
                                <Input value={marca} placeholder="Marca" onChange={(e) => setMarca(e.target.value)} required />
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <InputGroupText><i className='fa-solid fa-mobile-button'></i></InputGroupText>
                                <Input value={modelo} placeholder="Modelo" onChange={(e) => setModelo(e.target.value)} required />
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <InputGroupText><i className='fa-solid fa-palette'></i></InputGroupText>
                                <Input value={color} placeholder="Color" onChange={(e) => setColor(e.target.value)} required />
                            </InputGroup>
                            <InputGroup className='mt-3'>
                                <InputGroupText><i className='fa-solid fa-dollar-sign'></i></InputGroupText>
                                <Input value={precio} placeholder="Precio" type='number' step="0.1" onChange={(e) => setPrecio(e.target.value)} required />
                            </InputGroup>
                            <InputGroup className='mt-3'>
                                <InputGroupText><i className='fa-solid fa-comment'></i></InputGroupText>
                                <Input value={caracteristicas} placeholder="Características" onChange={(e) => setCaracteristicas(e.target.value)} required />
                            </InputGroup>
                            <InputGroup className='mt-3'>
                                <InputGroupText><i className='fa-solid fa-image'></i></InputGroupText>
                                <Input type='file' accept="image/png,image/jpeg" onChange={(e) => ver(e.target)} required={requerida} />
                            </InputGroup>
                            <p className='text-center mt-3'><Button color='dark'><i className='fa-solid fa-save'></i> Guardar</Button></p>
                        </Form>
                        </Col>
                        <Col md='3'>
                            <img className='shadow mt-md-5 img-fluid' src={srcImg} height='200px'></img>
                        </Col>
                    </Row>
              </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default FormCelular