"use client";
import Cookies from "js-cookie";
import { useEffect, useState, useRef } from "react";

export default function ReferenciasProfesionales() {
  const [button, setButton] = useState(true);
  const [bAgregar, setBAgregar] = useState(false);
  const [visible, setVisible] = useState(false);
  const [animacion, setAnimacion] = useState();
  const formulario = useRef(null);

  const [refProfesionales, setRefProfesionales] = useState([]);
  const [identificador, setIdentificador] = useState("");
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [cargo, setCargo] = useState("");
  const [celular, setCelular] = useState("");

  useEffect(() => {
    const referencias = [];
    const existe = Cookies.get("ReferenciasProfesionales");
    if (!existe)
      Cookies.set("ReferenciasProfesionales", JSON.stringify(referencias));
    if (existe) obtenerRefProfesionalesCookies();
  }, []);

  // Obteniendo Datos desde las Cookies
  const obtenerRefProfesionalesCookies = () => {
    const refProfesionalesCookies = Cookies.get("ReferenciasProfesionales");
    if (refProfesionalesCookies) {
      setRefProfesionales(JSON.parse(refProfesionalesCookies));
    }
  };

  useEffect(() => {
    verificarCamposVacios();
  });

  function guardar() {
    if (!bAgregar) {
      const fecha = new Date();
      const id = fecha.getTime().toString();

      const data = cargarDatos(id);
      const tmp = JSON.parse(Cookies.get("ReferenciasProfesionales"));
      tmp.push(data);
      Cookies.set("ReferenciasProfesionales", JSON.stringify(tmp));

      limpiar();
      obtenerRefProfesionalesCookies();
    } else {
      setVisible(true);
      setAnimacion("animate-fade-right");
      setTimeout(() => {
        setAnimacion(
          "animate-fade-right animate-reverse animate-delay-[3000ms]"
        );
      }, 3000);
      setTimeout(() => {
        setVisible(false);
      }, 4000);
    }
  }

  function actualizar() {
    const referencia = cargarDatos();
    const index = refProfesionales.findIndex(
      (objeto) => objeto.id === identificador
    );
    if (index !== -1) {
      refProfesionales[index] = { ...refProfesionales[index], ...referencia };
      Cookies.set("ReferenciasProfesionales", JSON.stringify(refProfesionales));
      limpiar();
      obtenerRefProfesionalesCookies();
    }

    setTimeout(() => {
      setButton(true);
    }, 500);
  }

  function eliminar(id) {
    const index = refProfesionales.findIndex((objeto) => objeto.id === id);
    if (index !== -1) {
      refProfesionales.splice(index, 1);
      Cookies.set("ReferenciasProfesionales", JSON.stringify(refProfesionales));
      obtenerRefProfesionalesCookies();
    }
  }

  function cargarDatos(id) {
    let valorUnico = null;
    if (id === undefined) {
      valorUnico = identificador;
    } else {
      valorUnico = id;
    }

    const nuevoObjeto = {
      id: valorUnico,
      nombre: nombre,
      empresa: empresa,
      cargo: cargo,
      celular: celular,
    };
    return nuevoObjeto;
  }

  const irAlFormulario = () => {
    formulario.current.scrollIntoView({ behavior: "smooth" });
  };

  function obtener(id) {
    setButton(false);
    const tmp = refProfesionales.find((objeto) => objeto.id === id);
    setIdentificador(tmp.id);
    setNombre(tmp.nombre);
    setEmpresa(tmp.empresa);
    setCargo(tmp.cargo);
    setCelular(tmp.celular);
    irAlFormulario();
  }

  function verificarCamposVacios() {
    const todasVacias = !nombre || !empresa || !cargo || !celular;

    if (todasVacias) {
      setBAgregar(true);
    } else {
      setBAgregar(false);
    }
  }

  function limpiar() {
    setIdentificador("");
    setNombre("");
    setEmpresa("");
    setCargo("");
    setCelular("");
  }

  function cancelar() {
    limpiar();
    // datosPorDefecto();
    setButton(true);
  }

  return (
    <div>
      <form ref={formulario}>
        <h5 className="Titulo">Referencias Profesionales</h5>
        <hr className="Hr" />
        <p>
          En esta sección es donde proporcionas los nombres y la información de
          contacto de personas que pueden dar testimonio de tu experiencia
          laboral, habilidades y carácter.
        </p>
        <br />
        <div className="flex flex-col gap-2 mt-2 text-sm lg:text-base">
          <section className="flex md:w-3/4">
            <label htmlFor="nombre" className="w-1/3">
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="Input w-2/3 lg:text-base"
              placeholder="Nombre de la persona"
              autoComplete="off"
            />
          </section>
          <section className="flex md:w-3/4">
            <label htmlFor="empresa" className="w-1/3">
              Empresa:
            </label>
            <input
              type="text"
              id="empresa"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              className="Input w-2/3 lg:text-base"
              placeholder="Nombre de la empresa"
              autoComplete="off"
            />
          </section>
          <section className="flex md:w-3/4">
            <label htmlFor="cargo" className="w-1/3">
              Cargo:
            </label>
            <input
              type="text"
              id="cargo"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              className="Input w-2/3 lg:text-base"
              placeholder="Puesto que ocupa en la empresa"
              autoComplete="off"
            />
          </section>
          <div className="flex md:w-2/4">
            <label htmlFor="celular" className="w-1/3 md:w-1/2">
              Celular:
            </label>
            <input
              type="text"
              id="celular"
              value={celular}
              maxLength={9}
              pattern="[0-9]{4}-[0-9]{4}"
              onChange={(e) => setCelular(e.target.value)}
              placeholder="9999-9999"
              className="Input w-2/5 lg:text-base"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="flex items-end gap-3 mt-10">
          {button ? (
            <button
              type="button"
              onClick={() => {
                guardar();
              }}
              className="Button"
            >
              Agregar
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  actualizar();
                }}
                className="Button"
              >
                Actualizar
              </button>
              <button
                className="Button"
                onClick={() => {
                  cancelar();
                }}
              >
                Cancelar
              </button>
            </div>
          )}
          {visible && (
            <h1 id="mensaje" className={`MsjFallo ${animacion}`}>
              Por favor ingresar todos los datos.
            </h1>
          )}
        </div>
      </form>
      <br />
      <br />

      <h5 className="Titulo">Referencias Profesionales</h5>
      <hr className="Hr" />
      <div className="flex-grow">
        {refProfesionales.map((ref) => (
          <div key={ref.id} className="Card">
            <section className="text-sm">
              <div className="flex gap-3 w-full">
                <div className="w-1/3 Border-r">
                  <h1>Nombre Completo</h1>
                  <h1>Nombre de la Empresa</h1>
                  <h1>Cargo o Puesto</h1>
                  <h1>Celular</h1>
                </div>
                <div className="w-2/3">
                  <h1>{ref.nombre}</h1>
                  <h1>{ref.empresa}</h1>
                  <h1>{ref.cargo}</h1>
                  <h1>{ref.celular}</h1>
                </div>
              </div>
              <div className="flex-grow flex justify-end gap-3">
                <button
                  className="Button mt-2"
                  type="button"
                  onClick={() => {
                    obtener(ref.id);
                  }}
                >
                  <a href="#formulario"></a>
                  Editar
                </button>
                <button
                  className="Button mt-2"
                  type="button"
                  onClick={() => {
                    eliminar(ref.id);
                  }}
                >
                  Eliminar
                </button>
              </div>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
}
