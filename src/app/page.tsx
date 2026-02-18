"use client";

import { Album, CalendarDays, ChevronRight, Facebook, Instagram, Youtube, MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { TypingEffect } from "@/components/ui/typing-effect";

gsap.registerPlugin(ScrollTrigger);

// Mock Data for Landing Page
const projects = [
    {
        id: 1,
        title: "Vote SIM!",
        subtitle: "Pela redução da carga tributária",
        image: "https://picsum.photos/seed/project1/800/600",
        status: "Aprovado",
    },
    {
        id: 2,
        title: "Metas para 2026",
        subtitle: "Conheça o plano de expansão",
        image: "https://picsum.photos/seed/project2/800/600",
        status: "Em andamento",
    },
    {
        id: 3,
        title: "Recursos para Saúde",
        subtitle: "R$ 5 milhões para o Hospital Regional",
        image: "https://picsum.photos/seed/project3/800/600",
        status: "Concluído",
    },
    {
        id: 4,
        title: "Educação em Foco",
        subtitle: "Reforma de 10 escolas no interior",
        image: "https://picsum.photos/seed/project4/800/600",
        status: "Em licitação",
    },
];

const galleryImages = [
    "https://picsum.photos/seed/gallery1/800/600",
    "https://picsum.photos/seed/gallery2/800/600",
    "https://picsum.photos/seed/gallery3/800/600",
    "https://picsum.photos/seed/gallery4/800/600",
];

const news = [
    {
        id: 1,
        title: "Murillo Gouvea visita obras no Noroeste",
        date: "18 Fev 2026",
        summary: "O deputado esteve presente na fiscalização das novas estradas...",
        image: "https://picsum.photos/seed/news1/800/600"
    },
    {
        id: 2,
        title: "Aprovada lei de incentivo ao esporte",
        date: "15 Fev 2026",
        summary: "Projeto visa ampliar o acesso a escolinhas de futebol...",
        image: "https://picsum.photos/seed/news2/800/600"
    },
    {
        id: 3,
        title: "Encontro regional de lideranças",
        date: "10 Fev 2026",
        summary: "Reunião definiu estratégias para o próximo semestre...",
        image: "https://picsum.photos/seed/news3/800/600"
    }
];

export default function LandingPage() {
    const heroRef = useRef<HTMLElement>(null);
    const heroTextRef = useRef<HTMLDivElement>(null);
    const heroImageRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLElement>(null);
    const bioRef = useRef<HTMLElement>(null);
    const bioImageRef = useRef<HTMLDivElement>(null);
    const newsRef = useRef<HTMLElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        // Initialize Lenis Smooth Scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // GSAP Animations
        const ctx = gsap.context(() => {
            // 1. HERO ANIMATIONS (Cinematic Reveal)
            const tlHero = gsap.timeline();

            // Image starts slightly themed and zoomed in, then settles
            tlHero.fromTo(heroImageRef.current,
                { scale: 1.2, filter: "blur(10px)" },
                { scale: 1.1, filter: "blur(0px)", duration: 2, ease: "power2.out" }
            );

            // Removed GSAP Text Reveal in favor of TypingEffect component
            // But we keep the Paragraph and Button reveal using GSAP (targeting remaining children)
            if (heroTextRef.current) {
                // Target only p and button (last 2 children usually, or specific classes)
                // Or we can just animate the container opacity/y for the non-H1 elements
                // Let's rely on standard fade-in for the extra elements
                gsap.fromTo(heroTextRef.current.querySelectorAll("p, button, .hero-decoration"),
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 1 }
                );
            }

            // Parallax Scroll Effect for Hero Image
            gsap.to(heroImageRef.current, {
                yPercent: 20,
                scale: 1, // Determines zoom out effect on scroll
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // 2. PROJECTS SECTION (Cinematic Stagger with Scrub)
            gsap.from(".project-card", {
                y: 100,
                rotation: 5,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: projectsRef.current,
                    start: "top 85%",
                    end: "center 60%", // Animation completes when section center hits 60% of viewport
                    scrub: 1, // Smooth matching to scroll
                }
            });

            // 3. BIO SECTION (Wipe Reveal & Parallax with Scrub)
            // Image Mask/Wipe Reveal
            const bioImgContainer = bioImageRef.current;
            gsap.fromTo(bioImgContainer,
                { clipPath: "inset(0 100% 0 0)" },
                {
                    clipPath: "inset(0 0% 0 0)",
                    ease: "none", // Scrub works best with linear/none usually, but power is okay
                    scrollTrigger: {
                        trigger: bioRef.current,
                        start: "top 80%",
                        end: "center 60%",
                        scrub: 1,
                    }
                }
            );

            // Text Stagger
            gsap.from(".bio-text-animated", {
                x: 50,
                opacity: 0,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: bioRef.current,
                    start: "top 70%",
                    end: "center 50%",
                    scrub: 1,
                }
            });

            // 4. NEWS SECTION (Cinematic Stagger with Scrub)
            gsap.from(".news-card", {
                y: 50,
                opacity: 0,
                scale: 0.95,
                stagger: 0.1,
                ease: "power2.out",
                clearProps: "all",
                scrollTrigger: {
                    trigger: newsRef.current,
                    start: "top 85%",
                    end: "center 60%",
                    scrub: 1,
                }
            });

            // 5. GALLERY SECTION (Dynamic Zoom Reveal with Scrub)
            gsap.from(".gallery-item", {
                scale: 0.6, // Less aggressive start scale for scrub
                opacity: 0,
                stagger: 0.1,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: ".gallery-section",
                    start: "top 85%",
                    end: "center 60%",
                    scrub: 1,
                }
            });

        });

        return () => {
            ctx.revert();
            lenis.destroy();
        }
    }, []);


    return (
        <div className="flex min-h-screen flex-col font-sans">

            {/* HEADER / NAVIGATION */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent ${isScrolled
                    ? "bg-[#0B1B47]/80 backdrop-blur-md shadow-2xl py-3 border-white/10"
                    : "bg-transparent py-6"
                    }`}
            >
                <div className="container mx-auto max-w-7xl px-4 flex items-center justify-between">
                    <div className="text-white font-bold text-2xl tracking-tighter cursor-pointer hover:scale-105 transition-transform duration-300">
                        MURILLO<span className="text-[#FFD700]">GOUVEA</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-white text-sm font-medium uppercase tracking-wide">
                        <Link href="#" className="hover:text-[#FFD700] transition-colors relative group">
                            Início
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] transition-all group-hover:w-full"></span>
                        </Link>
                        <Link href="#sobre" className="hover:text-[#FFD700] transition-colors relative group">
                            Sobre Mim
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] transition-all group-hover:w-full"></span>
                        </Link>
                        <Link href="#projetos" className="hover:text-[#FFD700] transition-colors relative group">
                            Projetos
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] transition-all group-hover:w-full"></span>
                        </Link>
                        <Link href="#noticias" className="hover:text-[#FFD700] transition-colors relative group">
                            Notícias
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] transition-all group-hover:w-full"></span>
                        </Link>
                    </nav>

                    <div className="hidden md:flex items-center gap-4 text-white">
                        <Link href="#" className="hover:text-[#FFD700] hover:scale-110 transition-transform"><Facebook size={20} /></Link>
                        <Link href="#" className="hover:text-[#FFD700] hover:scale-110 transition-transform"><Instagram size={20} /></Link>
                        <Link href="#" className="hover:text-[#FFD700] hover:scale-110 transition-transform"><Youtube size={20} /></Link>
                        <Link href="/dashboard">
                            <Button variant="outline" className="ml-4 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#0B1B47] transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.5)]">
                                Acesso Restrito
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-grow">

                {/* HERO SECTION - Full Screen Background Image */}
                <section ref={heroRef} className="relative h-screen w-full flex items-center overflow-hidden">
                    {/* Background Image Parallax Target */}
                    <div ref={heroImageRef} className="absolute inset-0 z-0">
                        <Image
                            src="/foto-murillo-gouvea-hero.png"
                            alt="Deputado Murillo Gouvea"
                            fill
                            className="object-cover object-top"
                            priority
                        />
                        {/* Overlay Gradient for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B47]/95 via-[#0B1B47]/70 to-transparent"></div>
                    </div>

                    <div className="container mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-8 relative z-10 pt-20">
                        <div ref={heroTextRef} className="flex flex-col justify-center space-y-6">
                            <h1 className="text-3xl md:text-7xl font-bold leading-tight text-white drop-shadow-lg">
                                <TypingEffect text="O Deputado" /> <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                                    <TypingEffect text="mais amado" delay={0.5} />
                                </span> <br />
                                <TypingEffect text="do Norte/Noroeste" delay={1} /> <br />
                                <TypingEffect text="carioca!" delay={1.8} />
                            </h1>
                            <div className="w-24 h-2 bg-[#FFD700]"></div>
                            <p className="text-lg text-gray-200 max-w-md drop-shadow">
                                Trabalho sério, compromisso com a verdade e resultados reais para a nossa gente.
                            </p>
                            <Button className="bg-[#FFD700] text-[#0B1B47] hover:bg-yellow-400 font-bold text-lg px-8 py-6 w-fit rounded-full shadow-lg shadow-yellow-500/20 transform hover:scale-105 transition-transform">
                                Conheça meu trabalho!
                            </Button>
                        </div>
                        {/* Right side is empty to let the background image shine */}
                    </div>

                    {/* Bottom decorative bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-[#FFD700] via-yellow-200 to-[#FFD700] z-20"></div>
                </section>

                {/* PROJECTS SECTION (CAROUSEL) */}
                <section id="projetos" ref={projectsRef} className="py-24 bg-gray-50 relative overflow-hidden">
                    <div className="container mx-auto max-w-7xl px-4 relative z-10">
                        <div className="mb-12 flex flex-col items-center text-center">
                            <div className="flex items-center gap-4 mb-4">
                                {/* Placeholder for Toucan Mascot */}
                                <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center font-bold text-[#0B1B47] animate-bounce shadow-lg">Tucano</div>
                                <h2 className="text-2xl md:text-4xl font-bold text-[#0B1B47]">
                                    <TypingEffect text="Conheça as principais" /> <br />
                                    <TypingEffect text="ações e projetos" delay={0.5} />
                                </h2>
                            </div>
                        </div>

                        <Carousel className="w-full max-w-5xl mx-auto" opts={{ align: "start", loop: true }}>
                            <CarouselContent className="-ml-4">
                                {projects.map((project) => (
                                    <CarouselItem key={project.id} className="pl-4 md:basis-1/2 lg:basis-1/3 project-card">
                                        <div className="p-1">
                                            <Card className="border-0 shadow-lg overflow-hidden group cursor-pointer hover:-translate-y-2 transition-transform duration-300 rounded-2xl h-full">
                                                <div className="relative h-96 w-full bg-gray-200">
                                                    <Image
                                                        src={project.image}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>

                                                    <div className="absolute bottom-0 left-0 p-6 text-white w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                        <Badge className="mb-3 bg-[#FFD700] text-[#0B1B47] hover:bg-[#FFD700] shadow-md">{project.status}</Badge>
                                                        <h3 className="text-2xl font-bold leading-none mb-2">{project.title}</h3>
                                                        <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{project.subtitle}</p>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="hidden md:flex -left-12 border-[#0B1B47] text-[#0B1B47] hover:bg-[#0B1B47] hover:text-white" />
                            <CarouselNext className="hidden md:flex -right-12 border-[#0B1B47] text-[#0B1B47] hover:bg-[#0B1B47] hover:text-white" />
                        </Carousel>
                    </div>
                </section>

                {/* BIO SECTION */}
                <section id="sobre" ref={bioRef} className="py-24 bg-[#0B1B47] text-white overflow-hidden">
                    <div className="container mx-auto max-w-7xl px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">

                            {/* Improved Image Container with Reveal Ref */}
                            <div className="relative group perspective-1000" ref={bioImageRef}>
                                <div className="absolute -inset-4 bg-[#FFD700] rounded-3xl opacity-20 group-hover:opacity-40 transition-opacity blur-lg animate-pulse"></div>
                                <div className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-2xl skew-y-0 transition-transform duration-700 ease-out">
                                    <Image
                                        src="/foto-historia-familia-murillo-gouvea.png"
                                        alt="Família de Murillo Gouvea"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="bio-text-animated">
                                    <h3 className="text-[#FFD700] font-bold tracking-widest uppercase mb-2">Trajetória</h3>
                                    <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                                        <TypingEffect text="A história de" /> <br />
                                        <TypingEffect text="Murillo Gouvea" delay={0.5} />
                                    </h2>
                                    <div className="w-20 h-1 bg-[#FFD700]"></div>
                                </div>

                                <div className="space-y-4 text-gray-300 text-lg leading-relaxed bio-text-animated">
                                    <p>
                                        Nascido no interior do estado, Murillo sempre teve a vocação para servir.
                                        Desde cedo, aprendeu com os pais a importância trabalho duro e da honestidade.
                                    </p>
                                    <p>
                                        Como deputado, tem lutado incansavelmente por melhorias na saúde, educação e infraestrutura
                                        para todo o Norte e Noroeste Fluminense.
                                    </p>
                                </div>

                                <div className="bio-text-animated">
                                    <Button className="bg-[#FFD700] text-[#0B1B47] hover:bg-yellow-400 font-bold px-8 rounded-full h-12 transform hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                                        Ler história completa
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* GALLERY SECTION */}
                <section className="py-20 bg-gray-100 gallery-section">
                    <div className="container mx-auto max-w-7xl px-4 text-center mb-12">
                        <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-100 text-[#0B1B47] mb-4 shadow-sm">
                            <Album size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#0B1B47]">
                            <TypingEffect text="Navegue pela galeria de" /> <span className="text-blue-600"><TypingEffect text="FOTOS!" delay={0.8} /></span>
                        </h2>
                    </div>

                    <div className="w-full overflow-hidden pb-12">
                        <Carousel className="w-full max-w-[90%] mx-auto" opts={{ align: "center", loop: true }}>
                            <CarouselContent>
                                {galleryImages.map((img, i) => (
                                    <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 gallery-item">
                                        <div className="aspect-video bg-gray-300 rounded-xl overflow-hidden relative shadow-md group cursor-pointer hover:shadow-2xl transition-all duration-500">
                                            <Image
                                                src={img}
                                                alt={`Galeria ${i + 1}`}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] z-10">
                                                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Ampliar</Button>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className="flex justify-center mt-8 gap-4">
                                <CarouselPrevious />
                                <CarouselNext />
                            </div>
                        </Carousel>
                    </div>
                </section>

                {/* NEWS SECTION */}
                <section id="noticias" ref={newsRef} className="py-24 bg-white">
                    <div className="container mx-auto max-w-7xl px-4">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h3 className="text-blue-600 font-bold uppercase tracking-wider mb-2">Informação</h3>
                                <h2 className="text-2xl md:text-4xl font-bold text-[#0B1B47]">
                                    <TypingEffect text="Últimas notícias!" />
                                </h2>
                            </div>
                            <Button variant="link" className="text-[#0B1B47] font-bold hidden md:flex">Ver todas <ChevronRight size={16} /></Button>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {news.map((item) => (
                                <Card key={item.id} className="news-card border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white overflow-hidden group hover:-translate-y-2">
                                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#0B1B47] px-3 py-1 rounded text-sm font-bold flex items-center gap-2 z-10 shadow-sm">
                                            <CalendarDays size={14} /> {item.date}
                                        </div>
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-bold text-[#0B1B47] mb-3 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                                        <p className="text-gray-600 mb-4 line-clamp-3">{item.summary}</p>
                                        <span className="text-[#FFD700] font-bold text-sm uppercase flex items-center gap-1 group/link">
                                            Ler mais <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                        </span>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

            </main>

            {/* FOOTER */}
            <footer className="bg-[#0B1B47] text-white pt-20 pb-10 relative overflow-hidden">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="bg-blue-900/50 rounded-2xl p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-800">
                        <h3 className="text-2xl font-bold flex items-center gap-3">
                            <span className="bg-[#FFD700] p-2 rounded-full text-[#0B1B47]"><MapPin /></span>
                            ME SIGA NAS REDES
                        </h3>
                        <div className="flex gap-4">
                            <Button size="icon" className="rounded-full bg-white text-[#0B1B47] hover:bg-[#FFD700] transition-colors"><Facebook /></Button>
                            <Button size="icon" className="rounded-full bg-white text-[#0B1B47] hover:bg-[#FFD700] transition-colors"><Instagram /></Button>
                            <Button size="icon" className="rounded-full bg-white text-[#0B1B47] hover:bg-[#FFD700] transition-colors"><Youtube /></Button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-12 border-t border-blue-900 pt-12">
                        <div className="col-span-2">
                            <h2 className="text-3xl font-bold mb-6">MURILLO<span className="text-[#FFD700]">GOUVEA</span></h2>
                            <p className="text-gray-400 max-w-sm mb-6">
                                Uma frase de impacto que simboliza o mandato e a visão de futuro de Murillo Gouvea.
                            </p>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Mail size={16} /> contato@murillogouvea.com.br
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg mb-6 text-[#FFD700]">Menu Rápido</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li><Link href="#" className="hover:text-white transition-colors">Início</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Sobre Mim</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Projetos</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Transparência</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg mb-6 text-[#FFD700]">Gabinete</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li className="flex gap-3"><MapPin className="shrink-0 text-[#FFD700]" size={18} /> Rua do Comércio, 123 - Centro, Itaperuna/RJ</li>
                                <li className="flex gap-3"><Phone className="shrink-0 text-[#FFD700]" size={18} /> (22) 3822-0000</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-20 pt-8 border-t border-blue-900 text-center text-gray-500 text-sm">
                        &copy; 2026 Murillo Gouvea. Todos os direitos reservados.
                    </div>
                </div>
            </footer>
        </div>
    );
}
