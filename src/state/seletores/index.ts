import { selector } from "recoil";
import { filtroDeEventos, listaDeEventosState } from "../atom";

const eventosFiltradosState = selector({
  key: "eventosFiltradosState",
  get: ({ get }) => {
    const filtro = get(filtroDeEventos);
    const eventos = get(listaDeEventosState);

    const eventosFiltrados = eventos.filter((evt) => {
      if (!filtro.data) {
        return true;
      }
      const mesmoDia =
        filtro.data.toISOString().slice(0, 10) ===
        evt.inicio.toISOString().slice(0, 10);
      return mesmoDia;
    });

    return eventosFiltrados;
  },
});

export default eventosFiltradosState;
