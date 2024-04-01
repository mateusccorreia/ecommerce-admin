import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";

export default function Categories() {
  const [name, setName] = useState("");
  async function saveCategory(ev) {
    ev.preventDefault();
    await axios.post("/api/categories", { name });
    setName("");
  }

  return (
    <Layout>
      <h1>Categorias</h1>
      <label>Nova categoria</label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          className="mb-0"
          type="text"
          placeholder={"nome da categoria"}
          onChange={(ev) => setName(ev.target.value)}
          value={name}
        />
        <button type="submit" className="btn-purple py-1">
          Salvar
        </button>
      </form>
    </Layout>
  );
}
