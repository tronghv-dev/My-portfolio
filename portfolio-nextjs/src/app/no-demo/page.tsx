import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "No Demo Available" };

export default function NoDemoPage() {
  return (
    <div className="no-demo__page">
      <div className="no-demo__card">
        <Image
          src="/assets/404page.jpg"
          alt="No demo"
          width={480}
          height={320}
          className="no-demo__img"
          priority
        />
        <p className="no-demo__text">
          Sorry, I&apos;m too lazy to deploy it yet.
        </p>
        <Link href="/" className="no-demo__back">
          ← Về trang chủ
        </Link>
      </div>
    </div>
  );
}
