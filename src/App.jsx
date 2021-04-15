
import './App.css';
import React,{ useState, useEffect} from 'react'
import {db} from './firebaseconfig'


function App() {
  const [idusuario, setIdUsuario ] = useState('')
  const [modoedicion, setModoEdicion] = useState(null)
  const [nombre, setNombre] = useState('')
  const [phone, setPhone ] = useState('')
  const [error, setError ] = useState('')
  const [usuariosagenda, setUsuariosAgenda ] = useState([])

  useEffect( () => {
    const getUsuarios = async() => {
      const {docs} = await db.collection('agenda').get()
      const nuevoArray = docs.map(item => ({id:item.id, ...item.data()}))
      setUsuariosAgenda(nuevoArray)
    }
    getUsuarios()
  }, [])


  const setUsuarios = async(e) => {
    e.preventDefault()
    if(!nombre.trim()) {
      setError('El campo nombre esta vacio')
    }
    if(!phone.trim()) {
      setError('El campo phone esta vacio')
    }

    const usuario = {
      nombre:nombre,
      telefono:phone
    }

    try {
        const data = await db.collection('agenda').add(usuario)
        const {docs} = await db.collection('agenda').get()
        const nuevoArray = docs.map(item => ({id:item.id, ...item.data()}))
        setUsuariosAgenda(nuevoArray)
        
    } catch (e) {
      console.log(e);
    }

    setNombre('')
    setPhone('')
  }

  const BorrarUsuario = async (id) => {
    try {
      await db.collection('agenda').doc(id).delete()
      const {docs} = await db.collection('agenda').get()
      const nuevoArray = docs.map(item => ({id:item.id, ...item.data()}))
      setUsuariosAgenda(nuevoArray)

    } catch (e) {
      console.log(e);
    }
  }

  const pulsarActualizar = async (id) => {
     
    try {
      const data = await db.collection('agenda').doc(id).get()
      const { nombre, telefono} = data.data()
      setNombre(nombre)
      setPhone(telefono)
      setIdUsuario(id)
      setModoEdicion(true)
      console.log(id);

    } catch (e) {
      console.log(e);
    }

  }


  const setUpdate = async(e) =>{
    e.preventDefault()
    if(!nombre.trim()) {
      setError('El campo nombre esta vacio')
    }
    if(!phone.trim()) {
      setError('El campo phone esta vacio')
    }

    const userUpdate = {
      nombre:nombre,
      telefono:phone
    }
    try {
      await db.collection('agenda').doc(idusuario).set(userUpdate)
      const {docs} = await db.collection('agenda').get()
        const nuevoArray = docs.map(item => ({id:item.id, ...item.data()}))
        setUsuariosAgenda(nuevoArray)
    } catch (e) {
      console.log(e);
    }

    setNombre('')
    setPhone('')
    setIdUsuario('')
    setModoEdicion(false)
  }



  return (
    <div className="container mt-5">
        <div className="row">
          <div className="col">
            <h2>Formulario de Usuarios</h2>

            <form 
              onSubmit={modoedicion ? setUpdate :  setUsuarios}
            className="form-group">
              <input
              value={nombre}
              onChange={(e) => {setNombre(e.target.value)}}
              className="form-control" 
              type="text"
              placeholder="Introduce el nombre"/>
              <input 
              value={phone}
              onChange={(e) => {setPhone(e.target.value)}}
              className="form-control mt-3"
              type="text"
              placeholder="Introduce el numero"/>
              {
                modoedicion ? 
                (

                  <input type="submit" value="Editar" className="btn btn-dark btn-block mt-3"/>
                )
                :
                (

                  <input type="submit" value="Registrar" className="btn btn-dark btn-block mt-3"/>
                )
              }

            </form>

            {
              error ? 
              (
                <div><p>{error}</p></div>
              )
              :
              (
                <span></span>
              )
            }

          </div>
          <div className="col">
          <h2>Lista de tu Agenda</h2>
          <ul className="list-group">
          {
            usuariosagenda.length !== 0 ?(
            usuariosagenda.map(item => (
              <li className="list-group-item" key={item.id}> {item.nombre} -- {item.telefono}
              
              <button onClick={(id) => {BorrarUsuario(item.id)}} className="btn btn-danger float-right">Borrar</button>
              <button onClick={(id) => pulsarActualizar(item.id)} className="btn btn-info mr-3 float-right">Actualizar</button>
              </li>
            ))
            )
            :
            (
              <span>
                <p>Lo siento no hay tareas que mostrar</p>
              </span>
            ) 
          }
          </ul>
          </div>
        </div>
    </div>
  );
}

export default App;
 