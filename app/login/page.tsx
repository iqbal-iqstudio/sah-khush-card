import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  return (
    <div className="container-shell flex min-h-[80vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-[2rem] border border-taupe/10 bg-white p-8 shadow-soft">
        <p className="eyebrow text-center">SAH-KHUSH</p>
        <h1 className="mt-2 text-center font-serif text-3xl">Welcome Back</h1>
        <p className="mt-1 text-center text-sm text-taupe">Sign in to track orders &amp; wishlists.</p>
        <form className="mt-6 space-y-4" action="#" method="post">
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-3 text-sm outline-none focus:border-brown"
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-3 text-sm outline-none focus:border-brown"
          />
          <Button type="submit" variant="brown" className="w-full btn-lg">Sign In</Button>
        </form>
        <p className="mt-4 text-center text-sm text-taupe">
          New here?{" "}
          <Link href="/products" className="text-brown link-underline">Start shopping</Link>
        </p>
      </div>
    </div>
  );
}
