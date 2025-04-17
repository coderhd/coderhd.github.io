"use client"
import { useState, useEffect, useRef } from "react"
import { Instagram, Linkedin, Github, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Logo from "./components/Logo"
import { useLoading } from "./providers/LoadingProvider"
import AboutPic from "../public/portfolio-pic.jpg";

// Types for company data
interface CompanyDetail {
  position: string;
  companyName: string;
  link: string;
  startDate: string;
  lastDate: string;
  details: string[];
}

interface Company {
  name: string;
  description: CompanyDetail;
}

// Experience tabs component
const ExperienceTabs = ({ companies }: { companies: Company[] }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({
    top: 0,
    height: 0,
    opacity: 0,
    transition: 'none'
  });

  // Set initial indicator on mount
  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeTabElement = tabsContainerRef.current.children[activeTab] as HTMLElement;
      if (activeTabElement) {
        setIndicatorStyle({
          top: activeTabElement.offsetTop + 'px',
          height: activeTabElement.offsetHeight + 'px',
          opacity: 1,
          transition: 'none'
        });
      }
    }
  }, []);

  const handleTabChange = (index: number) => {
    if (tabsContainerRef.current) {
      const targetTabElement = tabsContainerRef.current.children[index] as HTMLElement;
      if (targetTabElement) {
        // Set smooth transition for subsequent tab changes
        setIndicatorStyle({
          top: targetTabElement.offsetTop + 'px',
          height: targetTabElement.offsetHeight + 'px',
          opacity: 1,
          transition: 'all 0.3s ease-out'
        });
        setActiveTab(index);
      }
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row">
      {/* Tab list - vertical company names */}
      <div className="w-full md:w-60 mb-8 md:mb-0 border-b md:border-b-0 md:border-l border-[#64ffda]/30 relative">
        {/* Animated indicator */}
        <span
          className="absolute left-0 w-0.5 bg-[#64ffda] z-10"
          style={indicatorStyle}
        ></span>

        <div ref={tabsContainerRef}>
          {companies.map((company: Company, index: number) => (
            <button
              key={company.name}
              className={`text-left py-3 px-5 w-full focus:outline-none transition-all font-mono text-sm cursor-pointer
                ${index === activeTab ?
                  'text-[#64ffda] bg-[#112240]/50' :
                  'text-gray-400 hover:text-[#64ffda] hover:bg-[#112240]/20'}`}
              onClick={() => handleTabChange(index)}
            >
              {company.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tab panels - company details */}
      <div className="md:pl-8 flex-1">
        {companies.map((company: Company, index: number) => (
          <div
            key={index}
            className={`${index === activeTab ? 'block' : 'hidden'}`}
          >
            <div className="mb-2">
              <h3 className="text-lg font-medium text-gray-200">
                <span>
                  {company.description.position}{" "}
                </span>
                <span className="text-[#64ffda]">
                  <span>@{" "}</span>
                  <Link
                    href={company.description.link}
                    target="_blank"
                    className="group relative"
                  >
                    <span className="relative">
                      {company.description.companyName}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#64ffda] transition-all group-hover:w-full"></span>
                    </span>
                  </Link>
                </span>
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {company.description.startDate} - {company.description.lastDate}
              </p>
            </div>

            <ul className="space-y-3 text-sm text-gray-400 mt-5">
              {company.description.details.map((detail: string, i: number) => (
                <li key={i} className="flex">
                  <span className="text-[#64ffda] mr-2 flex-shrink-0">▹</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const email = "harshdave1094@gmail.com";
  const socialLinks = {
    linkedin: 'https://www.linkedin.com/in/harshdave95',
    github: 'https://github.com/coderhd',
    instagram: 'https://www.instagram.com/harshh.1995',
    twitter: 'https://x.com/harshdave1094',
  };
  const companies = [
    {
      name: "American Express",
      description: {
        position: "Engineer II",
        companyName: "American Express",
        link: "https://www.americanexpress.com/",
        startDate: "January 2023",
        lastDate: "Present",
        details: [
          "Developing highly interactive web applications for American Express using React",
          "Developing Common Libraries used internally and Managing CI/CD Pipelines",
          "Work with a variety of different languages, platforms, frameworks, and content management systems such as JavaScript, React, Java, SpringBoot and OracleDB"
        ]
      }
    },
    {
      name: "ConvertCart",
      description: {
        position: "Software Developer",
        companyName: "ConvertCart",
        link: "https://www.convertcart.com/",
        startDate: "August 2021",
        lastDate: "December 2022",
        details: [
          "Write modern, performant, maintainable code for a diverse array of SaaS Products",
          "Work with a variety of different languages, platforms and frameworks such as JavaScript, TypeScript, React, and Node"
        ]
      }
    },
    {
      name: "Alchemy",
      description: {
        position: "Frontend Developer",
        companyName: "Alchemy Technologies",
        link: "https://www.alchemytech.ca/",
        startDate: "April 2020",
        lastDate: "July 2021",
        details: [
          "Developed and shipped highly interactive web applications for clients using React, Redux, MaterialUI, and Tailwind",
          "Interfaced with clients on a monthly basis, providing project updates"
        ]
      }
    },
    {
      name: "Ashutec",
      description: {
        position: "Software Engineer",
        companyName: "Ashutec Solutions",
        link: "https://www.ashutec.com/",
        startDate: "August 2019",
        lastDate: "March 2020",
        details: [
          "Developed and maintained code for in-house and client websites primarily using Vue.js, React, and Javascript",
          "Manually tested sites in various browsers and mobile devices to ensure cross - browser compatibility and responsiveness"
        ]
      }
    },
  ];
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoading } = useLoading();

  // Handle smooth scrolling for anchor links
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Offset for navbar height
        behavior: 'smooth'
      });
      // Close mobile menu if open
      setMobileMenuOpen(false);
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        // Hide navbar on scroll down, show on scroll up
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setNavbarVisible(false);
        } else {
          setNavbarVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // Cleanup
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <main className="bg-[#0c192f] text-gray-300 min-h-screen">
      {/* Navigation */}
      <header
        className={`fixed w-full top-0 z-50 transition-transform duration-300 bg-[#0c192f]/80 backdrop-blur-sm px-4 md:px-8 py-4 ${navbarVisible ? 'translate-y-0' : '-translate-y-full'
          } ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}
      >
        <div className="max-w-[90%] mx-auto flex justify-between items-center">
          <a
            href="#"
            onClick={(e) => handleSmoothScroll(e, 'hero')}
            className="text-2xl font-bold transition-opacity hover:opacity-80 z-20"
          >
            <Logo size={60} />
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden z-30 p-2"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <Image
              src={mobileMenuOpen ? "/close.svg" : "/menu.svg"}
              alt={mobileMenuOpen ? "Close menu" : "Open menu"}
              width={24}
              height={24}
              className="text-[#64ffda]"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-6 text-sm font-mono">
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleSmoothScroll(e, 'about')}
                  className="group text-gray-300 hover:text-[#64ffda] transition-colors"
                >
                  <span className="text-[#64ffda] mr-1">01.</span>
                  <span className="relative">
                    About
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#64ffda] transition-all group-hover:w-full" />
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  onClick={(e) => handleSmoothScroll(e, 'experience')}
                  className="group text-gray-300 hover:text-[#64ffda] transition-colors"
                >
                  <span className="text-[#64ffda] mr-1">02.</span>
                  <span className="relative">
                    Experience
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#64ffda] transition-all group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={(e) => handleSmoothScroll(e, 'projects')}
                  className="group text-gray-300 hover:text-[#64ffda] transition-colors"
                >
                  <span className="text-[#64ffda] mr-1">03.</span>
                  <span className="relative">
                    Projects
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#64ffda] transition-all group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, 'contact')}
                  className="group text-gray-300 hover:text-[#64ffda] transition-colors"
                >
                  <span className="text-[#64ffda] mr-1">04.</span>
                  <span className="relative">
                    Contact
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#64ffda] transition-all group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li>
                <Link
                  href="https://drive.google.com/file/d/19r3mIyShOkOAAXVclH_0EaxNQAp-kUsk/view"
                  target="_blank"
                  className="border border-[#64ffda] text-[#64ffda] px-3 py-2 rounded-sm hover:bg-[#64ffda]/10 transition-colors"
                >
                  Resume
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Drawer - Completely separate from header */}
      <div
        className={`fixed top-0 left-0 w-full h-full z-40 transition-all duration-300 ease-in-out md:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        {/* Backdrop */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#0c192f]/80 backdrop-blur-md"></div>

        {/* Mobile menu content - with slower sliding animation */}
        <div
          className={`absolute top-0 right-0 w-full sm:w-[400px] h-full flex items-center justify-center p-8 overflow-y-auto transition-transform duration-500 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <nav className="w-full max-w-sm">
            <ul className="flex flex-col items-center gap-8 font-mono">
              <li className="w-full text-center">
                <a
                  href="#about"
                  onClick={(e) => handleSmoothScroll(e, 'about')}
                  className="inline-block py-3 group text-gray-300 hover:text-[#64ffda] transition-colors"
                >
                  <div className="text-[#64ffda] text-sm mb-1">01.</div>
                  <span className="relative text-xl">
                    About
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#64ffda] transition-all group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li className="w-full text-center">
                <a
                  href="#experience"
                  onClick={(e) => handleSmoothScroll(e, 'experience')}
                  className="inline-block py-3 group text-gray-300 hover:text-[#64ffda] transition-colors"
                >
                  <div className="text-[#64ffda] text-sm mb-1">02.</div>
                  <span className="relative text-xl">
                    Experience
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#64ffda] transition-all group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li className="w-full text-center">
                <a
                  href="#projects"
                  onClick={(e) => handleSmoothScroll(e, 'projects')}
                  className="inline-block py-3 group text-gray-300 hover:text-[#64ffda] transition-colors"
                >
                  <div className="text-[#64ffda] text-sm mb-1">03.</div>
                  <span className="relative text-xl">
                    Projects
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#64ffda] transition-all group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li className="w-full text-center">
                <a
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, 'contact')}
                  className="inline-block py-3 group text-gray-300 hover:text-[#64ffda] transition-colors"
                >
                  <div className="text-[#64ffda] text-sm mb-1">04.</div>
                  <span className="relative text-xl">
                    Contact
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#64ffda] transition-all group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li className="w-full text-center mt-6">
                <Link
                  href="https://drive.google.com/file/d/19r3mIyShOkOAAXVclH_0EaxNQAp-kUsk/view"
                  target="_blank"
                  className="border border-[#64ffda] text-[#64ffda] px-8 py-4 rounded-sm hover:bg-[#64ffda]/10 transition-colors inline-block text-base"
                >
                  Resume
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Side social links - hidden on small screens */}
      <div className={`fixed left-8 bottom-0 md:flex flex-col items-center gap-6 after:content-[''] after:w-[1px] after:h-24 after:bg-gray-400 after:mt-6 ${isLoading ? 'opacity-0' : 'opacity-100 animate-fadeIn'} hidden`}>
        <Link href={socialLinks.linkedin} target="_blank" className="hover:text-[#64ffda] transition-colors p-2 duration-200">
          <Linkedin size={20} />
        </Link>
        <Link href={socialLinks.github} target="_blank" className="hover:text-[#64ffda] transition-colors p-2 duration-200">
          <Github size={20} />
        </Link>
        <Link href={socialLinks.instagram} target="_blank" className="hover:text-[#64ffda] transition-colors p-2 duration-200">
          <Instagram size={20} />
        </Link>
        <Link href={socialLinks.twitter} target="_blank" className="hover:text-[#64ffda] transition-colors p-2 duration-200">
          <Twitter size={20} />
        </Link>
      </div>

      {/* Email on right side - hidden on small screens */}
      <div className={`fixed right-8 bottom-0 md:flex flex-col items-center gap-6 after:content-[''] after:w-[1px] after:h-24 after:bg-gray-400 after:mt-6 ${isLoading ? 'opacity-0' : 'opacity-100 animate-fadeIn'} hidden`}>
        <Link
          href={`mailto:${email}`}
          target="_blank"
          className="[writing-mode:vertical-lr] hover:text-[#64ffda] transition-colors text-xs tracking-widest duration-200"
        >
          {email}
        </Link>
      </div>

      {/* Main content */}
      <div className={`max-w-[90%] sm:max-w-[85%] md:max-w-[80%] mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-24 pt-32 ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-700'}`}>
        {/* Hero section */}
        <section id="hero" className={`min-h-[80vh] flex flex-col justify-center ${isLoading ? 'opacity-0' : 'opacity-100 animate-fadeInUp'}`}>
          <p className="text-[#64ffda] mb-5 font-mono text-sm">Hi, my name is</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-200 mb-4">Harsh Dave.</h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-400 mb-6">I build things for the web.</h2>
          <p className="max-w-xl text-gray-400 mb-12 text-sm sm:text-md">
            I&apos;m a software engineer based in Bengaluru specializing in building and occasionally designing
            high-quality websites and applications.
          </p>
          <Link
            href={`mailto:${email}`}
            target="_blank"
            className="border border-[#64ffda] text-[#64ffda] px-5 sm:px-6 py-3 rounded-sm hover:bg-[#64ffda]/10 transition-colors w-fit text-sm font-mono duration-300"
          >
            Get In Touch
          </Link>
        </section>

        {/* About section */}
        <section id="about" className={`py-20 md:py-24 scroll-mt-24 ${isLoading ? 'opacity-0' : 'opacity-100 animate-fadeInUp animation-delay-500'}`}>
          <h2 className="flex items-center text-xl font-semibold text-gray-200 mb-10">
            <span className="text-[#64ffda] mr-2 font-mono text-base">01.</span>{" "}<span>About Me</span>
            <span className="hidden sm:block ml-4 h-[1px] bg-gray-700 flex-grow max-w-[250px]"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2">
              <p className="mb-4 text-sm sm:text-md text-gray-400">
                Hello! I&apos;m Harsh, a software engineer based in Bengaluru, who
                enjoys building things that live on the internet. I develop websites
                and web applications that provide intuitive, pixel-perfect user interfaces
                with efficient and modern backends.
              </p>
              <p className="mb-4 text-sm sm:text-md text-gray-400">
                <span>Shortly after graduating from{' '}</span><Link href="https://gtu.ac.in/" target="_blank" className="text-[#64ffda]">Gujarat Technological University</Link>
                <span>, I joined the development team at{' '}</span><Link href="https://www.ashutec.com/" target="_blank" className="text-[#64ffda]">Ashutec Solutions</Link>
                <span>, where I work on a wide variety of interesting and meaningful projects on a daily basis.</span>
                <span> Currently I work at{' '}</span><Link href="https://www.americanexpress.com/" target="_blank" className="text-[#64ffda]">American Express</Link>
                <span>, where I work on a wide variety of interesting and meaningful projects on a daily basis.</span>
              </p>
              <p className="mb-6 text-sm sm:text-md text-gray-400">Here are a few technologies I&apos;ve been working with recently:</p>

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                <div className="flex items-center">
                  <span className="text-[#64ffda] mr-2">▹</span> HTML & (S)CSS
                </div>
                <div className="flex items-center">
                  <span className="text-[#64ffda] mr-2">▹</span> JavaScript (ES6+)
                </div>
                <div className="flex items-center">
                  <span className="text-[#64ffda] mr-2">▹</span> TypeScript
                </div>
                <div className="flex items-center">
                  <span className="text-[#64ffda] mr-2">▹</span> React.js
                </div>
                <div className="flex items-center">
                  <span className="text-[#64ffda] mr-2">▹</span> Node.js
                </div>
                <div className="flex items-center">
                  <span className="text-[#64ffda] mr-2">▹</span> Express
                </div>
                <div className="flex items-center">
                  <span className="text-[#64ffda] mr-2">▹</span> Redux
                </div>
                <div className="flex items-center">
                  <span className="text-[#64ffda] mr-2">▹</span> Figma & Adobe XD
                </div>
              </div>
            </div>

            <div className="relative group mt-4 md:mt-0 flex justify-center md:justify-start">
              <div className="absolute -inset-2 rounded bg-[#64ffda]/20 group-hover:bg-[#64ffda]/30 transition-colors duration-300"></div>
              <div className="relative">
                <Image
                  src={AboutPic}
                  alt="Harsh Dave"
                  width={300}
                  height={300}
                  className="rounded grayscale hover:grayscale-0 transition-all duration-300 z-10 relative w-48 sm:w-64 md:w-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Experience section */}
        <section id="experience" className={`py-20 md:py-24 scroll-mt-24 ${isLoading ? 'opacity-0' : 'opacity-100 animate-fadeInUp animation-delay-700'}`}>
          <h2 className="flex items-center text-xl font-semibold text-gray-200 mb-10">
            <span className="text-[#64ffda] mr-2 font-mono text-base">02.</span>{" "}<span>Where I&apos;ve Worked</span>
            <span className="hidden sm:block ml-4 h-[1px] bg-gray-700 flex-grow max-w-[250px]"></span>
          </h2>

          {/* Tabs container */}
          <ExperienceTabs companies={companies} />
        </section>

        {/* Projects section */}
        <section id="projects" className={`py-20 md:py-24 scroll-mt-24 ${isLoading ? 'opacity-0' : 'opacity-100 animate-fadeInUp animation-delay-900'}`}>
          <h2 className="flex items-center text-xl font-semibold text-gray-200 mb-10">
            <span className="text-[#64ffda] mr-2 font-mono text-base">03.</span>{" "}<span>Some Things I&apos;ve Built</span>
            <span className="hidden sm:block ml-4 h-[1px] bg-gray-700 flex-grow max-w-[250px]"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#112240] p-6 rounded hover:-translate-y-2 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="text-[#64ffda]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div className="flex gap-3">
                  <a href="#" className="text-gray-400 hover:text-[#64ffda]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#64ffda]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
              <h3 className="text-gray-200 text-lg sm:text-xl mb-2 font-medium">E-commerce Platform</h3>
              <p className="text-xs text-gray-400 mb-4">
                A full-featured e-commerce solution with product management, cart functionality, and secure payment processing.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                <span>React</span>
                <span>Node.js</span>
                <span>MongoDB</span>
                <span>Stripe API</span>
              </div>
            </div>

            <div className="bg-[#112240] p-6 rounded hover:-translate-y-2 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="text-[#64ffda]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div className="flex gap-3">
                  <a href="#" className="text-gray-400 hover:text-[#64ffda]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#64ffda]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
              <h3 className="text-gray-200 text-lg sm:text-xl mb-2 font-medium">Analytics Dashboard</h3>
              <p className="text-xs text-gray-400 mb-4">
                Interactive data visualization dashboard with real-time analytics, customizable widgets, and reporting.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                <span>React</span>
                <span>D3.js</span>
                <span>Firebase</span>
                <span>Chart.js</span>
              </div>
            </div>

            <div className="bg-[#112240] p-6 rounded hover:-translate-y-2 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="text-[#64ffda]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div className="flex gap-3">
                  <a href="#" className="text-gray-400 hover:text-[#64ffda]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#64ffda]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
              <h3 className="text-gray-200 text-lg sm:text-xl mb-2 font-medium">Social Media App</h3>
              <p className="text-xs text-gray-400 mb-4">
                Mobile-first social networking application with real-time messaging, post sharing, and user profiles.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                <span>React Native</span>
                <span>Express</span>
                <span>Socket.io</span>
                <span>AWS</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact section */}
        <section id="contact" className={`py-20 md:py-24 scroll-mt-24 text-center ${isLoading ? 'opacity-0' : 'opacity-100 animate-fadeInUp animation-delay-1000'}`}>
          <h2 className="flex items-center justify-center text-xl font-semibold text-gray-200 mb-10">
            <span className="text-[#64ffda] mr-2 font-mono text-base">04.</span>{" "}<span>What&apos;s Next?</span>
          </h2>

          <h3 className="text-3xl md:text-4xl font-bold text-gray-200 mb-6">Get In Touch</h3>
          <p className="max-w-md mx-auto text-gray-400 mb-10 text-sm sm:text-md">
            I&apos;m currently open to freelance opportunities and new projects. If you have an exciting project in mind or just want to say hi, feel free to reach out and I&apos;ll get back to you as soon as possible!
          </p>

          <Link
            href={`mailto:${email}`}
            target="_blank"
            className="border border-[#64ffda] text-[#64ffda] px-6 sm:px-8 py-3 sm:py-4 rounded-sm hover:bg-[#64ffda]/10 transition-colors inline-block text-sm font-mono duration-300"
          >
            Say Hello
          </Link>
        </section>
      </div>

      {/* Footer */}
      <div id="footer-container" className={`bg-[#64ffda] w-full h-18 sm:h-24 transition-colors duration-300 flex items-center justify-center z-10 relative ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
        <footer
          id="footer"
          className="py-3 sm:py-4 px-8 text-center font-mono text-[#0c192f] text-sm sm:text-lg transition-colors duration-300"
        >
          {/* Mobile social links (visible only on mobile) */}
          <div className="flex items-center justify-center gap-6 mb-3 md:hidden">
            <Link href={socialLinks.linkedin} target="_blank" className="text-[#0c192f] transition-colors p-1">
              <Linkedin size={18} />
            </Link>
            <Link href={socialLinks.github} target="_blank" className="text-[#0c192f] transition-colors p-1">
              <Github size={18} />
            </Link>
            <Link href={socialLinks.instagram} target="_blank" className="text-[#0c192f] transition-colors p-1">
              <Instagram size={18} />
            </Link>
            <Link href={socialLinks.twitter} target="_blank" className="text-[#0c192f] transition-colors p-1">
              <Twitter size={18} />
            </Link>
          </div>
          <span
            className="inline-block cursor-pointer hover:text-[#64ffda] transition-colors duration-300"
            onMouseEnter={() => {
              document.getElementById('footer-container')?.classList.add('bg-transparent');
              document.getElementById('footer-container')?.classList.remove('bg-[#64ffda]');
            }}
            onMouseLeave={() => {
              document.getElementById('footer-container')?.classList.remove('bg-transparent');
              document.getElementById('footer-container')?.classList.add('bg-[#64ffda]');
            }}
          >
            <a
              href="https://github.com/coderhd/coderhd.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-inherit"
            >
              Designed & Built By Harsh Dave
            </a>
          </span>
        </footer>
      </div>
    </main>
  )
}
