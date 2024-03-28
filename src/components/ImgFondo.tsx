import Image from 'next/image';
import fondoGatos from '../../public/fondo-gatos.jpg';

export default function ImgFondo() {
  return (
    <div className="absolute -z-10 inset-0">
        <Image
          src={fondoGatos}
          alt='fondo_gatos'
          fill
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute inset-0 " />
    </div>
  );
}