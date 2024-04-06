import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState("");
  useEffect(() => {
    fetchCategories();
  }, []);
  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }
  async function saveCategory(ev) {
    ev.preventDefault();
    await axios.post("/api/categories", { name, parentCategory });
    setName("");
    fetchCategories();
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
        <select
          onChange={(ev) => setParentCategory(ev.target.value)}
          value={parentCategory}
        >
          <option value="">Sem categoria principal</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option value={category._id}>{category.name}</option>
            ))}
        </select>
        <button type="submit" className="btn-purple py-1">
          Salvar
        </button>
      </form>
      <table className="product-table mt-3">
        <thead>
          <tr>
            <td>Nome da categoria</td>
            <td>Categoria principal</td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr>
                <td>{category.name}</td>
                <td>{category.parent}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
