import Layout from "@/components/Layout";
import Link from "next/link";

export default function Products() {
  return (
    <Layout>
      <Link
        href={"products/new-product"}
        className="bg-purple-800 text-white py-1 px-2 rounded-md"
      >
        Adicionar novo produto
      </Link>
    </Layout>
  );
}
