import {
  PaperPlaneTilt,
  InstagramLogo,
  Globe,
  Phone,
} from '@phosphor-icons/react';
import type { IconProps } from '@phosphor-icons/react';
import PhoneChatIcon from './assets/phone-chat.svg?react';
// import logoLightBg from './assets/logo-light-bg.svg';
import logoDarkBg from './assets/logo-dark-bg.svg';
import './App.css';
import { useEffect, useState } from 'react';

const images = Array.from({ length: 11 }, (_, i) => {
  const number = String(i + 1).padStart(2, '0');
  return `/images/${number}.jpeg`;
});

const PhoneChat = ({ size = 48, color = 'currentColor' }: IconProps) => {
  return <PhoneChatIcon height={size} width={size} fill={color} />;
};

const iconMap = {
  mail: PaperPlaneTilt,
  instagram: InstagramLogo,
  website: Globe,
  phone: Phone,
  phoneChat: PhoneChat,
};

interface TileProps {
  title: string;
  subtitle?: string;
  icon: keyof typeof iconMap;
  href?: string;
}

const Tile = ({ title, subtitle, icon, href }: TileProps) => {
  const IconComponent = iconMap[icon];

  return (
    <a href={href} target='_blank' rel='noreferrer'>
      <div className='flex flex-row gap-4 w-full justify-start items-center p-4 text-light/90 bg-neutral-100/25 border border-neutral-50/20 hover:bg-yellow/33 hover:border-yellow/33 active:bg-yellow/30 active:border-yellow/50 hover:scale-102 active:scale-98 transition-all cursor-pointer rounded-xl shadow-lg hover:shadow-xl active:shadow-md'>
        <IconComponent weight='regular' size='36' />
        <div className='flex flex-col gap-0 justify-center items-start'>
          <p className='font-semibold text-lg select-none'>{title}</p>
          <p className='font-regular text-sm'>{subtitle}</p>
        </div>
      </div>
    </a>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <p className='font-extrabold uppercase tracking-tight text-xl text-light text-left font-header drop-shadow-md'>
        {title}
      </p>
      {children}
    </div>
  );
};

const App = () => {
  const [randomImage, setRandomImage] = useState<string>('');

  console.log({ images });

  useEffect(() => {
    const importImages = async () => {
      const randomIndex = Math.floor(Math.random() * images.length);
      setRandomImage(images[randomIndex]);
    };

    importImages();
  }, []);

  return (
    <div
      className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-cover bg-center'
      style={{ backgroundImage: `url(${randomImage})` }}
    >
      <div className='fixed w-full h-full bg-dark/90 flex justify-center items-center p-4'>
        <div className='flex flex-col w-fit justify-center items-center gap-2 overflow-hidden overscroll-none'>
          <div className='flex justify-center items-center object-scale-down max-w-[400px] p-4'>
            <img src={logoDarkBg} alt='logo' />
          </div>
          <div className='flex flex-col gap-8 bg-neutral-50/20 px-4 py-6 md:px-6 md:py-8 border border-neutral-50/20 rounded-2xl drop-shadow-2xl shadow-xl w-full backdrop-blur-sm'>
            <Section title='Learn More'>
              <Tile
                title='Website'
                subtitle='confidentialdetailers.com'
                icon='website'
                href='https://www.confidentialdetailers.com'
              />
              <Tile
                title='Instagram'
                subtitle='@confidentialdetailers'
                icon='instagram'
                href='https://www.instagram.com/confidentialdetailers'
              />
            </Section>
            <Section title='Contact Us'>
              <Tile
                title='Call or Text'
                subtitle='(310) 993-5094'
                icon='phoneChat'
                href='sms:+13109935094'
              />
              <Tile
                title='Email'
                subtitle='rg@confidentialdetailers.com'
                icon='mail'
                href='mailto:rg@confidentialdetailers.com'
              />
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
