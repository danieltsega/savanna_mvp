import { VerifyAccount } from "@/components/verify-account"

export default function VerifyAccountPage({ params }: { params: { key: string } }) {
  return <VerifyAccount verificationKey={params.key} />
}

