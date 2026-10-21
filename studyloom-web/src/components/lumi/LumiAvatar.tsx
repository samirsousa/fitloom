import { useLumiLook } from '../../store/useLumiStore'

interface Props {
  alt: string
}

// Lumi com a fantasia, o acessório e a pelagem equipados. A moldura fica no componente pai.
export default function LumiAvatar({ alt }: Props) {
  const look = useLumiLook()
  return <img src={look.imgPath} alt={alt} className={look.furClass} />
}
