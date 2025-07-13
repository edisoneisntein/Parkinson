
import React, { useState, useEffect, useRef } from 'react';
import PrevalenceChart from './components/PrevalenceChart';
import PipelineChart from './components/PipelineChart';

const NAV_LINKS = [
    { href: '#overview', label: 'Visión General' },
    { href: '#causes', label: 'Causas y Riesgos' },
    { href: '#symptoms', label: 'Síntomas y Fases' },
    { href: '#diagnosis', label: 'Diagnóstico' },
    { href: '#treatments', label: 'Tratamientos' },
    { href: '#future', label: 'Futuro' },
];

const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
    <div className={`bg-white rounded-xl shadow-md transition duration-300 ease-in-out hover:transform hover:-translate-y-1 hover:shadow-lg ${className}`}>
        {children}
    </div>
);

const App: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>('overview');
    const [activeSymptomTab, setActiveSymptomTab] = useState<'motor' | 'non-motor'>('motor');
    const [activeTreatmentTab, setActiveTreatmentTab] = useState<'pharma' | 'surgical' | 'support'>('pharma');
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    const sectionRefs = useRef<Array<HTMLElement | null>>([]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.4
        };

        const observerCallback: IntersectionObserverCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        const currentRefs = sectionRefs.current;
        currentRefs.forEach(section => {
            if (section) observer.observe(section);
        });

        return () => {
            currentRefs.forEach(section => {
                if (section) observer.unobserve(section);
            });
        };
    }, []);

    const toggleAccordion = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };
    
    const NavLink: React.FC<{ href: string; label: string; isMobile?: boolean }> = ({ href, label, isMobile = false }) => {
        const isActive = activeSection === href.substring(1);
        return (
            <a
                href={href}
                onClick={() => isMobile && setIsMobileMenuOpen(false)}
                className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${isActive ? 'text-[#3D405B] font-semibold' : 'text-gray-600 hover:text-[#3D405B]'} ${isMobile ? 'block text-base' : ''}`}
            >
                {label}
                {isActive && !isMobile && (
                    <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#81B29A]"></span>
                )}
            </a>
        );
    };

    return (
        <>
            {/* Header and Navigation */}
            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <span className="font-bold text-xl text-[#3D405B]">🧠 Párkinson Interactivo</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {NAV_LINKS.map(link => <NavLink key={link.href} href={link.href} label={link.label} />)}
                            </div>
                        </div>
                        <div className="md:hidden">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
                                <span className="sr-only">Abrir menú principal</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </nav>
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {NAV_LINKS.map(link => <NavLink key={link.href} href={link.href} label={link.label} isMobile />)}
                        </div>
                    </div>
                )}
            </header>

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

                {/* Section 1: Overview */}
                <section id="overview" className="pt-16 -mt-16" ref={el => { sectionRefs.current[0] = el; }}>
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold tracking-tight text-[#3D405B] sm:text-5xl md:text-6xl">Enfermedad de Parkinson</h1>
                        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                            Un viaje interactivo para entender el segundo trastorno neurodegenerativo más común del mundo.
                        </p>
                    </div>
                    
                    <Card className="p-8 mb-12">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Esta aplicación interactiva traduce el complejo informe científico sobre la enfermedad de Parkinson (EP) en una experiencia de aprendizaje accesible. La EP es un trastorno crónico y progresivo del sistema nervioso que afecta principalmente al movimiento, pero también tiene una amplia gama de síntomas no motores. Se caracteriza por la pérdida de células cerebrales productoras de dopamina. Aquí, exploraremos su impacto, historia, causas, síntomas, y las fronteras de la investigación, permitiéndole navegar por la información a su propio ritmo.
                        </p>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        <Card className="p-6 text-center"><h3 className="text-5xl font-bold text-[#81B29A]">>10M</h3><p className="mt-2 text-lg font-medium">Personas afectadas globalmente</p><p className="text-sm text-gray-500">La prevalencia se ha duplicado desde 1990.</p></Card>
                        <Card className="p-6 text-center"><h3 className="text-5xl font-bold text-[#81B29A]">~60</h3><p className="mt-2 text-lg font-medium">Edad promedio de inicio</p><p className="text-sm text-gray-500">El riesgo aumenta significativamente con la edad.</p></Card>
                        <Card className="p-6 text-center"><h3 className="text-5xl font-bold text-[#81B29A]">1.5x</h3><p className="mt-2 text-lg font-medium">Más común en hombres</p><p className="text-sm text-gray-500">Los hombres tienen mayor probabilidad de desarrollar EP que las mujeres.</p></Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <Card className="p-6">
                            <h2 className="text-2xl font-bold mb-4 text-center">Hitos Históricos Clave</h2>
                            <ul className="space-y-4">
                                <li className="flex items-start"><span className="text-xl text-[#81B29A] mr-3 mt-1">📜</span><div><h4 className="font-semibold">1817</h4><p className="text-gray-600">James Parkinson publica su "Ensayo sobre la Parálisis Agitante", la primera descripción clínica sistemática.</p></div></li>
                                <li className="flex items-start"><span className="text-xl text-[#81B29A] mr-3 mt-1">🔬</span><div><h4 className="font-semibold">1960</h4><p className="text-gray-600">Se descubre la deficiencia de dopamina como causa clave, abriendo la puerta a tratamientos racionales.</p></div></li>
                                <li className="flex items-start"><span className="text-xl text-[#81B29A] mr-3 mt-1">💊</span><div><h4 className="font-semibold">1960s</h4><p className="text-gray-600">La introducción de la Levodopa revoluciona el tratamiento sintomático, marcando una "edad de oro" en la terapia de la EP.</p></div></li>
                                <li className="flex items-start"><span className="text-xl text-[#81B29A] mr-3 mt-1">🧬</span><div><h4 className="font-semibold">1997-Hoy</h4><p className="text-gray-600">Se identifican los primeros genes (SNCA, LRRK2, GBA1), impulsando la investigación hacia terapias personalizadas.</p></div></li>
                            </ul>
                        </Card>
                        <Card className="p-6">
                            <h2 className="text-2xl font-bold mb-4 text-center">Prevalencia por Edad</h2>
                            <PrevalenceChart />
                            <p className="text-center text-sm text-gray-500 mt-4">La probabilidad de desarrollar Parkinson aumenta drásticamente con la edad.</p>
                        </Card>
                    </div>
                </section>
                
                <hr className="my-16 border-gray-200" />

                {/* Section 2: Causes and Risks */}
                <section id="causes" className="pt-16 -mt-16" ref={el => { sectionRefs.current[1] = el; }}>
                    <h2 className="text-3xl font-bold text-center mb-4">Causas y Factores de Riesgo</h2>
                    <p className="text-center max-w-3xl mx-auto text-lg text-gray-600 mb-12">La enfermedad de Parkinson tiene una etiología multifactorial, lo que significa que surge de una compleja interacción entre la predisposición genética y la exposición a factores ambientales a lo largo de la vida. No hay una única causa, sino una combinación de factores que contribuyen al riesgo de cada individuo.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="p-6"><div className="flex items-center mb-4"><span className="text-3xl mr-4">🧬</span><h3 className="text-2xl font-semibold">Factores Genéticos</h3></div><p className="text-gray-600">Entre el 10-20% de los casos tienen un componente genético conocido. Mutaciones en genes como <span className="font-mono bg-gray-100 p-1 rounded">SNCA</span>, <span className="font-mono bg-gray-100 p-1 rounded">LRRK2</span>, y <span className="font-mono bg-gray-100 p-1 rounded">GBA1</span> aumentan significativamente el riesgo. La EP de inicio temprano (&lt;50 años) tiene una mayor probabilidad de ser de origen genético.</p></Card>
                        <Card className="p-6"><div className="flex items-center mb-4"><span className="text-3xl mr-4">🌿</span><h3 className="text-2xl font-semibold">Factores Ambientales</h3></div><p className="text-gray-600">La exposición a largo plazo a ciertas sustancias químicas está fuertemente vinculada a un mayor riesgo. Esto incluye pesticidas y herbicidas (como paraquat y rotenona), solventes industriales y metales pesados. La geografía del riesgo sugiere focos en áreas industriales o agrícolas.</p></Card>
                        <Card className="p-6"><div className="flex items-center mb-4"><span className="text-3xl mr-4">🛡️</span><h3 className="text-2xl font-semibold">Estilo de Vida y Otros</h3></div><p className="text-gray-600">El <strong>envejecimiento</strong> es el factor de riesgo más importante. Traumatismos craneales repetidos también pueden aumentar el riesgo. Por otro lado, la actividad física regular y, curiosamente, el consumo de cafeína y el tabaquismo, se han asociado con un riesgo reducido (factores protectores).</p></Card>
                    </div>
                </section>

                <hr className="my-16 border-gray-200" />

                {/* Section 3: Symptoms */}
                <section id="symptoms" className="pt-16 -mt-16" ref={el => { sectionRefs.current[2] = el; }}>
                    <h2 className="text-3xl font-bold text-center mb-4">Síntomas y Fases de la Enfermedad</h2>
                    <p className="text-center max-w-3xl mx-auto text-lg text-gray-600 mb-12">Los síntomas del Parkinson son diversos y van mucho más allá del temblor. Se dividen en motores (relacionados con el movimiento) y no motores. Muchos síntomas no motores aparecen años antes del diagnóstico (fase prodrómica), ofreciendo una ventana para la detección temprana.</p>
                    <div className="mb-8 flex justify-center">
                        <div className="flex space-x-1 rounded-lg p-1 bg-gray-200">
                            <button onClick={() => setActiveSymptomTab('motor')} className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeSymptomTab === 'motor' ? 'bg-[#81B29A] text-white' : 'bg-gray-200 text-[#3D405B]'}`}>Síntomas Motores</button>
                            <button onClick={() => setActiveSymptomTab('non-motor')} className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeSymptomTab === 'non-motor' ? 'bg-[#81B29A] text-white' : 'bg-gray-200 text-[#3D405B]'}`}>Síntomas No Motores</button>
                        </div>
                    </div>
                    {activeSymptomTab === 'motor' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="p-6"><h4 className="font-bold text-xl mb-2">Temblor de Reposo</h4><p>Sacudida rítmica, usualmente en una mano o dedos ("rodamiento de píldoras"), que ocurre cuando la extremidad está relajada y disminuye con el movimiento intencional.</p></Card>
                            <Card className="p-6"><h4 className="font-bold text-xl mb-2">Bradicinesia</h4><p>Lentitud generalizada del movimiento. Dificulta iniciar acciones y realizar tareas cotidianas. Conduce a una expresión facial reducida ("cara de máscara") y menor parpadeo.</p></Card>
                            <Card className="p-6"><h4 className="font-bold text-xl mb-2">Rigidez</h4><p>Aumento del tono muscular que causa resistencia al movimiento pasivo de las extremidades. Puede provocar dolor y calambres.</p></Card>
                            <Card className="p-6"><h4 className="font-bold text-xl mb-2">Inestabilidad Postural</h4><p>Problemas de equilibrio y coordinación que aparecen en etapas más avanzadas, aumentando significativamente el riesgo de caídas.</p></Card>
                        </div>
                    )}
                    {activeSymptomTab === 'non-motor' && (
                        <div className="space-y-4">
                            {['Neuropsiquiátricos', 'Trastornos del Sueño', 'Disfunción Autonómica', 'Síntomas Sensoriales'].map((item, index) => (
                                <div key={item} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                    <button onClick={() => toggleAccordion(item)} className="w-full text-left p-4 font-semibold text-lg flex justify-between items-center">
                                        <span>{item}</span>
                                        <span className={`transform transition-transform duration-300 ${openAccordion === item ? 'rotate-180' : ''}`}>▼</span>
                                    </button>
                                    <div className={`transition-all duration-500 ease-in-out ${openAccordion === item ? 'max-h-96' : 'max-h-0'}`}>
                                        <div className="px-4 pb-4 text-gray-600">
                                            {index === 0 && <p>Incluyen depresión, ansiedad, apatía, y en fases avanzadas, deterioro cognitivo y demencia. Los trastornos del control de impulsos (ej. ludopatía) pueden ser un efecto secundario de la medicación.</p>}
                                            {index === 1 && <p>El Trastorno de Conducta del Sueño REM (actuar los sueños) es un fuerte predictor temprano. También son comunes el insomnio y la somnolencia diurna excesiva.</p>}
                                            {index === 2 && <p>Afecta funciones corporales automáticas. Incluye estreñimiento (muy común y temprano), problemas urinarios, caídas de presión arterial al ponerse de pie (hipotensión ortostática) y sudoración excesiva.</p>}
                                            {index === 3 && <p>La pérdida del sentido del olfato (hiposmia) es uno de los signos más tempranos y comunes. También pueden presentarse dolor, fatiga intensa y alteraciones visuales.</p>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
                
                <hr className="my-16 border-gray-200" />
                
                {/* Section 4: Diagnosis */}
                <section id="diagnosis" className="pt-16 -mt-16" ref={el => { sectionRefs.current[3] = el; }}>
                    <h2 className="text-3xl font-bold text-center mb-4">Diagnóstico y Seguimiento</h2>
                    <p className="text-center max-w-3xl mx-auto text-lg text-gray-600 mb-12">Actualmente no existe una prueba única para diagnosticar el Parkinson. El diagnóstico se basa en la historia clínica, un examen neurológico y la respuesta a la medicación. Sin embargo, la tecnología está revolucionando la detección y el seguimiento.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <Card className="p-6"><h3 className="text-xl font-bold mb-2">1. Examen Clínico</h3><p className="text-gray-600">El neurólogo busca la presencia de síntomas motores cardinales (bradicinesia + temblor o rigidez), su inicio asimétrico y una respuesta positiva a la levodopa.</p></Card>
                        <Card className="p-6"><h3 className="text-xl font-bold mb-2">2. Neuroimagen</h3><p className="text-gray-600">Pruebas como el DaTscan pueden confirmar una deficiencia de dopamina y ayudar a diferenciar la EP de otras condiciones como el temblor esencial. La RM se usa para descartar otras causas.</p></Card>
                        <Card className="p-6"><h3 className="text-xl font-bold mb-2">3. Biomarcadores Emergentes</h3><p className="text-gray-600">El futuro del diagnóstico. Incluye pruebas en sangre y líquido cefalorraquídeo para detectar α-sinucleína y el uso de wearables e IA para un monitoreo continuo y objetivo de los síntomas.</p></Card>
                    </div>
                </section>
                
                <hr className="my-16 border-gray-200" />
                
                {/* Section 5: Treatments */}
                <section id="treatments" className="pt-16 -mt-16" ref={el => { sectionRefs.current[4] = el; }}>
                    <h2 className="text-3xl font-bold text-center mb-4">Enfoques de Tratamiento</h2>
                    <p className="text-center max-w-3xl mx-auto text-lg text-gray-600 mb-12">Aunque no hay cura, los tratamientos actuales pueden controlar los síntomas eficazmente, mejorando la calidad de vida. El enfoque es multidisciplinario y se personaliza para cada paciente, combinando fármacos, posibles cirugías y terapias de apoyo.</p>
                    <div className="mb-8 flex justify-center">
                        <div className="flex space-x-1 rounded-lg p-1 bg-gray-200">
                            <button onClick={() => setActiveTreatmentTab('pharma')} className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeTreatmentTab === 'pharma' ? 'bg-[#81B29A] text-white' : 'bg-gray-200 text-[#3D405B]'}`}>Farmacológicos</button>
                            <button onClick={() => setActiveTreatmentTab('surgical')} className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeTreatmentTab === 'surgical' ? 'bg-[#81B29A] text-white' : 'bg-gray-200 text-[#3D405B]'}`}>Quirúrgicos</button>
                            <button onClick={() => setActiveTreatmentTab('support')} className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeTreatmentTab === 'support' ? 'bg-[#81B29A] text-white' : 'bg-gray-200 text-[#3D405B]'}`}>De Apoyo</button>
                        </div>
                    </div>
                    {activeTreatmentTab === 'pharma' && (
                        <div>
                            <p className="text-lg text-center mb-6">El objetivo es reponer o imitar la dopamina en el cerebro.</p>
                            <div className="overflow-x-auto"><table className="min-w-full bg-white rounded-lg shadow"><thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clase de Fármaco</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficio Clave</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Desafío Principal</th></tr></thead><tbody className="divide-y divide-gray-200"><tr><td className="px-6 py-4 whitespace-nowrap font-medium">Levodopa</td><td className="px-6 py-4 whitespace-nowrap">El más eficaz para síntomas motores. "Estándar de oro".</td><td className="px-6 py-4 whitespace-nowrap">Fluctuaciones motoras y discinesias a largo plazo.</td></tr><tr><td className="px-6 py-4 whitespace-nowrap font-medium">Agonistas Dopaminérgicos</td><td className="px-6 py-4 whitespace-nowrap">Menor riesgo inicial de discinesias.</td><td className="px-6 py-4 whitespace-nowrap">Riesgo de trastornos del control de impulsos.</td></tr><tr><td className="px-6 py-4 whitespace-nowrap font-medium">Inhibidores MAO-B y COMT</td><td className="px-6 py-4 whitespace-nowrap">Prolongan el efecto de la levodopa, reduciendo periodos "off".</td><td className="px-6 py-4 whitespace-nowrap">Pueden aumentar efectos secundarios de la levodopa.</td></tr></tbody></table></div>
                        </div>
                    )}
                    {activeTreatmentTab === 'surgical' && (
                        <div>
                            <p className="text-lg text-center mb-6">Reservados para pacientes cuyos síntomas motores no se controlan bien con medicación.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Card className="p-6"><h4 className="font-bold text-xl mb-2">Estimulación Cerebral Profunda (ECP/DBS)</h4><p>Es el más común. Se implantan electrodos en el cerebro que envían impulsos eléctricos para modular las señales cerebrales anormales. Es reversible y ajustable. Mejora temblor, rigidez y bradicinesia.</p></Card>
                                <Card className="p-6"><h4 className="font-bold text-xl mb-2">Ultrasonido Focalizado (HIFU)</h4><p>Procedimiento no invasivo que usa ondas de ultrasonido guiadas por RM para crear una lesión precisa en el cerebro y aliviar el temblor. No requiere incisiones ni implantes.</p></Card>
                            </div>
                        </div>
                    )}
                    {activeTreatmentTab === 'support' && (
                        <div>
                            <p className="text-lg text-center mb-6">Fundamentales para mantener la calidad de vida y la independencia funcional.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-green-50 p-4 rounded-lg text-center"><h4 className="font-semibold">Fisioterapia y Ejercicio</h4><p className="text-sm text-green-800">Mejora equilibrio, fuerza y flexibilidad. El ejercicio aeróbico puede tener un efecto neuroprotector.</p></div>
                                <div className="bg-green-50 p-4 rounded-lg text-center"><h4 className="font-semibold">Terapia Ocupacional</h4><p className="text-sm text-green-800">Adapta tareas y entornos para facilitar la vida diaria.</p></div>
                                <div className="bg-green-50 p-4 rounded-lg text-center"><h4 className="font-semibold">Terapia del Habla</h4><p className="text-sm text-green-800">Aborda problemas de voz baja y dificultades para tragar.</p></div>
                                <div className="bg-green-50 p-4 rounded-lg text-center"><h4 className="font-semibold">Nutrición</h4><p className="text-sm text-green-800">Una dieta equilibrada y alta en fibra ayuda con el estreñimiento y el bienestar general.</p></div>
                                <div className="bg-green-50 p-4 rounded-lg text-center"><h4 className="font-semibold">Apoyo Psicológico</h4><p className="text-sm text-green-800">Esencial para manejar la depresión, ansiedad y cambios emocionales.</p></div>
                                <div className="bg-green-50 p-4 rounded-lg text-center"><h4 className="font-semibold">Terapias Complementarias</h4><p className="text-sm text-green-800">Yoga, Tai Chi o masajes pueden ayudar con el equilibrio y la rigidez.</p></div>
                            </div>
                        </div>
                    )}
                </section>

                <hr className="my-16 border-gray-200" />
                
                {/* Section 6: Future */}
                <section id="future" className="pt-16 -mt-16" ref={el => { sectionRefs.current[5] = el; }}>
                    <h2 className="text-3xl font-bold text-center mb-4">Futuro e Investigación</h2>
                    <p className="text-center max-w-3xl mx-auto text-lg text-gray-600 mb-12">La investigación está en un punto de inflexión, moviéndose del tratamiento de síntomas hacia terapias que modifican la enfermedad, con el objetivo de ralentizar, detener o incluso revertir la progresión de la neurodegeneración.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <Card className="p-6">
                            <h3 className="text-xl font-bold mb-4">Terapias Modificadoras de la Enfermedad en Investigación</h3>
                            <ul className="space-y-3 list-disc list-inside text-gray-600">
                                <li><b>Inmunoterapias:</b> Anticuerpos y vacunas que apuntan a la proteína tóxica alfa-sinucleína para limpiar el cerebro y detener su propagación.</li>
                                <li><b>Terapias Génicas:</b> Introducción de genes sanos (como GBA1) para corregir defectos genéticos subyacentes.</li>
                                <li><b>Terapias Celulares:</b> Trasplante de células madre para reemplazar las neuronas de dopamina perdidas.</li>
                                <li><b>Reposicionamiento de Fármacos:</b> Prueba de medicamentos existentes (para diabetes, hipertensión) por sus posibles efectos neuroprotectores en la EP.</li>
                            </ul>
                        </Card>
                        <Card className="p-6">
                            <h3 className="text-xl font-bold mb-4 text-center">Pipeline de Ensayos Clínicos</h3>
                            <PipelineChart />
                            <p className="text-sm text-gray-500 text-center mt-2">Distribución de los ensayos clínicos activos para nuevas terapias.</p>
                        </Card>
                    </div>
                </section>
            </main>
            
            <footer className="bg-white mt-16">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
                    <p>© 2025 Parkinson Interactivo. Creado para fines informativos y educativos.</p>
                    <p className="text-xs mt-1">Este contenido se basa en un análisis científico compilado y no sustituye el consejo médico profesional.</p>
                </div>
            </footer>
        </>
    );
};

export default App;
