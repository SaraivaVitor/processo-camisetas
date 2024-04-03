"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { tShirts } from "../api/getTShirts";
import Image from "next/image";
import { brlFormat } from "../utils/brlFormat";

const Product = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("productId");
  const product = tShirts.find((tShirt) => tShirt.id === id);
  const priceLabel = brlFormat(product.price);
  return (
    <div className="flex gap-8 p-10 flex-col md:flex-row">
      <Image
        className="rounded-lg h-96 lg:h-3/4 md:w-2/4"
        src={product.thumb}
        alt="search"
        width={800}
        height={800}
        priority
      />
      <div className="w-3/7">
        <div className="flex flex-col">
          <h1 className="font-bold text-md md:text-4xl mt-6 mb-4">{product.title}</h1>
          <span className="text-gray-400 text-xl">{product.description}</span>
          <span className="font-bold text-4xl mt-6 mb-4">{priceLabel}</span>
          <span className="font-bold  mb-4">Tamanho</span>
          <div className="flex gap-4">
            {product.size.map((size) => (
              <div className="bg-slate-200 rounded-sm py-1 px-2 cursor-pointer">
                <h1 className="font-bold w-30 h-30">{size}</h1>
              </div>
            ))}
          </div>
          <button className="bg-gray-800 mt-8 h-10 rounded-md text-white cursor-not-allowed">
            Adicionar ao carrinho
          </button>
          <button className="border-solid border-black border-2 rounded-md mt-4 h-10 cursor-not-allowed">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
