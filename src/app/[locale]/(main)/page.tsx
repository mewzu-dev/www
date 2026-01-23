import { Hero } from "@/components/home/hero";
import { FeaturedProducts } from "@/components/home/featured-products";
import { ConceptVideo } from "@/components/home/concept-video";
import { getFeaturedProducts } from "@/sanity/lib";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <Hero />
      <FeaturedProducts products={featuredProducts} />
      <ConceptVideo />
    </>
  );
}
