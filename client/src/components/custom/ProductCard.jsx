import { useEffect, useState } from "react";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { productFetch } from "@/store/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";
import client from "@/config/api";

export function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  const { user } = useSelector((state) => state.auth); 
  const { _id, image, discount, description, quantity, rate, title, type } = product;

  const originalPrice = discount ? Math.round(rate / (1 - discount / 100)) : null;
  const discountDisplay = discount ?? null;

  const handleAddToCart = async () => {
    try {
      setCartLoading(true);

      await client.post("/product/cartAdd", {
        userId: user._id,
        cartArray: [
          {
            productId: _id,
            quantity: 1,
          },
        ],
      });

      setAddedToCart(true);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setCartLoading(false);
    }
  };

  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* ── Image Section ── */}
      <div className="relative overflow-hidden bg-zinc-50 aspect-square">
        <img
          src={image[0]?.url}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {type && (
            <Badge className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-zinc-900 hover:bg-zinc-900 text-white">
              {type}
            </Badge>
          )}
          {discountDisplay && (
            <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white text-[11px] font-semibold px-2 py-0.5 rounded-lg">
              -{discountDisplay}%
            </Badge>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted((w) => !w)}
          className={cn(
            "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
            wishlisted
              ? "bg-rose-50 text-rose-500"
              : "bg-white/80 backdrop-blur-sm text-zinc-400 opacity-0 group-hover:opacity-100 hover:text-rose-500",
          )}
          aria-label="Wishlist"
        >
          <Heart className={cn("w-4 h-4", wishlisted && "fill-rose-500")} />
        </button>

        {/* Quick View */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-zinc-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm hover:bg-white transition-colors">
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      <CardContent className="px-4 pt-3 pb-2 space-y-1">
        {/* Type as brand-like label */}
        {type && (
          <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
            {type}
          </p>
        )}

        <h3 className="text-sm font-semibold text-zinc-900 leading-snug line-clamp-2">
          {title}
        </h3>

        {description && (
          <p className="text-[11px] text-zinc-400 line-clamp-2">
            {description}
          </p>
        )}

        <p
          className={cn(
            "text-[11px] font-medium",
            quantity > 0 ? "text-emerald-500" : "text-rose-500",
          )}
        >
          {quantity > 0 ? `${quantity} in stock` : "Out of stock"}
        </p>

        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-base font-black text-zinc-900">
            ₹{rate?.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-xs text-zinc-400 line-through">
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </CardContent>

        <CardFooter className="px-4 pb-4 pt-1">
      <Button
        onClick={handleAddToCart}
        disabled={quantity === 0 || cartLoading}
        className={cn(
          "w-full rounded-xl text-sm font-semibold transition-all duration-300",
          addedToCart
            ? "bg-emerald-500 hover:bg-emerald-500 text-white"
            : "bg-zinc-900 hover:bg-zinc-700 text-white",
        )}
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        {cartLoading ? "Adding..." : addedToCart ? "Added!" : "Add to Cart"}
      </Button>
    </CardFooter>
    </Card>
  );
}

export default function ProductCardDemo() {
  const { products, error, loading } = useSelector((state) => state.product);
  console.log("first", products);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("firstqqqq");
    dispatch(productFetch());
  }, []);
  return (
    <>
      <div className="min-h-screen bg-zinc-50 p-8">
        <h2 className="text-2xl font-black text-zinc-900 mb-6 tracking-tight">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {(products ?? []).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
