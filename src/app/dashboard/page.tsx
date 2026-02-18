import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { mockUser, mockProjects, mockNews } from "@/data/mock";
import { BellRing, CalendarDays, ExternalLink, User } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Logo placeholder */}
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold">MG</div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 hidden sm:block">Painel do Vereador</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <BellRing className="h-5 w-5 text-slate-500" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <div className="flex items-center gap-3 border-l pl-4 border-slate-200 dark:border-slate-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium leading-none">{mockUser.name}</p>
                <p className="text-xs text-muted-foreground">{mockUser.role}</p>
              </div>
              <Avatar>
                <AvatarImage src={mockUser.avatar} />
                <AvatarFallback>MG</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl p-4 md:p-8 space-y-8">

        {/* Welcome Section */}
        <section className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Bem-vindo, {mockUser.name.split(' ')[0]}</h2>
          <p className="text-muted-foreground">{mockUser.bio}</p>
        </section>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projetos Ativos</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockUser.stats.projetos}</div>
              <p className="text-xs text-muted-foreground">+2 novos este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Indicações</CardTitle>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockUser.stats.indicacoes}</div>
              <p className="text-xs text-muted-foreground">+12 pendentes de aprovação</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Seguidores</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockUser.stats.seguidores}</div>
              <p className="text-xs text-muted-foreground">+10% em relação ao mês passado</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

          {/* Projects List */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Meus Projetos</CardTitle>
              <CardDescription>Gerencie suas iniciativas recentes.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockProjects.map((project) => (
                  <div key={project.id} className="flex flex-col sm:flex-row items-start gap-4 pb-4 border-b last:border-0">
                    {/* Placeholder for project image if we implemented Next Image with valid src */}
                    <div className="w-full sm:w-24 h-16 bg-slate-100 rounded-md flex-shrink-0"></div>
                    <div className="space-y-1 flex-1">
                      <h4 className="font-semibold">{project.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                      <div className="flex items-center gap-2 pt-2">
                        <Badge variant={project.status === 'Concluído' ? 'default' : project.status === 'Aprovado' ? 'secondary' : 'outline'}>
                          {project.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{project.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Ver todos os projetos</Button>
            </CardFooter>
          </Card>

          {/* News / Recent Activity */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Últimas Notícias</CardTitle>
              <CardDescription>Atualizações do mandato.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockNews.map((news) => (
                <div key={news.id} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-medium text-sm">{news.title}</h5>
                    <span className="text-[10px] text-muted-foreground bg-white dark:bg-slate-950 px-2 py-0.5 rounded-full border">{news.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{news.summary}</p>
                </div>
              ))}

              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 mt-4">
                <h5 className="font-semibold text-primary mb-1">Dica do sistema</h5>
                <p className="text-xs text-muted-foreground">Você pode conectar suas redes sociais para importar notícias automaticamente.</p>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}
