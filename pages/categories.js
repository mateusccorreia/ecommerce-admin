import Layout from "@/components/Layout";

export default function Categories() {
  function saveCategory() {}

  return (
    <Layout>
      <h1>Categorias</h1>
      <label>Nova categoria</label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input className="mb-0" type="text" placeholder={"nome da categoria"} />
        <button type="submit" className="btn-purple py-1">
          Salvar
        </button>
      </form>
    </Layout>
  );
}
