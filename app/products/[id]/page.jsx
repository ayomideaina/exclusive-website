import { notFound } from "next/navigation";
import ProductDetailClient from "../../components/ProductDetailClient";
import { getProductById, getProducts } from "@/data/mockData";

export const revalidate = 60;

export default async function ProductDetail({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
