import React, { useState } from 'react';
import { Image } from "react-native";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  LayoutAnimation,
  Platform,
  UIManager,
  Linking
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  User, Mail, MapPin, Briefcase, GraduationCap,
  Code, ChevronDown, ChevronUp, Github, Linkedin,
  ExternalLink, Target, BookOpen, Brain, Star
} from 'lucide-react-native';

import { styles } from './styles';

// Habilita animações no Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- Componente Acordeão (Expandir/Esconder) ---
const AccordionSection = ({ title, icon: Icon, children, isOpen, onToggle }) => {
  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <View style={styles.accordionTitleContainer}>
          {/* O ícone muda de cor se estiver aberto */}
          <Icon size={20} color={isOpen ? "#2563EB" : "#6B7280"} />
          <Text style={[styles.accordionTitle, isOpen && { color: "#2563EB" }]}>
            {title}
          </Text>
        </View>
        {isOpen ? (
          <ChevronUp size={20} color="#2563EB" />
        ) : (
          <ChevronDown size={20} color="#9CA3AF" />
        )}
      </TouchableOpacity>

      {/* Conteúdo Condicional */}
      {isOpen && (
        <View style={styles.accordionBody}>
          <View style={{ height: 16 }} />
          {children}
        </View>
      )}
    </View>
  );
};

// Componente Auxiliar para Cards (Empregos/Cursos)
const InfoCard = ({ title, subtitle, date, description }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardSubtitle}>{subtitle}</Text>
    {date && <Text style={styles.cardDate}>{date}</Text>}
    {description && <Text style={styles.cardDescription}>{description}</Text>}
  </View>
);

// --- Componente Principal ---

export default function App() {
  // Estado para controlar qual seção está aberta.
  // null = nenhuma aberta. 'objetivo' = seção objetivo aberta, etc.
  const [openSection, setOpenSection] = useState('objetivo');

  // Função para alternar seções com animação
  const toggleSection = (sectionKey) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    // Se clicar na que já está aberta, fecha (null). Senão, abre a nova.
    setOpenSection(openSection === sectionKey ? null : sectionKey);
  };

  const handleLink = (url) => {
    // Linking.openURL(url);
    alert(`Abrindo: ${url}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* --- Cabeçalho Fixo --- */}
        <View style={styles.header}>
          <View style={styles.headerBg} />
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={require("../../assets/images/Carlos.png")}
                style={styles.avatar}
              />
            </View>
            <Text style={styles.name}>Carlos Machado</Text>
            <Text style={styles.role}>Desenvolvedor</Text>
            <View style={styles.locationContainer}>
              <MapPin size={14} color="#6B7280" />
              <Text style={styles.locationText}>Recife, Brasil</Text>
            </View>
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn} onPress={() => handleLink('https://github.com/DevCarlosMachado')}>
                <Github size={20} color="#374151" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn} onPress={() => handleLink('https://www.linkedin.com/in/carlosandremachado/')}>
                <Linkedin size={20} color="#0077B5" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* --- Lista de Acordeões --- */}
        <View style={styles.content}>

          {/* 1. Objetivo */}
          <AccordionSection
            title="Objetivo"
            icon={Target}
            isOpen={openSection === 'objetivo'}
            onToggle={() => toggleSection('objetivo')}
          >
            <Text style={styles.textBlock}>
              Estagiar na área de Desenvolvimento ou Computação em Nuvem.
            </Text>
          </AccordionSection>

          {/* 2. Sobre Mim */}
          <AccordionSection
            title="Sobre Mim"
            icon={User}
            isOpen={openSection === 'sobre'}
            onToggle={() => toggleSection('sobre')}
          >
            <Text style={styles.textBlock}>
              Sou estudante de Análise e Desenvolvimento de Sistemas, com interesse em tecnologia,
              inovação e desenvolvimento de soluções eficientes. Tenho perfil proativo, organizado e
              colaborativo, com facilidade para trabalhar em equipe e boa capacidade de adaptação a novos
              desafios.

              Participei de projetos acadêmicos voltados à criação de soluções tecnológicas aplicadas a
              contextos reais, o que contribuiu para o desenvolvimento das minhas habilidades analíticas e de
              resolução de problemas.

              Busco constantemente aperfeiçoar meus conhecimentos e aplicar boas práticas no
              desenvolvimento de projetos que unam tecnologia e resultados de valor para a organização.
            </Text>
          </AccordionSection>

          {/* 3. Formação Acadêmica */}
          <AccordionSection
            title="Formação Acadêmica"
            icon={GraduationCap}
            isOpen={openSection === 'formacao'}
            onToggle={() => toggleSection('formacao')}
          >
            <InfoCard
              title="Análise e Desenvolvimento de Sistemas"
              subtitle="Faculdade Senac"
              date="Ago 2024 - Dez 2026"
            />
          </AccordionSection>

          {/* 4. Experiência Acadêmica */}
          <AccordionSection
            title="Experiência Acadêmica"
            icon={BookOpen}
            isOpen={openSection === 'exp_acad'}
            onToggle={() => toggleSection('exp_acad')}
          >
            <InfoCard
              title="2° Período - BatePonto"
              subtitle="Residência Tecnológica"
              date="2025.1 - 6 meses"
              description={`No 2° período participei do desenvolvimento de um registro de ponto como atividade da
Residência Tecnológica. O registro de ponto contava com o mapa para localizar onde o
ponto estaria sendo batido, correção de ponto e filtro para analisar pontos batidos. Registro
de ponto simples e intuitivo com o objetivo de auxiliar empresas que passam com
dificuldade no registro de ponto.

Atuação: Gerente de Projeto e Desenvolvedor.
Tecnologias utilizadas: HTML; CSS: JavaScript; ReactJS; Figma.`}
            />

            <InfoCard
              title="1° Período - StayAlert"
              subtitle="Projeto Integrador"
              date="2024.2 - 6 meses"
              description={`Com o objetivo de desenvolver habilidade de inovação e desenvolvimento de projeto,
juntamente com minha equipe desenvolvemos a ideação de um aplicativo mobile que
contribuisse com a segurança pública. O aplicativo contava com um mapa de calor da cidade
do Recife que mostraria os pontos da cidade com mais assiduidade de roubos e furtos.
Nosso próposito era que a sociedade circulasse pela cidade com mais segurança, evitando
passar pelos pontos de risco.

Atuação: UX/UI.
Tecnologias utilizadas: Figma; Trello; Miro.`}
            />

            <InfoCard
              title="1° Período - Turistaê"
              subtitle="Residência Tecnológica"
              date="2024.2 - 6 meses"
              description={`Tive a oportunidade de participar no 1° período da Residência Tecnológica, que tinha como tema: Tecnologia que impulsiona a cultura. 
Desenvolvi juntamente com minha equipe um aplicativo que contribuiria para que turistas e
moradores da cidade ficassem por dentro de eventos culturais e pontos turísticos em Recife
ou outras cidades de Pernambuco que pudessem conhecer.

Atuação: UX/UI.
Tecnologias utilizadas: Figma; Trello; Miro.`}
            />
          </AccordionSection>

          {/* 5. Experiência Profissional */}
          <AccordionSection
            title="Experiência Profissional"
            icon={Briefcase}
            isOpen={openSection === 'exp_prof'}
            onToggle={() => toggleSection('exp_prof')}
          >
            <InfoCard
              title="AGÊNCIA CONDEPE/FIDEM (AGÊNCIA ESTADUAL DE PLANEJAMENTO E PESQUISAS DE PERNAMBUCO)"
              subtitle="Estagiário no setor de TI"
              date="Set 2025 - Presente"
              description="Apoio no suporte técnico a usuários; Instalação e configuração de
softwares e equipamentos de informática; Auxílio na manutenção preventiva e corretiva de
computadores, impressoras e periféricos; Monitoramento e acompanhamento da rede local e
conexões de internet; Apoio na execução de rotinas de backup e atualização de sistemas;
Controle e atualização de inventário de equipamentos de TI; Organização e registro de
chamados técnicos e documentações de procedimentos; Apoio na gestão de acessos e
permissões de usuários em sistemas corporativos."
            />
            <InfoCard
              title="IGREJA EVANGÉLICA ASSEMBLEIA DE DEUS EM PERNAMBUCO (IEADPE)"
              subtitle="Jovem Aprendiz no setor Administrativo"
              date=" Mar 2024 - Abr 2025"
              description="Realização de lançamento e acompanhamento de pedidos de
compra; Pesquisa e cotação para aquisição de produtos; Organização e arquivamento de
documentos e registros de pedidos; Lançamento e controle de notas de pagamento de
concessionária(CELPE/COMPESA)."
            />
          </AccordionSection>

          {/* 6. Hard Skills */}
          <AccordionSection
            title="Hard Skills"
            icon={Code}
            isOpen={openSection === 'hardskills'}
            onToggle={() => toggleSection('hardskills')}
          >
            <View style={styles.skillsWrap}>
              {['Versionamento de Código com Git', 'Java', 'Python - Básico', 'HTML/CSS', 'JavaScript', 'Figma', 'MySQL/SQL', 'Windows', 'Linux - Básico'].map(skill => (
                <View key={skill} style={styles.badge}>
                  <Text style={styles.badgeText}>{skill}</Text>
                </View>
              ))}
            </View>
          </AccordionSection>

          {/* 7. Cursos */}
          <AccordionSection
            title="Cursos"
            icon={Star}
            isOpen={openSection === 'cursos'}
            onToggle={() => toggleSection('cursos')}
          >
            <InfoCard
              title="Curso Didático e Completo de Java Prof. Dr. Nelio Alves"
              subtitle="Udemy - 54,5 horas"
              date="Em andamento"
              description='Competências desenvolvidas:
- Programação Orientada a Objetos (OO).
- Estudo aprofundado de UML (Unified Modeling Language) para modelagem de sistemas.
- Banco de dados relacional e não relacional com MySQL e MongoDB.
- Conexão entre Java e bancos de dados utilizando JDBC.
- Desenvolvimento de interfaces gráficas com JavaFX.
- Criação de aplicações web modernas com Spring Boot.
- Integração com JPA e Hibernate para mapeamento objeto relacional (ORM).
- Implementação de API RESTful e arquitetura em camadas.
- Projetos práticos e desafios reais aplicados ao mercado de trabalho.
- Ênfase em boas práticas de programação, organização de código e reuso.
- Aprofundamento em conceitos de OO, como herança, polimorfismo, encapsulamento e
abstração.'
            />
            <InfoCard
              title="AWS Re/Start"
              subtitle="Instituto Aliança - 360 horas"
              date="Em andamento"
              description='Competências desenvolvidas:
- Formação prática em Linux, redes, segurança, banco de dados e Python.
- Treinamento intensivo em serviços AWS, arquitetura em nuvem e boas práticas de implantação.
- Hands on labs e projetos práticos aplicados a cenários reais de negócios.
- Desenvolvimento de habilidades profissionais como trabalho em equipe, comunicação e   resolução de problemas.
- Foco na preparação para a certificação AWS Certified Cloud Practitioner.
- Apoio para inserção no mercado de TI, com ênfase em computação em nuvem e operações
em ambientes de alta disponibilidade.'
            />
          </AccordionSection>

          {/* 8. Soft Skills */}
          <AccordionSection
            title="Soft Skills"
            icon={Brain}
            isOpen={openSection === 'softskills'}
            onToggle={() => toggleSection('softskills')}
          >
            <View style={styles.skillsWrap}>
              {['Comunicação Efetiva', 'Trabalho em Equipe', 'Resolução de Problemas', 'Adaptabilidade', 'Proatividade', 'Gestão de Tempo', 'Inteligência Emocional'].map(skill => (
                <View key={skill} style={[styles.badge, styles.softBadge]}>
                  <Text style={[styles.badgeText, styles.softBadgeText]}>{skill}</Text>
                </View>
              ))}
            </View>
          </AccordionSection>

        </View>

        {/* Espaço extra no final para não cortar o conteúdo */}
        <View style={{ height: 40 }} />

      </ScrollView>
    </SafeAreaView>
  );
}