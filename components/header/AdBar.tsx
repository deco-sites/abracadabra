export interface Props {
  label?: string;
}

export default function AdBar({ label }: Props) {
  return (
    <div class="w-full text-start px-7 sm:px-0 sm:text-center bg-red-medium text-white py-1 font-bold">
      <span class="text-xs sm:text-sm">{label ?? 'Compre no site e retire na loja'}</span>
    </div>
  )
}
