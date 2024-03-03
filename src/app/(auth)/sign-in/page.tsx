import SignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <>
      <main className="flex space-y-6">
        <section className="m-auto mt-6">
          <SignInForm />
        </section>
      </main>
    </>
  )
}
