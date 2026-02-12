import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  
  return (
    <main className="sm:min-h-screen bg-white ">
      <section className="pt-32 pb-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 ">
            Welcome to ShopMart
          </h1>
          <p className="text-base text-gray-500 mb-10 max-w-xl mx-auto">
            Discover the latest technology, fashion, and lifestyle products.
            Quality guaranteed with fast shipping and excellent customer
            service.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/products">
              <Button className="bg-black text-white hover:bg-gray-800 px-6 py-5 text-sm font-medium rounded-md">
                Shop Now
              </Button>
            </Link>
            <Link href="/categories">
              <Button
                variant="outline"
                className="border-2 border-gray-900 text-gray-900 hover:bg-gray-50 px-6 py-5 text-base font-medium rounded-lg"
              >
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
