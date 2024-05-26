import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
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
    const mappedProperties = properties.map((p) => ({
      name: p.name,
      values: p.values,
    }));
    const data = {
      name,
      parentCategory: parentCategory || null,
      properties: mappedProperties,
    };

    try {
      if (editedCategory) {
        data._id = editedCategory._id;
        await axios.put("/api/categories", data);
        setEditedCategory(null);
      } else {
        await axios.post("/api/categories", data);
      }
      setName("");
      setParentCategory("");
      setProperties([]);
      fetchCategories();
    } catch (err) {
      console.error("Error saving category: ", err);
    }
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(category.properties);
  }

  function deleteCategory(category) {
    swal
      .fire({
        title: "Você tem certeza?",
        text: `Você deseja excluir ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sim, excluir",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete("/api/categories?_id=" + _id);
          fetchCategories();
        }
      });
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  return (
    <Layout>
      <h1>Categorias</h1>
      <label>
        {editedCategory
          ? `Editar categoria ${editedCategory.name}`
          : "Criar nova categoria"}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
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
                <option key={category} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Propriedades</label>
          <button
            onClick={addProperty}
            type="button"
            className="btn-default text-sm mb-2"
          >
            Adicionar uma nova propriedade
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div className="flex gap-1 mb-2">
                <input
                  type="text"
                  value={property.name}
                  onChange={(ev) =>
                    handlePropertyNameChange(index, property, ev.target.value)
                  }
                  placeholder="nome da propriedade (exemplo: cor)"
                />
                <input
                  type="text"
                  value={property.values}
                  onChange={(ev) =>
                    handlePropertyValuesChange(index, property, ev.target.value)
                  }
                  placeholder="valores, separados por virgula"
                />
                <button
                  className="btn-default"
                  type="button"
                  onClick={() => removeProperty(index)}
                >
                  Remover
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <button
              className="btn-default"
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName("");
                setParentCategory("");
                setProperties([]);
              }}
            >
              Cancelar
            </button>
          )}
          <button type="submit" className="btn-purple py-1">
            Salvar
          </button>
        </div>
      </form>
      {!editedCategory && (
        <table className="product-table mt-3">
          <thead>
            <tr>
              <td>Nome da categoria</td>
              <td>Categoria principal</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td>
                    <button
                      onClick={() => editCategory(category)}
                      className="btn-purple mr-1"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteCategory(category)}
                      className="btn-purple"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
