import Layout from "@/components/Layout";

export default function NewProdut() {
  return (
    <Layout>
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
      />
      <button className="bg-purple-800 text-white px-4 py-1 rounded-sm mt-2">
        Salvar
      </button>
    </Layout>
  );
}
