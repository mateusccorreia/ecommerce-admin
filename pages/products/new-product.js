import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";

export default function NewProdut() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  async function createProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price };
    await axios.post("/api/products", data);
  }

  return (
    <Layout>
      <form onSubmit={createProduct}>
        <h1 className="text-purple-900 mb-2 text-xl">
          <b>Novo produto</b>
        </h1>
        <label htmlFor="product-name" className="text-purple-900">
          Nome do Produto
        </label>
        <input
          type="text"
          placeholder="insira o nome"
          id="product-name"
          name="product-name"
          className="border-2 border-gray-300 rounded-md px-1 w-full mb-2"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <label htmlFor="description" className="text-purple-900">
          Descrição
        </label>
        <textarea
          type="text"
          placeholder="insira a descrição"
          id="description"
          name="description"
          className="border-2 border-gray-300 rounded-md px-1 w-full mb-2"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        ></textarea>
        <label htmlFor="price" className="text-purple-900">
          Preço (R$)
        </label>
        <input
          type="text"
          placeholder="insira o preço"
          id="product-price"
          name="product-price"
          className="border-2 border-gray-300 rounded-md px-1 w-full mb-2"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <button
          className="bg-purple-800 text-white px-4 py-1 rounded-sm mt-2"
          type="submit"
        >
          Salvar
        </button>
      </form>
    </Layout>
  );
}
