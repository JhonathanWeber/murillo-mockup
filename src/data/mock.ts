export const mockUser = {
    name: "Murillo Gouvea",
    role: "Vereador",
    bio: "Trabalhando por uma cidade melhor para todos.",
    avatar: "/placeholder-avatar.jpg",
    stats: {
        projetos: 42,
        indicacoes: 156,
        seguidores: "12.5k"
    }
};

export const mockProjects = [
    {
        id: 1,
        title: "Revitalização da Praça Central",
        description: "Projeto para reforma completa da praça, incluindo nova iluminação e playground.",
        status: "Em andamento",
        date: "2024-03-15",
        image: "/placeholder-project-1.jpg"
    },
    {
        id: 2,
        title: "Programa Jovem Aprendiz Municipal",
        description: "Iniciativa para inserir jovens de 16 a 24 anos no mercado de trabalho.",
        status: "Aprovado",
        date: "2024-02-10",
        image: "/placeholder-project-2.jpg"
    },
    {
        id: 3,
        title: "Melhoria na Iluminação Pública",
        description: "Instalação de lâmpadas LED em 50 ruas do bairro São José.",
        status: "Concluído",
        date: "2024-01-20",
        image: "/placeholder-project-3.jpg"
    }
];

export const mockNews = [
    {
        id: 1,
        title: "Visita às obras do novo hospital",
        summary: "Acompanhei de perto o andamento das obras que vão beneficiar milhares de famílias.",
        date: "2024-03-10"
    },
    {
        id: 2,
        title: "Reunião com a comunidade do Centro",
        summary: "Ouvindo as demandas dos moradores para planejar as próximas ações do mandato.",
        date: "2024-03-05"
    }
];
