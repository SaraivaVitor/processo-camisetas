export const brlFormat = (value) =>
  value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
