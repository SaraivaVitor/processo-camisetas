import Image from "next/image";
import Link from "next/link";
import React from "react";
import { brlFormat } from "../utils/brlFormat";

const ProductCard = ({ thumb, title, description, price, id }) => {
  const priceLabel = brlFormat(price);
  return (
    <div className="flex flex-col md:w-1/4 w-72 hover:scale-105 transition">
      <Link href={`/product?productId=${id}`}>
        <Image
          className="rounded-lg w-full "
          src={thumb}
          alt="search"
          width={450}
          height={800}
          priority
        />
        <h1 className="font-bold mt-2">{title}</h1>
        <div className="flex flex-col">
          <span className="text-gray-500 my-1 text-ellipsis w-full">
            {description}
          </span>
          <span className="font-bold">{priceLabel}</span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
