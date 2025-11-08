import Product from "@/models/Product";
import dbConnect from "@/lib/db";

export default async function sitemap() {
  // Connect to MongoDB
  await dbConnect();

  // Fetch all products
  const products = await Product.find({}, "slug");

  // Base URL of your site
  const baseUrl = "https://www.mrxycaps.in";

  // Static routes (add as needed)
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/products",
    "/privacy-policy",
    "/refund-policy",
    "/shipping-policy",
    "/terms-and-conditions",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  // Dynamic product routes
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(),
  }));

  // Return combined sitemap
  return [...staticRoutes, ...productRoutes];
}
