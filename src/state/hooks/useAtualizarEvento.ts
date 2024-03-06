import { useSetRecoilState } from "recoil";
import { IEvento } from "../../interfaces/IEvento";
import { listaDeEventosState } from "../atom";

const useAtualizarEvento = () => {
  const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);

  return (evento: IEvento) => {
    return setListaDeEventos((previous) => {
      const index = previous.findIndex((event) => event.id === evento.id);
      return [
        ...previous.slice(0, index),
        evento,
        ...previous.slice(index + 1),
      ];
    });
  };
};

export default useAtualizarEvento;
