import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"
import Image from "next/image"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#FFF7D8] flex items-center justify-center p-4">
      <div className="grid w-full max-w-5xl grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col justify-center px-8 py-10">
          <div className="mb-6">
           <Image src="/logonew.png" alt="Logo" width={100} height={100} />
          </div>
          <p className="text-base text-[#7E8CA0] mb-6">
            Login or create an account to get started!
          </p>
          <div className="flex items-center justify-center">
            <ClerkLoading>
              <Loader2 className="animate-spin text-muted-foreground" />
            </ClerkLoading>
            <ClerkLoaded>
              <SignIn />
            </ClerkLoaded>
          </div>
        </div>

        <div className="relative hidden md:block">
          <Image
            src="/loginImage2.png"
            alt="Expense Tracker"
            fill
            className="object-cover"
          />
        </div>

      </div>
    </div>
  )
}
