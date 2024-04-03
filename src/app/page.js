"use client";

import React, { useContext, useState } from "react";
import ProductCard from "./components/ProductCard";
import { tShirts } from "./api/getTShirts";
import FilterSection from "./components/FilterSection";
import Context from "./Context";
import { brlFormat } from "./utils/brlFormat";

export default function Home() {
  const { search } = useContext(Context);
  const [filtros, setFiltros] = useState({
    color: [],
    size: [],
    price: [],
  });
  //Este bloco verifica quais os preços, tamanhos e cores existentes para exibir nos filtros
  const sizesSet = new Set(tShirts.flatMap((tShirt) => tShirt.size));
  const sizes = [...sizesSet];
  const colorsSet = new Set(tShirts.map((tShirt) => tShirt.color));
  const colors = [...colorsSet];
  const pricesSet = tShirts.map((tShirt) => brlFormat(tShirt.price));
  const prices = [...pricesSet];
  // Função para atualizar os filtros
  const handleFiltroChange = (type, value) => {
    const newFilters = { ...filtros };
    const index = newFilters[type].indexOf(value);
    if (index === -1) {
      newFilters[type].push(value);
    } else {
      newFilters[type].splice(index, 1);
    }
    setFiltros(newFilters);
  };
  // Função para verificar se a camiseta passa pelo filtro de cor
  const filterByColor = (camiseta) => {
    const { color } = filtros;
    return color.length === 0 || color.includes(camiseta.color);
  };
  // Função para verificar se a camiseta passa pelo filtro de tamanho
  const filterBySize = (camiseta) => {
    const { size } = filtros;
    return (
      size.length === 0 ||
      size.some((selectedSize) => camiseta.size.includes(selectedSize))
    );
  };
  // Função para verificar se a camiseta passa pelo filtro de preço
  const filterByPrice = (camiseta) => {
    const { price } = filtros;
    return price.length === 0 || price.includes(brlFormat(camiseta.price));
  };
  // Aplica filtros na listagem de camisetas
  const filteredTShirts = search
    ? tShirts.filter((tShirt) =>
        tShirt.title.toLowerCase().includes(search.toLowerCase())
      )
    : tShirts.filter(
        (tShirt) =>
          filterByColor(tShirt) && filterBySize(tShirt) && filterByPrice(tShirt)
      );
  const filterSectionsLabels = [
    {
      title: "Tamanhos",
      filters: sizes,
      handleChange: (evt) => handleFiltroChange("size", evt.target.value),
    },
    {
      title: "Cores",
      filters: colors,
      handleChange: (evt) => handleFiltroChange("color", evt.target.value),
    },
    {
      title: "Preços",
      filters: prices,
      handleChange: (evt) => handleFiltroChange("price", evt.target.value),
    },
  ];
  return (
    <main className="md:p-8 pl-2 md:pl-8 ">
      <h1 className="font-bold text-4xl mt-6 mb-4">Camisetas masculinas</h1>
      <span className="text-gray-400 text-xl">
        Chance de ter os seus queridinhos por menos - não espere dar sold out.
        <br /> Desconto cumulativo exclusivo ao usar o cupom.
      </span>
      <div className="flex mt-6 justify-between">
        <aside className="w-2/12 min-h-screen pl-2 md:pl-0 ">
          {filterSectionsLabels.map((section) => (
            <FilterSection
              key={section.title}
              title={section.title}
              filters={section.filters}
              handleChange={section.handleChange}
            />
          ))}
        </aside>
        <div className="flex gap-8 flex-wrap sm:w-72 md:w-10/12 min-h-screen pl-12 md:pl-0 md:p-4">
          {filteredTShirts.map((tShirt) => (
            <ProductCard
              key={tShirt.id}
              id={tShirt.id}
              title={tShirt.title}
              description={tShirt.description}
              price={tShirt.price}
              thumb={tShirt.thumb}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
