import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState({});
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price, images, category };
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
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  // function setProductProp(propName, value) {
  //   setProductProperties((prev) => {
  //     const newProductProps = { ...prev };
  //     newProductProps[propName] = value;
  //     return newProductProps;
  //   });
  // }

  // const propertiesToFill = [];
  // if (categories.length > 0 && category) {
  //   let catInfo = categories.find(({ _id }) => _id === category);
  //   propertiesToFill.push(...catInfo.properties);
  //   while (catInfo?.parent?._id) {
  //     const parentCat = categories.find(
  //       ({ _id }) => _id === catInfo?.parent?._id
  //     );
  //     propertiesToFill.push(...parentCat.properties);
  //     catInfo = parentCat;
  //   }
  // }

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
      <label>Categoria</label>
      <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
        <option value="">Sem categoria</option>
        {categories.length > 0 &&
          categories.map((c) => <option value={c._id}>{c.name}</option>)}
      </select>
      {/* {propertiesToFill.length > 0 &&
        propertiesToFill.map((p) => (
          <div className="">
            <label>{p.name[0].toUppercase() + p.name.substring(1)}</label>
            <div>
              <select
                value={productProperties[p.name]}
                onChange={(ev) => setProductProp(p.name, ev.target.value)}
              >
                {p.values.map((v) => (
                  <option value={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>
        ))} */}
      <label>Fotos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable
          list={images}
          setList={updateImagesOrder}
          className="flex flex-wrap gap-1"
        >
          {!!images?.length &&
            images.map((link) => (
              <div
                key={link}
                className="h-24 bg-white p-2 shadow-sm rounded-sm border border-gray-200"
              >
                <img src={link} alt="" className="rounded-lg" />
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}
        <label className="w-24 h-24 flex flex-col items-center text-center justify-center text-sm gap-1 text-primary rounded-md bg-gray-200 cursor-pointer shadow-md border border-primary">
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
          <div>Adicionar Imagens</div>
          <input type="file" className="hidden" onChange={uploadImages} />
        </label>
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
      <button className="btn-blue" type="submit">
        Salvar
      </button>
    </form>
  );
}
