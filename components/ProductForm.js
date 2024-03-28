import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price };
    if (_id) {
      //update
      await axios.put("/api/products", { ...data, _id });
    } else {
      //create
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push("/products");
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <label htmlFor="product-name">Nome do Produto</label>
      <input
        type="text"
        placeholder="insira o nome"
        id="product-name"
        name="product-name"
        className="border-2 border-gray-300 rounded-md px-1 w-full mb-2"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Fotos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        {!!images?.length &&
          images.map((link) => (
            <div key={link} className="h-24">
              <img src={link} alt="" className="rounded-lg" />
            </div>
          ))}
        <label className="w-24 h-24 flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          <input type="file" className="hidden" onChange={uploadImages} />
        </label>
        {!images?.length && <div>Sem fotos nesse produto</div>}
      </div>
      <label htmlFor="description">Descrição</label>
      <textarea
        type="text"
        placeholder="insira a descrição"
        id="description"
        name="description"
        className="border-2 border-gray-300 rounded-md px-1 w-full mb-2"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      ></textarea>
      <label htmlFor="price">Preço (R$)</label>
      <input
        type="number"
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
  );
}
