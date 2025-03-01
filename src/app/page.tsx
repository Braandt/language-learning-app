import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 items-center h-screen justify-center">
      Estudar:
      <Button asChild>
        <Link href='/learn/english'>
          English
        </Link>
      </Button>
      <Button asChild>
        <Link href='/learn/norsk'>
          Norsk
        </Link>
      </Button>
    </div>
  )
}
