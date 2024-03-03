import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <>
      <main className="flex space-y-6">
        <section className="m-auto mt-6">
          <SignUpForm />
        </section>
      </main>
    </>
  )
}
