import dynamic from "next/dynamic";
import { Hero } from "@/components/home/hero";
import { getFeaturedProducts } from "@/sanity/lib";

// Lazy load below-the-fold components to reduce initial bundle
const FeaturedProducts = dynamic(
  () =>
    import("@/components/home/featured-products").then(
      (mod) => mod.FeaturedProducts,
    ),
  {
    loading: () => (
      <div className="min-h-[600px] animate-pulse bg-gradient-to-b from-background to-muted" />
    ),
  },
);

const ConceptVideo = dynamic(
  () =>
    import("@/components/home/concept-video").then((mod) => mod.ConceptVideo),
  {
    loading: () => (
      <div className="min-h-[500px] animate-pulse bg-gradient-to-b from-muted to-background" />
    ),
  },
);

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
