import Image from 'next/image';

export default function Logo({ width, height }) {
  return (
    <div className="logo">
      <Image src="/logo.svg" width={width} height={height} alt="Foogle" />
    </div>
  )
}