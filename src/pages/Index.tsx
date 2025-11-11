import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface Video {
  id: string;
  prompt: string;
  thumbnail: string;
  author: string;
  authorAvatar: string;
  views: number;
  duration: number;
  createdAt: Date;
}

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('generate');
  const { toast } = useToast();

  const mockVideos: Video[] = [
    {
      id: '1',
      prompt: 'Космический корабль пролетает через туманность',
      thumbnail: '/placeholder.svg',
      author: 'Алексей К.',
      authorAvatar: '/placeholder.svg',
      views: 1250,
      duration: 45,
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      prompt: 'Робот играет на гитаре под звёздным небом',
      thumbnail: '/placeholder.svg',
      author: 'Мария С.',
      authorAvatar: '/placeholder.svg',
      views: 3420,
      duration: 60,
      createdAt: new Date('2024-01-14')
    },
    {
      id: '3',
      prompt: 'Закат на планете с двумя солнцами',
      thumbnail: '/placeholder.svg',
      author: 'Иван П.',
      authorAvatar: '/placeholder.svg',
      views: 890,
      duration: 30,
      createdAt: new Date('2024-01-13')
    },
    {
      id: '4',
      prompt: 'Танцующий огонь превращается в птицу',
      thumbnail: '/placeholder.svg',
      author: 'Елена В.',
      authorAvatar: '/placeholder.svg',
      views: 2150,
      duration: 50,
      createdAt: new Date('2024-01-12')
    },
    {
      id: '5',
      prompt: 'Подводный город с неоновыми огнями',
      thumbnail: '/placeholder.svg',
      author: 'Дмитрий Л.',
      authorAvatar: '/placeholder.svg',
      views: 1780,
      duration: 55,
      createdAt: new Date('2024-01-11')
    },
    {
      id: '6',
      prompt: 'Дракон летит над горами в лунном свете',
      thumbnail: '/placeholder.svg',
      author: 'Ольга Н.',
      authorAvatar: '/placeholder.svg',
      views: 4230,
      duration: 70,
      createdAt: new Date('2024-01-10')
    }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, введите описание видео',
        variant: 'destructive'
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          toast({
            title: 'Успех! 🎉',
            description: 'Ваше видео готово и опубликовано в галерее'
          });
          setPrompt('');
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const formatDuration = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="stars-bg fixed inset-0 opacity-30 pointer-events-none" />
      
      <div className="relative z-10">
        <header className="border-b border-border/50 backdrop-blur-xl bg-background/80 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-space-purple via-space-pink to-space-blue flex items-center justify-center animate-float">
                <Icon name="Sparkles" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold gradient-text">AI Video Studio</h1>
            </div>
            <Button variant="outline" className="gap-2">
              <Icon name="User" size={18} />
              <span className="hidden sm:inline">Профиль</span>
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <Alert className="mb-6 border-space-purple/30 bg-space-purple/10 animate-fade-in">
            <Icon name="AlertTriangle" className="h-5 w-5 text-space-purple" />
            <AlertDescription className="text-foreground/90">
              <strong>Важно:</strong> Все видео на этой платформе созданы искусственным интеллектом OpenAI. 
              Это не настоящие записи реальных событий.
            </AlertDescription>
          </Alert>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-muted/50 backdrop-blur">
              <TabsTrigger value="generate" className="gap-2">
                <Icon name="Wand2" size={18} />
                Создать видео
              </TabsTrigger>
              <TabsTrigger value="gallery" className="gap-2">
                <Icon name="Grid3x3" size={18} />
                Галерея
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generate" className="space-y-6 animate-fade-in">
              <Card className="border-border/50 bg-card/50 backdrop-blur shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center gap-3">
                    <Icon name="Sparkles" className="text-space-purple" size={32} />
                    Создайте AI видео
                  </CardTitle>
                  <CardDescription>
                    Опишите своё видение, и OpenAI создаст уникальное видео за 2 минуты
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Icon name="MessageSquare" size={16} />
                      Описание видео
                    </label>
                    <Textarea
                      placeholder="Например: Космонавт исследует неизвестную планету с розовым небом..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[120px] resize-none bg-background/50"
                      disabled={isGenerating}
                    />
                  </div>

                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Icon name="Clock" size={16} />
                    <span>Время генерации: ~2 минуты</span>
                  </div>

                  {isGenerating && (
                    <div className="space-y-3 animate-scale-in">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Генерация видео...</span>
                        <span className="font-mono text-primary">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}

                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    size="lg"
                    className="w-full bg-gradient-to-r from-space-purple via-space-pink to-space-blue hover:opacity-90 transition-all text-lg font-semibold h-14"
                  >
                    {isGenerating ? (
                      <>
                        <Icon name="Loader2" className="animate-spin" size={24} />
                        Создаём магию...
                      </>
                    ) : (
                      <>
                        <Icon name="Rocket" size={24} />
                        Создать видео
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Icon name="Lightbulb" size={24} />
                    Идеи для вдохновения
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Футуристический город',
                      'Магический лес',
                      'Подводное путешествие',
                      'Космическая станция',
                      'Драконы в горах',
                      'Киберпанк-улица'
                    ].map((idea, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all px-4 py-2"
                        onClick={() => setPrompt(idea)}
                      >
                        {idea}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="gallery" className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">Галерея AI видео</h2>
                <p className="text-muted-foreground">
                  Откройте для себя удивительные видео, созданные искусственным интеллектом
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockVideos.map((video, index) => (
                  <Card
                    key={video.id}
                    className="group cursor-pointer overflow-hidden border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative aspect-video bg-gradient-to-br from-space-purple/20 via-space-pink/20 to-space-blue/20 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon name="Play" size={48} className="text-white/80 group-hover:scale-125 transition-transform" />
                      </div>
                      <Badge className="absolute top-3 right-3 bg-black/60 backdrop-blur">
                        {formatDuration(video.duration)}
                      </Badge>
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <p className="font-medium line-clamp-2 min-h-[3rem]">{video.prompt}</p>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-border/50">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={video.authorAvatar} />
                            <AvatarFallback>{video.author[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{video.author}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Icon name="Eye" size={14} />
                          <span>{video.views.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>

        <footer className="border-t border-border/50 backdrop-blur-xl bg-background/80 mt-16">
          <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
            <p>Powered by OpenAI Video Generation | Все видео созданы ИИ</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
