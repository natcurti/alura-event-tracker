import { selector } from "recoil";
import { filtroDeEventos, listaDeEventosState } from "../atom";
import { IEvento } from "../../interfaces/IEvento";

export const eventosFiltradosState = selector({
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

export const eventosAsync = selector({
  key: "eventosAsync",
  get: async () => {
    const response = await fetch("http://localhost:8000/eventos");
    const responseJson: IEvento[] = await response.json();
    return responseJson.map((evento) => ({
      ...evento,
      inicio: new Date(evento.inicio),
      fim: new Date(evento.fim),
    }));
  },
});
