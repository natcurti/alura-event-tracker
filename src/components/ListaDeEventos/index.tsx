import React from "react";
import Evento from "../Evento";
import Filtro from "../Filtro";
import style from "./ListaDeEventos.module.scss";
import useListaDeEventos from "../../state/hooks/useListaDeEventos";
import { useRecoilValue } from "recoil";
import { IFiltroDeEventos } from "../../interfaces/IFiltroDeEventos";
import { filtroDeEventos } from "../../state/atom";

const ListaDeEventos: React.FC = () => {
  const eventos = useListaDeEventos();

  const filtro = useRecoilValue<IFiltroDeEventos>(filtroDeEventos);

  const eventosFiltrados = eventos.filter((evt) => {
    if (!filtro.data) {
      return true;
    }
    const mesmoDia =
      filtro.data.toISOString().slice(0, 10) ===
      evt.inicio.toISOString().slice(0, 10);
    return mesmoDia;
  });

  return (
    <section>
      <Filtro />
      <div className={style.Scroll}>
        {eventosFiltrados.map((evento) => (
          <Evento evento={evento} key={evento.id} />
        ))}
      </div>
    </section>
  );
};

export default ListaDeEventos;
