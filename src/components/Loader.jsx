import { Skeleton } from "@/components/ui/skeleton"

function Loader() {
  return <div className="mb-4">
    <Skeleton className="h-[100px] w-full bg-zinc-200" />
  </div>
}

export default Loader;