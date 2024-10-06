import Link from "next/link";


export default function Header() {

  return (
    <header>
      <h1>Mus Site</h1>
      <nav className="w-80 flex justify-evenly">
        <Link href="/">Home</Link>
        <Link href="/posts/new">Add Music</Link>
      </nav>
    </header>
  )
}