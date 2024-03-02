import { LuAlertTriangle } from "react-icons/lu"

export default function AuthFormError({ state }: { state: { error: string } }) {
  if (state.error)
    return (
      <div className="bg-red-500 py-2 px-4 rounded-md flex items-center gap-x-3 text-white">
        <LuAlertTriangle />
        <span className="text-sm">{state.error ?? ''}</span>
      </div>
    )

  return null
}
