import Link from 'next/link';
import Image from 'next/image';

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="hidden lg:flex items-center">
        <Image src="/mylogo.svg" alt="Logo" width={28} height={28} />
        <p className="ml-2 font-semibold text-white text-xl">Budget Buddy</p>
      </div>
    </Link>
  );
}

export default HeaderLogo;
