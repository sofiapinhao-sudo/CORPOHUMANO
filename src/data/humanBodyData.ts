export interface SystemInfo {
  id: 'digestivo' | 'respiratorio' | 'circulatorio' | 'urinario' | 'reprodutor' | 'nervoso';
  name: string;
  shortName: string;
  tagline: string;
  color: {
    primary: string;
    bgLight: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    accent: string;
  };
  funcaoPrincipal: string;
  constituicao: {
    categoria: string;
    orgaos: {
      nome: string;
      descricao: string;
      detalhe?: string;
    }[];
  }[];
  comoFunciona: {
    passo: number;
    titulo: string;
    texto: string;
    destaque?: string;
  }[];
  cuidados: string[];
  curiosidades: string[];
}

export const SYSTEMS_DATA: Record<string, SystemInfo> = {
  digestivo: {
    id: 'digestivo',
    name: 'Sistema Digestivo',
    shortName: 'Digestivo',
    tagline: 'Transforma os alimentos em nutrientes para alimentar todo o corpo!',
    color: {
      primary: '#d97706', // amber-600
      bgLight: '#fffbeb',
      border: '#fde68a',
      badgeBg: '#fef3c7',
      badgeText: '#92400e',
      accent: '#b45309'
    },
    funcaoPrincipal: 'DIGESTÃO: É o conjunto dos órgãos que transformam os alimentos em substâncias mais simples, a que chamamos de nutrientes.',
    constituicao: [
      {
        categoria: 'Tubo Digestivo',
        orgaos: [
          { nome: 'Boca', descricao: 'Onde tudo começa! Os dentes cortam e trituram, a língua mistura com saliva e forma o bolo alimentar.' },
          { nome: 'Faringe', descricao: 'Tubo por onde passa o bolo alimentar logo após ser engolido.' },
          { nome: 'Esófago', descricao: 'Canal muscular que empurra o bolo alimentar até ao estômago através de movimentos suaves.' },
          { nome: 'Estômago', descricao: 'Saco muscular onde o bolo alimentar se mistura com o suco gástrico, transformando-se no quimo (massa líquida).' },
          { nome: 'Intestino Delgado', descricao: 'Onde se dá o milagre da absorção! Os nutrientes misturam-se com os sucos do fígado e pâncreas e passam para o sangue.' },
          { nome: 'Intestino Grosso', descricao: 'Recebe as substâncias que não foram digeridas e absorve a água restante.' },
          { nome: 'Reto', descricao: 'Parte final do tubo digestivo onde se armazenam as fezes temporariamente.' },
          { nome: 'Ânus', descricao: 'Orifício por onde as fezes são expulsas do organismo.' }
        ]
      },
      {
        categoria: 'Glândulas Anexas',
        orgaos: [
          { nome: 'Glândulas Salivares', descricao: 'Produzem a saliva que amolece a comida na boca e inicia a digestão.' },
          { nome: 'Fígado', descricao: 'Produz a bílis, que é libertada à entrada do intestino delgado para ajudar a digerir as gorduras.' },
          { nome: 'Pâncreas', descricao: 'Produz o suco pancreático, também lançado no intestino delgado para desdobrar os nutrientes.' }
        ]
      }
    ],
    comoFunciona: [
      {
        passo: 1,
        titulo: 'Na Boca: Formação do Bolo Alimentar',
        texto: 'Os dentes mastigam e cortam. A língua ajuda a misturar com a saliva produzida pelas glândulas salivares, formando uma pasta suave chamada bolo alimentar.',
        destaque: 'Bolo Alimentar'
      },
      {
        passo: 2,
        titulo: 'Faringe e Esófago: A Descida',
        texto: 'Ao engolir, o bolo alimentar passa pela faringe e desce pelo tubo do esófago em direção ao estômago.',
        destaque: 'Movimentos que empurram o alimento'
      },
      {
        passo: 3,
        titulo: 'No Estômago: Formação do Quimo',
        texto: 'O estômago liberta o forte suco gástrico. Com movimentos de agitação, o bolo alimentar transforma-se numa pasta líquida e ácida chamada quimo.',
        destaque: 'Quimo'
      },
      {
        passo: 4,
        titulo: 'No Intestino Delgado: Absorção dos Nutrientes',
        texto: 'O fígado envia a bílis e o pâncreas envia o suco pancreático. O quimo é decomposto e a maioria dos nutrientes atravessa as paredes do intestino para o sangue!',
        destaque: 'Passagem para o sangue!'
      },
      {
        passo: 5,
        titulo: 'Intestino Grosso, Reto e Ânus: A Eliminação',
        texto: 'O que o corpo não consegue aproveitar passa para o intestino grosso, onde a água é absorvida. As sobras formam as fezes, que são guardadas no reto e expulsas pelo ânus.',
        destaque: 'Fezes'
      }
    ],
    cuidados: [
      'Fazer uma alimentação equilibrada e variada (fruta, vegetais, fibras).',
      'Beber bastante água ao longo do dia.',
      'Mastigar muito bem os alimentos antes de engolir.',
      'Lavar sempre as mãos com sabão antes das refeições.',
      'Consultar o dentista regularmente para dentes e gengivas saudáveis.',
      'Praticar exercício físico regularmente.'
    ],
    curiosidades: [
      'Sabias que o teu intestino delgado tem cerca de 6 a 7 metros de comprimento esticado?',
      'O estômago tem uma camada protetora especial para não ser magoado pelo seu próprio ácido forte!'
    ]
  },

  respiratorio: {
    id: 'respiratorio',
    name: 'Sistema Respiratório',
    shortName: 'Respiratório',
    tagline: 'Renova constantemente o oxigénio que nos mantém com energia e vivos!',
    color: {
      primary: '#0284c7', // sky-600
      bgLight: '#f0f9ff',
      border: '#bae6fd',
      badgeBg: '#e0f2fe',
      badgeText: '#0369a1',
      accent: '#0369a1'
    },
    funcaoPrincipal: 'RESPIRAÇÃO: Conjunto dos órgãos que têm como função a renovação constante do ar nos pulmões (absorver oxigénio e libertar dióxido de carbono).',
    constituicao: [
      {
        categoria: 'Vias Respiratórias',
        orgaos: [
          { nome: 'Fossas Nasais', descricao: 'Cavidades do nariz onde o ar é filtrado pelos pelinhos, humedecido e aquecido à temperatura do corpo.' },
          { nome: 'Faringe', descricao: 'Zona comum à respiração e digestão, que conduz o ar da boca e nariz até à laringe.' },
          { nome: 'Laringe', descricao: 'Órgão que faz a ligação entre a faringe e a traqueia; contém as cordas vocais que nos permitem falar!' },
          { nome: 'Traqueia', descricao: 'Tubo anelado e firme que conduz o ar da laringe até aos brônquios.' },
          { nome: 'Brônquios', descricao: 'Dois grandes ramos em que a traqueia se divide, entrando um em cada pulmão.' },
          { nome: 'Bronquíolos', descricao: 'Ramificações cada vez mais fininhas dentro dos pulmões, como galhos de uma árvore.' }
        ]
      },
      {
        categoria: 'Pulmões e Músculos Auxiliares',
        orgaos: [
          { nome: 'Pulmões', descricao: 'Dois órgãos esponjosos, moles e elásticos, onde ocorrem as trocas de oxigénio e dióxido de carbono com o sangue.' },
          { nome: 'Diafragma', descricao: 'Músculo em forma de cúpula por baixo dos pulmões; não faz parte do sistema respiratório, mas é fundamental para os movimentos respiratórios!' }
        ]
      }
    ],
    comoFunciona: [
      {
        passo: 1,
        titulo: 'Entrada do Ar pelas Fossas Nasais',
        texto: 'O ar deve ser inspirado pelo nariz! Os pelos e o muco filtram as poeiras, enquanto os vasos sanguíneos o aquecem e humedecem.',
        destaque: 'Inspirar pelo nariz!'
      },
      {
        passo: 2,
        titulo: 'Passagem pela Faringe, Laringe e Traqueia',
        texto: 'O ar desce pelo tubo condutor com segurança até se dividir pelos dois brônquios.',
        destaque: 'Tubo de ar limpo'
      },
      {
        passo: 3,
        titulo: 'Dentro dos Pulmões: Trocas Gasosas',
        texto: 'Nos pulmões, o oxigénio (O2) do ar passa para o sangue, e o sangue entrega o dióxido de carbono (CO2) para ser expulso do corpo.',
        destaque: 'O2 para o sangue, CO2 para fora'
      },
      {
        passo: 4,
        titulo: 'INSPIRAÇÃO: O ar entra!',
        texto: 'O diafragma contrai e desce, o peito expande-se e o ar fresco rico em oxigénio é puxado para dentro dos pulmões.',
        destaque: 'Diafragma contrai e desce ↓'
      },
      {
        passo: 5,
        titulo: 'EXPIRAÇÃO: O ar sai!',
        texto: 'O diafragma descontrai e sobe, a caixa torácica diminui e o ar com dióxido de carbono é expulso para o exterior.',
        destaque: 'Diafragma descontrai e sobe ↑'
      }
    ],
    cuidados: [
      'Praticar exercício físico ao ar livre para encher os pulmões de ar saudável.',
      'Respirar ar puro e passear na natureza (parques, florestas, praia).',
      'Não fumar e afastar-se de ambientes com fumo de tabaco ou poluição.',
      'Inspirar sempre pelo nariz e não pela boca (o nariz filtra e aquece o ar).',
      'Curar bem as constipações e gripes com repouso e orientação médica.'
    ],
    curiosidades: [
      'Em média, uma criança do 4.º ano respira cerca de 20 vezes por minuto quando está sentada a estudar!',
      'O pulmão direito é um bocadinho maior do que o esquerdo, porque o coração precisa de espaço no lado esquerdo do peito!'
    ]
  },

  circulatorio: {
    id: 'circulatorio',
    name: 'Sistema Circulatório',
    shortName: 'Circulatório',
    tagline: 'O coração bombeia o sangue sem parar para alimentar todas as células do corpo!',
    color: {
      primary: '#dc2626', // red-600
      bgLight: '#fef2f2',
      border: '#fecaca',
      badgeBg: '#fee2e2',
      badgeText: '#991b1b',
      accent: '#b91c1c'
    },
    funcaoPrincipal: 'CIRCULAÇÃO: Assegura o transporte contínuo de nutrientes e oxigénio através do sangue para todas as partes do corpo, recolhendo as impurezas.',
    constituicao: [
      {
        categoria: 'A Bomba Central',
        orgaos: [
          { nome: 'Coração', descricao: 'Órgão muscular oco com cavidades (aurículas e ventrículos) e válvulas, que bombeia o sangue dia e noite com força.' }
        ]
      },
      {
        categoria: 'Vasos Sanguíneos (As Estradas do Sangue)',
        orgaos: [
          { nome: 'Artérias', descricao: 'Vasos fortes e elásticos que levam o sangue rico em oxigénio a sair do coração para todo o corpo (ex: Artéria Aorta).' },
          { nome: 'Capilares', descricao: 'Vasos microscópicos e muito finos onde o sangue entrega oxigénio e nutrientes às células e recolhe o dióxido de carbono.' },
          { nome: 'Veias', descricao: 'Vasos que trazem o sangue de regresso dos órgãos de volta ao coração (ex: Veias Cavas e Veias Pulmonares).' }
        ]
      }
    ],
    comoFunciona: [
      {
        passo: 1,
        titulo: 'O Coração a Bombear',
        texto: 'O coração contrai como uma bomba potente e empurra o sangue com força para as grandes artérias.',
        destaque: 'Bomba muscular'
      },
      {
        passo: 2,
        titulo: 'Pequena Circulação (Coração ↔ Pulmões)',
        texto: 'O sangue sai do coração pelas artérias pulmonares até aos pulmões, liberta o CO2 e enche-se de oxigénio novo. Regressa ao coração pelas veias pulmonares.',
        destaque: 'Para oxigenar o sangue'
      },
      {
        passo: 3,
        titulo: 'Grande Circulação (Coração ↔ Todo o Corpo)',
        texto: 'O sangue cheio de oxigénio sai do coração pela artéria aorta e viaja até à ponta dos dedos, cérebro e órgãos, entregando oxigénio e recolhendo resíduos pelas veias cavas.',
        destaque: 'Alimenta todo o organismo'
      },
      {
        passo: 4,
        titulo: 'A Troca nos Capilares',
        texto: 'Nos capilares finos como fios de cabelo, cada célula do corpo recebe o seu alimento e entrega as suas impurezas para serem eliminadas.',
        destaque: 'Troca ao nível celular'
      }
    ],
    cuidados: [
      'Descansar e dormir as horas recomendadas (cerca de 9 a 10 horas para crianças).',
      'Ter uma vida ativa e praticar desporto regularmente (correr, saltar, nadar).',
      'Fazer uma alimentação rica e colorida, evitando gorduras más e excesso de açúcar.',
      'Viver com tranquilidade, brincar e evitar o stresse excessivo.',
      'Controlar o peso e verificar a saúde e pressão arterial quando necessário.'
    ],
    curiosidades: [
      'O coração tem aproximadamente o tamanho do teu punho fechado e bate mais de 100.000 vezes por dia!',
      'Se juntássemos todos os vasos sanguíneos de uma pessoa em linha reta, dariam mais de duas voltas ao planeta Terra!'
    ]
  },

  urinario: {
    id: 'urinario',
    name: 'Sistema Excretor e Urinário',
    shortName: 'Excretor / Urinário',
    tagline: 'Os rins e a pele filtram o sangue e mantêm o corpo limpo de impurezas!',
    color: {
      primary: '#ca8a04', // yellow-600
      bgLight: '#fefce8',
      border: '#fef08a',
      badgeBg: '#fef9c3',
      badgeText: '#854d0e',
      accent: '#a16207'
    },
    funcaoPrincipal: 'ELIMINAR AS IMPUREZAS: O sistema excretor elimina do corpo as substâncias tóxicas produzidas pelas células através do sistema urinário e da pele.',
    constituicao: [
      {
        categoria: 'Sistema Urinário',
        orgaos: [
          { nome: 'Rins', descricao: 'Dois órgãos em forma de feijão que funcionam como filtros de alta precisão. Limpam o sangue e produzem a urina.' },
          { nome: 'Ureteres', descricao: 'Dois tubos finos que transportam a urina desde cada rim até à bexiga.' },
          { nome: 'Bexiga', descricao: 'Bolsa elástica muscular que serve de reservatório temporário para a urina.' },
          { nome: 'Uretra', descricao: 'Canal por onde a urina é expulsa da bexiga para o exterior do corpo.' }
        ]
      },
      {
        categoria: 'A Pele (Órgão Excretor)',
        orgaos: [
          { nome: 'Glândulas Sudoríparas', descricao: 'Glândulas na pele que produzem o suor, eliminando água e sais minerais em excesso.' },
          { nome: 'Poros da Pele', descricao: 'Pequenos orifícios na superfície por onde o suor sai para refrescar o corpo e regular a temperatura.' }
        ]
      }
    ],
    comoFunciona: [
      {
        passo: 1,
        titulo: 'Filtração nos Rins',
        texto: 'O sangue passa pelos rins com resíduos. Os rins retiram as substâncias tóxicas e devolvem a água boa e nutrientes úteis de volta ao sangue.',
        destaque: 'Filtros naturais'
      },
      {
        passo: 2,
        titulo: 'Formação e Viagem da Urina',
        texto: 'As substâncias tóxicas dissolvidas em água formam a urina, que desce gota a gota pelos ureteres até à bexiga.',
        destaque: 'Ureteres'
      },
      {
        passo: 3,
        titulo: 'Armazenamento e Eliminação',
        texto: 'A bexiga enche como um balão. Quando está cheia, o cérebro avisa que é hora de ir à casa de banho, saindo pela uretra.',
        destaque: 'Bexiga e Uretra'
      },
      {
        passo: 4,
        titulo: 'A Transpiração pela Pele',
        texto: 'Quando temos calor ou corremos, as glândulas sudoríparas produzem suor. Ao evaporar pelos poros, o suor arrefece o corpo e liberta impurezas.',
        destaque: 'Transpiração e regulação de temperatura'
      }
    ],
    cuidados: [
      'Ter uma alimentação saudável, evitando o consumo excessivo de sal e snacks salgados.',
      'Beber água com regularidade (cerca de 1,5 a 2 litros por dia).',
      'Cuidar diariamente da higiene do corpo tomando banho.',
      'Evitar reter a urina na bexiga durante muito tempo — ir à casa de banho logo que tiver vontade!',
      'Utilizar sempre protetor solar para proteger a pele das queimaduras solares.'
    ],
    curiosidades: [
      'Os rins filtram todo o sangue do teu corpo mais de 40 vezes por dia!',
      'O suor é composto por cerca de 99% de água e 1% de sais minerais e resíduos celulares.'
    ]
  },

  reprodutor: {
    id: 'reprodutor',
    name: 'Sistema Reprodutor e Mudanças na Adolescência',
    shortName: 'Reprodutor',
    tagline: 'Garante a continuidade da vida e acompanha o nosso crescimento da infância à idade adulta!',
    color: {
      primary: '#db2777', // pink-600
      bgLight: '#fdf2f8',
      border: '#fbcfe8',
      badgeBg: '#fce7f3',
      badgeText: '#9d174d',
      accent: '#be185d'
    },
    funcaoPrincipal: 'REPRODUÇÃO: Produção de células sexuais e criação de condições para dar origem a um novo ser humano, permitindo a continuidade da espécie.',
    constituicao: [
      {
        categoria: 'Sistema Reprodutor Masculino',
        orgaos: [
          { nome: 'Testículos', descricao: 'Dois órgãos situados externamente que produzem as células sexuais masculinas: os espermatozoides.' },
          { nome: 'Pénis', descricao: 'Órgão genital externo masculino por onde passa a uretra.' },
          { nome: 'Uretra (masculina)', descricao: 'Canal comum ao sistema urinário e reprodutor masculino.' }
        ]
      },
      {
        categoria: 'Sistema Reprodutor Feminino',
        orgaos: [
          { nome: 'Ovários', descricao: 'Dois órgãos internos que produzem as células sexuais femininas: os oócitos (ou óvulos).' },
          { nome: 'Útero', descricao: 'Órgão muscular oco onde o novo ser humano se aloja e cresce durante cerca de 9 meses de gravidez.' },
          { nome: 'Vagina', descricao: 'Canal elástico que liga o útero ao exterior do corpo feminino.' },
          { nome: 'Vulva', descricao: 'Conjunto dos órgãos genitais externos femininos que protegem a entrada da vagina.' }
        ]
      }
    ],
    comoFunciona: [
      {
        passo: 1,
        titulo: 'Produção das Células Sexuais',
        texto: 'Os rapazes produzem espermatozoides nos testículos. As raparigas produzem oócitos nos ovários.',
        destaque: 'Células reprodutoras'
      },
      {
        passo: 2,
        titulo: 'A Fecundação',
        texto: 'Quando um espermatozoide se une com um oócito, ocorre a fecundação, dando início a uma nova vida humana.',
        destaque: 'Fecundação = Espermatozoide + Oócito'
      },
      {
        passo: 3,
        titulo: 'O Desenvolvimento no Útero',
        texto: 'O novo ser instala-se no útero da mãe, onde recebe oxigénio e nutrientes até ao nascimento.',
        destaque: 'Gravidez no Útero'
      },
      {
        passo: 4,
        titulo: 'A Puberdade e a Adolescência',
        texto: 'A puberdade é a fase em que o corpo das crianças se transforma física e emocionalmente para passar à adolescência e depois à idade adulta.',
        destaque: 'Transformações da puberdade'
      }
    ],
    cuidados: [
      'Beber água regularmente para manter todo o organismo hidratado.',
      'Cuidar diariamente da higiene dos órgãos genitais com água e sabão suave.',
      'Utilizar os sanitários públicos sempre de forma cuidada e higiénica.',
      'Trocar de roupa interior todos os dias.',
      'Usar roupa confortável e folgada que não aperte o corpo.'
    ],
    curiosidades: [
      'Nas raparigas, a puberdade traz o desenvolvimento do peito, alargamento das ancas e o início da menstruação.',
      'Nos rapazes, a puberdade traz crescimento da laringe (voz mais grossa), ombros mais largos, barba e pelos na face.'
    ]
  },

  nervoso: {
    id: 'nervoso',
    name: 'Sistema Nervoso e os Sentidos',
    shortName: 'Nervoso',
    tagline: 'O supercomputador do corpo humano que comanda ideias, movimentos e reflexos rápidos!',
    color: {
      primary: '#7c3aed', // violet-600
      bgLight: '#f5f3ff',
      border: '#ddd6fe',
      badgeBg: '#ede9fe',
      badgeText: '#5b21b6',
      accent: '#6d28d9'
    },
    funcaoPrincipal: 'COORDENAÇÃO E CONTROLO: Recebe informações do mundo através dos sentidos, processa memórias e pensamentos, e envia ordens a todos os músculos e órgãos.',
    constituicao: [
      {
        categoria: 'Sistema Nervoso Central',
        orgaos: [
          { nome: 'Cérebro', descricao: 'O grande centro de comando localizado na cabeça, protegido pelo crânio. Responsável pela memória, sentimentos, pensamentos e decisões.' },
          { nome: 'Cerebelo e Tronco Cerebral', descricao: 'Coordenam o equilíbrio, o caminhar, os batimentos do coração e a respiração automática.' },
          { nome: 'Espinal Medula', descricao: 'A grande autoestrada de mensagens que passa por dentro da coluna vertebral, ligando o cérebro ao resto do corpo.' }
        ]
      },
      {
        categoria: 'Nervos e Sentidos',
        orgaos: [
          { nome: 'Nervos', descricao: 'Milhões de fios elétricos biológicos que transmitem ordens e sensações a velocidades de até 400 km/h!' },
          { nome: 'Os 5 Sentidos', descricao: 'Visão (olhos), Audição (ouvidos), Olfato (nariz), Paladar (língua) e Tato (pele).' }
        ]
      }
    ],
    comoFunciona: [
      {
        passo: 1,
        titulo: 'Captação do Estímulo',
        texto: 'Os órgãos dos sentidos (olhos, ouvidos, pele, etc.) captam o que acontece à nossa volta e transformam em sinais elétricos.',
        destaque: 'Estímulo exterior'
      },
      {
        passo: 2,
        titulo: 'Viagem até ao Cérebro',
        texto: 'Os nervos transportam a mensagem pela espinal medula até ao cérebro numa fração de segundo.',
        destaque: 'Transmissão a 400 km/h'
      },
      {
        passo: 3,
        titulo: 'Decisão e Comando',
        texto: 'O cérebro compreende o sinal e decide a resposta: correr, saltar, sorrir ou responder à pergunta da professora!',
        destaque: 'Processamento e resposta'
      },
      {
        passo: 4,
        titulo: 'Os Reflexos Protetores',
        texto: 'Se tocares numa panela a ferver, a espinal medula manda puxar a mão antes sequer de sentires a dor, para te proteger de queimaduras!',
        destaque: 'Ato reflexo de proteção'
      }
    ],
    cuidados: [
      'Dormir entre 9 e 10 horas para o cérebro consolidar as aprendizagens do dia e descansar.',
      'Usar capacete sempre que andares de bicicleta, trotinete ou patins para proteger o crânio.',
      'Exercitar a mente lendo livros, resolvendo quebra-cabeças e aprendendo coisas novas.',
      'Evitar passar demasiadas horas seguidas à frente de ecrãs de telemóveis e computadores.',
      'Praticar desporto e conviver com amigos para um cérebro alegre e saudável.'
    ],
    curiosidades: [
      'O teu cérebro tem cerca de 86 mil milhões de neurónios e consome 20% da energia de todo o teu corpo!',
      'Mesmo quando estás a dormir profundamente, o teu cérebro continua ativo a organizar as memórias da escola!'
    ]
  }
};

// Mecanismos de Defesa (Slides 33-34)
export const DEFENSE_MECHANISMS = [
  {
    nome: 'A Pele',
    icon: 'Shield',
    descricao: 'É o maior órgão do corpo! Funciona como uma muralha ou escudo protetor que impede a entrada da grande maioria das bactérias e micróbios causadores de doenças.'
  },
  {
    nome: 'As Lágrimas',
    icon: 'Droplets',
    descricao: 'Limpam e impedem que os olhos sequem, lavando poeiras e protegendo os olhos contra impurezas e infeções através de substâncias protetoras.'
  },
  {
    nome: 'A Cera dos Ouvidos',
    icon: 'Ear',
    descricao: 'É uma substância protetora que agarra a sujidade e dificulta muito a entrada de microrganismos prejudiciais no canal auditivo.'
  },
  {
    nome: 'O Suco Gástrico e Bactérias Intestinais',
    icon: 'Sparkles',
    descricao: 'O ácido fortíssimo do estômago destrói a maior parte dos micróbios que entram na comida, e as bactérias amigas do intestino não deixam micróbios maus crescerem.'
  },
  {
    nome: 'Os Pelos (nasais, pestanas e sobrancelhas)',
    icon: 'Eye',
    descricao: 'Impedem a entrada de poeiras, insetos e partículas estranhas nas vias respiratórias e nos olhos.'
  },
  {
    nome: 'A Saliva',
    icon: 'Smile',
    descricao: 'Humedece a boca e possui substâncias especiais que atacam e destroem bactérias logo na primeira entrada dos alimentos.'
  }
];

// Evolução Tecnológica na Saúde (Slides 35-36)
export const TECH_IN_HEALTH = [
  {
    nome: 'Raio X (Radiografia)',
    descricao: 'Exame de diagnóstico por imagem que permite ver através da pele e músculos, mostrando fraturas nos ossos e o estado dos pulmões.',
    icone: 'Scan'
  },
  {
    nome: 'Robôs-Cirurgiões',
    descricao: 'Robôs guiados por médicos especialistas que, através de uma visão ampliada em 3D, realizam cirurgias super precisas mesmo à distância.',
    icone: 'Cpu'
  },
  {
    nome: 'Impressão 3D na Medicina',
    descricao: 'Tecnologia que cria modelos tridimensionais, próteses para braços e pernas, e estruturas medicinais camada a camada à medida de cada doente.',
    icone: 'Layers'
  },
  {
    nome: 'Rádio e Comunicação',
    descricao: 'Permite a ligação imediata entre ambulâncias, paramédicos do INEM e hospitais para socorrer pessoas em emergência no menor tempo possível.',
    icone: 'Radio'
  }
];

// Banco de Questões para Quizzes do 4.º Ano
export interface QuizQuestion {
  id: number;
  sistema: 'digestivo' | 'respiratorio' | 'circulatorio' | 'urinario' | 'reprodutor' | 'nervoso' | 'geral';
  pergunta: string;
  opcoes: string[];
  respostaCorreta: number; // Índice 0-3
  explicacao: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Sistema Digestivo
  {
    id: 1,
    sistema: 'digestivo',
    pergunta: 'Como se chama a pasta macia que se forma na boca através da mastigação e mistura com a saliva?',
    opcoes: ['Quimo', 'Bolo alimentar', 'Nutriente', 'Fezes'],
    respostaCorreta: 1,
    explicacao: 'Na boca, os dentes cortam e a língua mistura os alimentos com a saliva, transformando-os no bolo alimentar!'
  },
  {
    id: 2,
    sistema: 'digestivo',
    pergunta: 'Qual destes órgãos pertence às glândulas anexas do sistema digestivo e produz bílis?',
    opcoes: ['Estômago', 'Esófago', 'Fígado', 'Intestino Grosso'],
    respostaCorreta: 2,
    explicacao: 'O fígado é uma glândula anexa que produz a bílis, libertada à entrada do intestino delgado.'
  },
  {
    id: 3,
    sistema: 'digestivo',
    pergunta: 'Em que órgão do sistema digestivo ocorre a absorção da maioria dos nutrientes para o sangue?',
    opcoes: ['Boca', 'Estômago', 'Intestino Delgado', 'Reto'],
    respostaCorreta: 2,
    explicacao: 'No intestino delgado, os nutrientes transformam-se em partículas muito simples e passam para a corrente sanguínea.'
  },
  {
    id: 4,
    sistema: 'digestivo',
    pergunta: 'No estômago, o bolo alimentar mistura-se com o suco gástrico e transforma-se no...?',
    opcoes: ['Quimo', 'Bolo digestivo', 'Oxigénio', 'Suco salivar'],
    respostaCorreta: 0,
    explicacao: 'No estômago, o bolo alimentar é misturado com o suco gástrico e torna-se numa massa mais líquida chamada quimo!'
  },

  // Sistema Respiratório
  {
    id: 5,
    sistema: 'respiratorio',
    pergunta: 'Durante a INSPIRAÇÃO, o que acontece ao ar e ao músculo do diafragma?',
    opcoes: [
      'O ar entra e o diafragma contrai e desce.',
      'O ar sai e o diafragma sobe.',
      'O ar fica parado e o diafragma não se mexe.',
      'O ar entra e o diafragma sobe para o pescoço.'
    ],
    respostaCorreta: 0,
    explicacao: 'Na inspiração, o ar entra nos pulmões e o diafragma contrai e desce, abrindo espaço no peito.'
  },
  {
    id: 6,
    sistema: 'respiratorio',
    pergunta: 'Porque devemos inspirar o ar pelo nariz e não pela boca?',
    opcoes: [
      'Porque a boca não tem dentes para o ar.',
      'Porque nas fossas nasais o ar é filtrado, humedecido e aquecido.',
      'Porque o nariz conduz o ar direto para o estômago.',
      'Porque não conseguimos respirar pela boca.'
    ],
    respostaCorreta: 1,
    explicacao: 'As fossas nasais têm pelinhos e vasos que limpam, aquecem e humedecem o ar que vai para os pulmões!'
  },
  {
    id: 7,
    sistema: 'respiratorio',
    pergunta: 'Onde ocorrem as trocas gasosas entre o oxigénio e o dióxido de carbono no sistema respiratório?',
    opcoes: ['Na laringe', 'Nos pulmões', 'Na boca', 'No esófago'],
    respostaCorreta: 1,
    explicacao: 'É nos pulmões que o oxigénio passa para o sangue e o sangue liberta o dióxido de carbono para ser expulso.'
  },

  // Sistema Circulatório
  {
    id: 8,
    sistema: 'circulatorio',
    pergunta: 'O coração funciona como uma bomba. Como se chamam os vasos que transportam o sangue A SAIR do coração?',
    opcoes: ['Veias', 'Artérias', 'Poros', 'Ureteres'],
    respostaCorreta: 1,
    explicacao: 'As artérias transportam o sangue do coração para o corpo; já as veias trazem o sangue de regresso ao coração.'
  },
  {
    id: 9,
    sistema: 'circulatorio',
    pergunta: 'Na Pequena Circulação, para onde viaja o sangue ao sair do coração pelas artérias pulmonares?',
    opcoes: ['Para os pés', 'Para os pulmões', 'Para o estômago', 'Para o cérebro'],
    respostaCorreta: 1,
    explicacao: 'Na pequena circulação, o sangue vai do coração aos pulmões para libertar dióxido de carbono e receber oxigénio!'
  },
  {
    id: 10,
    sistema: 'circulatorio',
    pergunta: 'Qual é o nome da maior artéria do corpo que distribui o sangue rico em oxigénio na Grande Circulação?',
    opcoes: ['Artéria Aorta', 'Veia Cava', 'Traqueia', 'Artéria Salivar'],
    respostaCorreta: 0,
    explicacao: 'O sangue sai do coração pela grandiosa artéria aorta e vai para todas as partes do corpo na grande circulação.'
  },

  // Sistema Urinário / Excretor
  {
    id: 11,
    sistema: 'urinario',
    pergunta: 'Quais são os órgãos responsáveis por filtrar o sangue e formar a urina?',
    opcoes: ['Os pulmões', 'Os rins', 'Os ovários', 'O fígado'],
    respostaCorreta: 1,
    explicacao: 'Os rins funcionam como filtros que retiram as impurezas do sangue, formando a urina.'
  },
  {
    id: 12,
    sistema: 'urinario',
    pergunta: 'Além do sistema urinário, que outro órgão tem função excretora através da transpiração?',
    opcoes: ['O cabelo', 'A pele', 'As unhas', 'A língua'],
    respostaCorreta: 1,
    explicacao: 'A pele é um órgão excretor: através das glândulas sudoríparas liberta suor pelos poros e regula a temperatura do corpo.'
  },
  {
    id: 13,
    sistema: 'urinario',
    pergunta: 'Onde é que a urina fica armazenada antes de ser expelida para o exterior pela uretra?',
    opcoes: ['No reto', 'Na bexiga', 'Nos brônquios', 'No pâncreas'],
    respostaCorreta: 1,
    explicacao: 'A bexiga é a bolsa elástica que armazena a urina que chega dos rins através dos ureteres.'
  },

  // Sistema Reprodutor e Adolescência
  {
    id: 14,
    sistema: 'reprodutor',
    pergunta: 'Como se chamam as células sexuais masculinas e onde são produzidas?',
    opcoes: [
      'Oócitos, produzidos nos ovários',
      'Espermatozoides, produzidos nos testículos',
      'Nutrientes, produzidos no sangue',
      'Neurónios, produzidos no cérebro'
    ],
    respostaCorreta: 1,
    explicacao: 'Os testículos produzem as células sexuais masculinas: os espermatozoides.'
  },
  {
    id: 15,
    sistema: 'reprodutor',
    pergunta: 'O que é a fecundação?',
    opcoes: [
      'A passagem do ar para os pulmões',
      'A mastigação dos alimentos',
      'A união de um espermatozoide com um oócito, dando origem a um novo ser',
      'A filtragem do sangue pelos rins'
    ],
    respostaCorreta: 2,
    explicacao: 'Quando ocorre a união de um espermatozoide com um oócito, dá-se a fecundação!'
  },
  {
    id: 16,
    sistema: 'reprodutor',
    pergunta: 'Qual destas transformações é típica dos rapazes durante a puberdade?',
    opcoes: [
      'Aparecimento de barba, ombros alargam e a voz engrossa',
      'Início da menstruação',
      'Desenvolvimento das glândulas mamárias',
      'Diminuição da estatura'
    ],
    respostaCorreta: 0,
    explicacao: 'Nos rapazes, a laringe cresce (voz mais grave), aparecem pelos faciais (barba) e os ombros desenvolvem-se.'
  },

  // Sistema Nervoso e Defesa
  {
    id: 17,
    sistema: 'nervoso',
    pergunta: 'Qual é o órgão central protegido pelo crânio que comanda a memória, pensamentos e movimentos?',
    opcoes: ['O coração', 'O cérebro', 'O estômago', 'O diafragma'],
    respostaCorreta: 1,
    explicacao: 'O cérebro é o órgão principal do sistema nervoso, processando toda a informação do nosso corpo!'
  },
  {
    id: 18,
    sistema: 'nervoso',
    pergunta: 'Qual destes mecanismos simples defende os olhos impedindo que sequem e limpando impurezas?',
    opcoes: ['A cera dos ouvidos', 'As lágrimas', 'O suco gástrico', 'A bílis'],
    respostaCorreta: 1,
    explicacao: 'As lágrimas limpam e impedem que os olhos sequem, protegendo contra poeiras e infeções.'
  }
];

// Dados dos Desafios e Jogos
export interface OrganSortingItem {
  id: string;
  name: string;
  order: number;
  descricao: string;
  etapaNome: string;
}

export const DIGESTIVE_VOYAGE_ITEMS: OrganSortingItem[] = [
  { id: 'boca', name: 'Boca', order: 1, etapaNome: 'Mastigação', descricao: 'Os dentes cortam e a saliva forma o bolo alimentar.' },
  { id: 'faringe', name: 'Faringe', order: 2, etapaNome: 'Passagem', descricao: 'Conduz o bolo alimentar engolido.' },
  { id: 'esofago', name: 'Esófago', order: 3, etapaNome: 'Descida', descricao: 'Empurra o bolo alimentar até ao estômago.' },
  { id: 'estomago', name: 'Estômago', order: 4, etapaNome: 'Digestão gástrica', descricao: 'Suco gástrico transforma o bolo em quimo.' },
  { id: 'intestino_delgado', name: 'Intestino Delgado', order: 5, etapaNome: 'Absorção', descricao: 'Absorve os nutrientes para a corrente sanguínea com ajuda da bílis e do pâncreas.' },
  { id: 'intestino_grosso', name: 'Intestino Grosso', order: 6, etapaNome: 'Recolha de restos', descricao: 'Recebe as sobras não digeridas e absorve água.' },
  { id: 'reto_anus', name: 'Reto e Ânus', order: 7, etapaNome: 'Eliminação', descricao: 'Armazena e expulsa as fezes do corpo.' }
];

export interface OrganMatchingItem {
  id: string;
  name: string;
  sistemaCorreto: 'digestivo' | 'respiratorio' | 'circulatorio' | 'urinario' | 'reprodutor' | 'nervoso';
  dica: string;
}

export const ORGAN_MATCHING_ITEMS: OrganMatchingItem[] = [
  { id: 'm1', name: 'Pulmões', sistemaCorreto: 'respiratorio', dica: 'Órgãos esponjosos onde o oxigénio passa para o sangue.' },
  { id: 'm2', name: 'Estômago', sistemaCorreto: 'digestivo', dica: 'Mistura o bolo alimentar com suco gástrico.' },
  { id: 'm3', name: 'Coração', sistemaCorreto: 'circulatorio', dica: 'Bomba muscular que bate dia e noite sem parar.' },
  { id: 'm4', name: 'Rins', sistemaCorreto: 'urinario', dica: 'Filtram o sangue e fabricam a urina.' },
  { id: 'm5', name: 'Cérebro', sistemaCorreto: 'nervoso', dica: 'O computador central dos pensamentos e reflexos.' },
  { id: 'm6', name: 'Traqueia', sistemaCorreto: 'respiratorio', dica: 'Tubo anelado que conduz o ar aos brônquios.' },
  { id: 'm7', name: 'Fígado', sistemaCorreto: 'digestivo', dica: 'Glândula anexa que produz a bílis.' },
  { id: 'm8', name: 'Artéria Aorta', sistemaCorreto: 'circulatorio', dica: 'A maior autoestrada de sangue rico em oxigénio.' },
  { id: 'm9', name: 'Bexiga', sistemaCorreto: 'urinario', dica: 'Saco muscular elástico que armazena a urina.' },
  { id: 'm10', name: 'Testículos', sistemaCorreto: 'reprodutor', dica: 'Produzem os espermatozoides nos rapazes.' },
  { id: 'm11', name: 'Ovários', sistemaCorreto: 'reprodutor', dica: 'Produzem os oócitos nas raparigas.' },
  { id: 'm12', name: 'Espinal Medula', sistemaCorreto: 'nervoso', dica: 'Autoestrada dentro da coluna vertebral que leva as mensagens.' }
];
