import { useSetRecoilState } from "recoil";
import { IEvento } from "../../interfaces/IEvento";
import { listaDeEventosState } from "../atom";
import { getId } from "../../util";

const useAdicionarEvento = () => {
  const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);

  return (evento: IEvento) => {
    const hoje = new Date();
    if (evento.inicio < hoje) {
      throw new Error(
        "A data de início do evento não pode ser inferior a data atual."
      );
    }
    evento.id = getId();
    return setListaDeEventos((previous) => [...previous, evento]);
  };
};

export default useAdicionarEvento;
