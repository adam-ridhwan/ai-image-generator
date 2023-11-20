import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='bg-secondary/50'>
      <div className='container flex h-32 flex-row items-center justify-center gap-2'>
        <div>
          <Link href='/' className='flex flex-row items-center gap-2'>
            <span className='text-xl font-semibold text-primary'>PixelCraft </span>
            <div>Copyright © 2023 </div>
          </Link>
          <div>Made by Adam Ridhwan </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
