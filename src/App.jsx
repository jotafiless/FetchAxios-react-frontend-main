import { useState, useEffect } from "react"
import "./App.css"

const listaVacunas = ["Antirrábica", "Séxtuple", "Coronavirus", "Polivalente", "Rabia felina"]

function App() {

  const [mascotas, setMascotas] = useState([])

  const [nombre, setNombre] = useState("")
  const [especie, setEspecie] = useState("")
  const [raza, setRaza] = useState("")
  const [edad, setEdad] = useState("")
  const [peso, setPeso] = useState("")
  const [esterilizado, setEsterilizado] = useState("no")
  const [vacunas, setVacunas] = useState([])


  const [rut, setRut] = useState("")
  const [nombreDueño, setNombreDueño] = useState("")
  const [telefono, setTelefono] = useState("")


  const [fecha, setFecha] = useState("")
  const [vet, setVet] = useState("")
  const [diagnostico, setDiagnostico] = useState("")

  const [idEditando, setIdEditando] = useState(null)


  useEffect(() => {
    const guardado = localStorage.getItem("mascotas")

    if (guardado != null) {
      setMascotas(JSON.parse(guardado))
    } else {
      const inicial = [
        {
          id: 1,
          nombre: "Rocky",
          especie: "Perro",
          raza: "Golden Retriever",
          edad: 5,
          peso: 32.8,
          esterilizado: true,
          vacunas: ["Antirrábica", "Séxtuple", "Coronavirus"],
          propietario: {
            rut: "14567890-2",
            nombre: "Pedro Ramírez",
            telefono: "998877665"
          },
          ultimaAtencion: {
            fecha: "2026-05-18",
            veterinario: "Dra. Ana Pérez",
            diagnostico: "Otitis leve"
          }
        }
      ]
      setMascotas(inicial)
    }
  }, [])


  useEffect(() => {
    localStorage.setItem("mascotas", JSON.stringify(mascotas))
  }, [mascotas])

  function manejarVacuna(v) {
    if (vacunas.includes(v)) {
      const nuevas = vacunas.filter((item) => item != v)
      setVacunas(nuevas)
    } else {
      const nuevas = [...vacunas, v]
      setVacunas(nuevas)
    }
  }

  function limpiarForm() {
    setIdEditando(null)
    setNombre("")
    setEspecie("")
    setRaza("")
    setEdad("")
    setPeso("")
    setEsterilizado("no")
    setVacunas([])
    setRut("")
    setNombreDueño("")
    setTelefono("")
    setFecha("")
    setVet("")
    setDiagnostico("")
  }

  function validarCampos() {
    if (nombre == "") {
      alert("Falta el nombre de la mascota")
      return false
    }
    if (especie == "") {
      alert("Falta la especie")
      return false
    }
    if (raza == "") {
      alert("Falta la raza")
      return false
    }
    if (edad == "" || Number(edad) <= 0) {
      alert("La edad tiene que ser un numero mayor a 0")
      return false
    }
    if (peso == "" || Number(peso) <= 0) {
      alert("El peso tiene que ser un numero mayor a 0")
      return false
    }
    if (rut == "") {
      alert("Falta el rut del propietario")
      return false
    }
    if (nombreDueño == "") {
      alert("Falta el nombre del propietario")
      return false
    }
    if (telefono == "") {
      alert("Falta el telefono del propietario")
      return false
    }

    return true
  }

  function guardarMascota(e) {
    e.preventDefault()

    const ok = validarCampos()
    if (!ok) {
      return
    }

    const objMascota = {
      id: idEditando != null ? idEditando : Date.now(),
      nombre: nombre,
      especie: especie,
      raza: raza,
      edad: Number(edad),
      peso: Number(peso),
      esterilizado: esterilizado == "si" ? true : false,
      vacunas: vacunas,
      propietario: {
        rut: rut,
        nombre: nombreDueño,
        telefono: telefono
      },
      ultimaAtencion: {
        fecha: fecha,
        veterinario: vet,
        diagnostico: diagnostico
      }
    }

    if (idEditando != null) {
      const listaActualizada = mascotas.map((m) => {
        if (m.id == idEditando) {
          return objMascota
        } else {
          return m
        }
      })
      setMascotas(listaActualizada)
      alert("Los datos de la mascota se actualizaron correctamente")
    } else {
      setMascotas([...mascotas, objMascota])
      alert("Mascota agregada correctamente")
    }

    limpiarForm()
  }

  function editarMascota(id) {
    const resultado = mascotas.filter((m) => m.id == id)

    if (resultado.length == 0) {
      alert("No se encontro la mascota")
      return
    }

    const encontrada = resultado[0]

    setIdEditando(encontrada.id)
    setNombre(encontrada.nombre)
    setEspecie(encontrada.especie)
    setRaza(encontrada.raza)
    setEdad(encontrada.edad)
    setPeso(encontrada.peso)
    setEsterilizado(encontrada.esterilizado ? "si" : "no")
    setVacunas(encontrada.vacunas)
    setRut(encontrada.propietario.rut)
    setNombreDueño(encontrada.propietario.nombre)
    setTelefono(encontrada.propietario.telefono)
    setFecha(encontrada.ultimaAtencion.fecha)
    setVet(encontrada.ultimaAtencion.veterinario)
    setDiagnostico(encontrada.ultimaAtencion.diagnostico)
  }

  function eliminarMascota(id, nombreMascota) {
    const filtradas = mascotas.filter((m) => m.id != id)
    setMascotas(filtradas)
    alert("Se eliminó a " + nombreMascota)
  }

  return (
    <div className="container mt-4 mb-5">

      <h1 className="text-center titulo-clinica">Clínica Veterinaria - Fichas de Mascotas</h1>
      <p className="text-center text-muted">Total de mascotas registradas: {mascotas.length}</p>

      <div className="card p-3 mb-4 tarjeta">
        <h4>{idEditando != null ? "Editando mascota" : "Nueva mascota"}</h4>

        <form onSubmit={guardarMascota}>

          <div className="row">
            <div className="col-md-4 mb-2">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>

            <div className="col-md-4 mb-2">
              <label className="form-label">Especie</label>
              <input type="text" className="form-control" value={especie} onChange={(e) => setEspecie(e.target.value)} />
            </div>

            <div className="col-md-4 mb-2">
              <label className="form-label">Raza</label>
              <input type="text" className="form-control" value={raza} onChange={(e) => setRaza(e.target.value)} />
            </div>

            <div className="col-md-3 mb-2">
              <label className="form-label">Edad (años)</label>
              <input type="number" className="form-control" value={edad} onChange={(e) => setEdad(e.target.value)} />
            </div>

            <div className="col-md-3 mb-2">
              <label className="form-label">Peso (kg)</label>
              <input type="number" className="form-control" value={peso} onChange={(e) => setPeso(e.target.value)} />
            </div>

            <div className="col-md-3 mb-2">
              <label className="form-label d-block">¿Esterilizado?</label>

              <input type="radio" name="ester" value="si" checked={esterilizado == "si"} onChange={(e) => setEsterilizado(e.target.value)} /> Si

              <input className="ms-3" type="radio" name="ester" value="no" checked={esterilizado == "no"} onChange={(e) => setEsterilizado(e.target.value)} /> No
            </div>

            <div className="col-md-3 mb-2">
              <label className="form-label d-block">Vacunas</label>

              {listaVacunas.map((v) => (
                <div className="form-check" key={v}>
                  <input className="form-check-input" type="checkbox" checked={vacunas.includes(v)} onChange={() => manejarVacuna(v)} />
                  <label className="form-check-label">{v}</label>
                </div>
              ))}
            </div>
          </div>

          <hr />
          <h5>Datos del propietario</h5>

          <div className="row">
            <div className="col-md-4 mb-2">
              <label className="form-label">Rut propietario</label>
              <input type="text" className="form-control" placeholder="Ej: 12345678-9" value={rut} onChange={(e) => setRut(e.target.value)} />
            </div>

            <div className="col-md-4 mb-2">
              <label className="form-label">Nombre propietario</label>
              <input type="text" className="form-control" value={nombreDueño} onChange={(e) => setNombreDueño(e.target.value)} />
            </div>

            <div className="col-md-4 mb-2">
              <label className="form-label">Teléfono</label>
              <input type="text" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </div>
          </div>

          <hr />
          <h5>Última atención</h5>

          <div className="row">
            <div className="col-md-4 mb-2">
              <label className="form-label">Fecha</label>
              <input type="date" className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            </div>

            <div className="col-md-4 mb-2">
              <label className="form-label">Veterinario</label>
              <input type="text" className="form-control" value={vet} onChange={(e) => setVet(e.target.value)} />
            </div>

            <div className="col-md-4 mb-2">
              <label className="form-label">Diagnóstico</label>
              <input type="text" className="form-control" value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)} />
            </div>
          </div>

          <div className="mt-3">
            <button type="submit" className="btn btn-primary">
              {idEditando != null ? "Actualizar" : "Guardar"}
            </button>

            <button type="button" className="btn btn-secondary ms-2" onClick={limpiarForm}>
              Limpiar
            </button>
          </div>

        </form>
      </div>

      <div className="card p-3 tarjeta">
        <h4>Mascotas registradas</h4>

        <table className="table table-striped table-bordered mt-2 tabla-mascotas">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Especie</th>
              <th>Raza</th>
              <th>Edad</th>
              <th>Peso</th>
              <th>Propietario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mascotas.map((m) => (
              <tr key={m.id}>
                <td>{m.nombre}</td>
                <td>{m.especie}</td>
                <td>{m.raza}</td>
                <td>{m.edad}</td>
                <td>{m.peso} kg</td>
                <td>{m.propietario.nombre}</td>
                <td>
                  <button className="btn btn-warning btn-sm" onClick={() => editarMascota(m.id)}>Editar</button>
                  <button className="btn btn-danger btn-sm ms-2" onClick={() => eliminarMascota(m.id, m.nombre)}>Eliminar</button>
                </td>
              </tr>
            ))}

            {mascotas.length == 0 && (
              <tr>
                <td colSpan="7" className="text-center">No hay mascotas registradas todavia</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default App
