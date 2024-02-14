"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import FotoPerfil from "./FotoPerfil";

// Icons
import { PiUserCircleThin } from "react-icons/pi";
import { FaAnglesDown } from "react-icons/fa6";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col w-screen md:w-auto">
      <div className="hidden md:flex flex-col h-[85vh] border-r-[1px] border-slate-900 pr-10">
        <div className="flex flex-col gap-3 flex-grow text-sm">
          <FotoPerfil />
          <Link
            href={"/perfil/info-personal"}
            className={`${
              pathName === "/perfil/info-personal" ? "Seleccionado" : ""
            }`}
          >
            <h1>Información Personal</h1>
          </Link>
          <Link
            href={"/perfil/info-academica"}
            className={`${
              pathName === "/perfil/info-academica" ? "Seleccionado" : ""
            }`}
          >
            <h1>Información Académica</h1>
          </Link>
          <Link
            href={"/perfil/experiencia-laboral"}
            className={`${
              pathName === "/perfil/experiencia-laboral" ? "Seleccionado" : ""
            }`}
          >
            <h1>Experiencia Laboral</h1>
          </Link>
          <Link
            href={"/perfil/competencias"}
            className={`${
              pathName === "/perfil/competencias" ? "Seleccionado" : ""
            }`}
          >
            <h1>Competencias</h1>
          </Link>
          <Link
            href={"/perfil/ref-personales"}
            className={`${
              pathName === "/perfil/ref-personales" ? "Seleccionado" : ""
            }`}
          >
            <h1>Referencias Personales</h1>
          </Link>
        </div>
        <button className="Button">Borrar Información</button>
      </div>

      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center gap-2 md:hidden bg-slate-900 p-3 mb-3"
      >
        <h1>Menu Perfil</h1>
        <FaAnglesDown className="text-xs" />
      </button>
      {isOpen && (
        <div className="className=block sm:hidden">
          <div className="absolute z-0 w-screen bg-black text-white">
            <div className="flex flex-col text-sm h-[84vh]">
              {/* <div
                className="flex flex-col items-center justify-center h-72"
                onClick={() => {}}
              >
                <PiUserCircleThin className="text-[150px]" />
                <button className="border-[1px] border-white py-1 px-4 rounded-md text-xs">
                  Seleccionar Foto...
                </button>
              </div> */}
              <FotoPerfil />
              <div className="flex-grow flex flex-col gap-5 px-5 items-center ">
                <Link href={"/perfil/info-personal"} onClick={toggleDropdown}>
                  <h1>Información Personal</h1>
                </Link>
                <Link href={"/perfil/info-academica"} onClick={toggleDropdown}>
                  <h1>Información Académica</h1>
                </Link>
                <Link
                  href={"/perfil/experiencia-laboral"}
                  onClick={toggleDropdown}
                >
                  <h1>Experiencia Laboral</h1>
                </Link>
                <Link href={"/perfil/competencias"} onClick={toggleDropdown}>
                  <h1>Competencias</h1>
                </Link>
                <Link href={"/perfil/ref-personales"} onClick={toggleDropdown}>
                  <h1>Referencias Personales</h1>
                </Link>
              </div>
              <div className="flex justify-center mb-5">
                <button className="Button">Borrar Información</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
