import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './App.css'

const WorkflowSystemsWebsite = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    // Hardcoded password - change this to your desired password
    const DOWNLOAD_PASSWORD = 'SecureApp2026';

    const navigation = [
        { id: 'home', label: 'Home' },
        { id: 'solutions', label: 'Solutions' },
        { id: 'case-study', label: 'Case Study' },
        { id: 'about', label: 'About' },
        { id: 'contact', label: 'Contact' }
    ];

    React.useEffect(() => {
        const handleScroll = () => {
            const sections = navigation.map(nav => document.getElementById(nav.id));
            const scrollPosition = window.scrollY + 200;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(navigation[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleDownloadClick = (e) => {
        e.preventDefault();
        setShowPasswordModal(true);
        setPassword('');
        setPasswordError('');
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === DOWNLOAD_PASSWORD) {
            // Password correct - trigger download
            setShowPasswordModal(false);
            setPassword('');
            setPasswordError('');

            // Create a temporary link and trigger download
            const link = document.createElement('a');
            link.href = '/app-debug.apk'; // Your APK filename
            link.download = 'KidneyWise.apk'; // Suggested download name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            setPasswordError('Incorrect password. Please try again.');
        }
    };

    const closeModal = () => {
        setShowPasswordModal(false);
        setPassword('');
        setPasswordError('');
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const staggerContainer = {
        visible: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    // Theme colors
    const theme = isDarkMode ? {
        bg: '#0a0e13',
        bgSecondary: 'rgba(255, 255, 255, 0.02)',
        text: '#e8eaed',
        textSecondary: 'rgba(255, 255, 255, 0.6)',
        textTertiary: 'rgba(255, 255, 255, 0.4)',
        border: 'rgba(255, 255, 255, 0.06)',
        navBg: 'rgba(10, 14, 19, 0.8)',
        accent: '#60a5fa',
        accentHover: '#3b82f6',
        buttonBg: '#3b82f6',
        buttonHover: '#2563eb',
        cardHover: 'rgba(255, 255, 255, 0.02)',
        gridBg: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
        gradientFrom: 'rgba(30, 58, 138, 0.1)',
    } : {
        bg: '#ffffff',
        bgSecondary: '#f8f9fa',
        text: '#1a1a1a',
        textSecondary: '#525252',
        textTertiary: '#737373',
        border: '#e5e7eb',
        navBg: 'rgba(255, 255, 255, 0.9)',
        accent: '#2563eb',
        accentHover: '#1d4ed8',
        buttonBg: '#2563eb',
        buttonHover: '#1d4ed8',
        cardHover: '#f1f5f9',
        gridBg: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
        gradientFrom: 'rgba(59, 130, 246, 0.05)',
    };

    return (
        <div style={{ backgroundColor: theme.bg, color: theme.text }} className="font-sans overflow-x-hidden min-h-screen transition-colors duration-300">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'IBM Plex Sans', -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .font-mono {
          font-family: 'IBM Plex Mono', monospace;
        }
        
        .hover-lift {
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
        }
      `}</style>

            {/* Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    backgroundColor: theme.navBg,
                    borderBottom: `1px solid ${theme.border}`
                }}
                className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex items-center justify-between h-20">
                        <div className="text-lg font-medium tracking-tight">
                            <span style={{ color: theme.accent }}>Workflow</span>
                            <span style={{ color: theme.text }}>Systems</span>
                        </div>

                        <div className="flex gap-1">
                            {navigation.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    style={{
                                        color: activeSection === item.id ? theme.text : theme.textSecondary,
                                        backgroundColor: activeSection === item.id ? (isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)') : 'transparent'
                                    }}
                                    className="px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:opacity-80"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Light/Dark Mode Toggle - Floating Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.3 }}
                onClick={() => setIsDarkMode(!isDarkMode)}
                style={{
                    backgroundColor: theme.buttonBg,
                    color: '#ffffff'
                }}
                className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover-lift"
                aria-label="Toggle theme"
            >
                {isDarkMode ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                )}
            </motion.button>

            {/* Hero Section */}
            <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{
                backgroundImage: theme.gridBg,
                backgroundSize: '50px 50px'
            }}>
                <motion.div
                    style={{ opacity }}
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to bottom, ${theme.gradientFrom}, transparent)`
                    }}
                />

                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-4xl"
                    >
                        <motion.div variants={fadeInUp} className="mb-6">
              <span style={{ color: theme.accent }} className="font-mono text-sm tracking-wider uppercase">
                Regulated Digital Systems
              </span>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className="text-5xl lg:text-7xl font-light mb-8 leading-[1.1] tracking-tight"
                        >
                            Secure digital workflow systems for
                            <span
                                key={isDarkMode ? 'dark' : 'light'}
                                className="block font-medium mt-2"
                                style={{
                                    background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accentHover} 100%)`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    color: 'transparent'
                                }}
                            >
                complex regulated environments
              </span>
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            style={{ color: theme.textSecondary }}
                            className="text-xl mb-12 max-w-2xl leading-relaxed"
                        >
                            We design and deploy workflow transformation systems for healthcare and regulated sectors.
                            Purpose-built for compliance, security, and operational sustainability.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex gap-4">
                            <button
                                onClick={() => scrollToSection('contact')}
                                style={{ backgroundColor: theme.buttonBg }}
                                className="px-8 py-4 text-white rounded-lg font-medium transition-all duration-300 hover-lift hover:opacity-90"
                            >
                                Discuss a Project
                            </button>
                            <button
                                onClick={() => scrollToSection('solutions')}
                                style={{
                                    border: `1px solid ${theme.textSecondary}`,
                                    color: theme.text,
                                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'transparent'
                                }}
                                className="px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:opacity-80"
                            >
                                View Solutions
                            </button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <div style={{ borderColor: theme.border }} className="w-6 h-10 border-2 rounded-full flex justify-center pt-2">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            style={{ backgroundColor: theme.textTertiary }}
                            className="w-1.5 h-1.5 rounded-full"
                        />
                    </div>
                </motion.div>
            </section>

            {/* What We Do Section */}
            <section className="py-32" style={{ borderTop: `1px solid ${theme.border}` }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div>
              <span style={{ color: theme.textTertiary }} className="font-mono text-sm uppercase tracking-wider">
                01 / EXPERTISE
              </span>
                            <h2 className="text-4xl lg:text-5xl font-light mt-4 mb-6 leading-tight">
                                What we deliver
                            </h2>
                            <p style={{ color: theme.textSecondary }} className="text-lg leading-relaxed">
                                We specialise in workflow transformation systems that handle sensitive data,
                                meet regulatory requirements, and integrate into existing operational environments.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                {
                                    title: 'Clinical pathway digitisation',
                                    desc: 'Transform paper-based clinical workflows into secure, compliant digital systems'
                                },
                                {
                                    title: 'Remote patient workflow platforms',
                                    desc: 'Enable distributed care delivery with secure data capture and clinical oversight'
                                },
                                {
                                    title: 'Secure data capture systems',
                                    desc: 'Build GDPR-compliant forms, assessments, and data collection workflows'
                                },
                                {
                                    title: 'Operational dashboards',
                                    desc: 'Real-time visibility into workflow performance and system utilisation'
                                },
                                {
                                    title: 'AI-assisted workflow optimisation',
                                    desc: 'Non-diagnostic insights for resource allocation and operational efficiency'
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    style={{
                                        border: `1px solid ${theme.border}`,
                                        backgroundColor: 'transparent'
                                    }}
                                    className="p-6 rounded-lg transition-all duration-300 hover-lift"
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.cardHover}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <h3 style={{ color: theme.text }} className="text-lg font-medium mb-2">{item.title}</h3>
                                    <p style={{ color: theme.textSecondary }} className="text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Who We Work With */}
            <section className="py-32" style={{
                backgroundColor: theme.bgSecondary,
                borderTop: `1px solid ${theme.border}`,
                borderBottom: `1px solid ${theme.border}`
            }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="max-w-3xl">
            <span style={{ color: theme.textTertiary }} className="font-mono text-sm uppercase tracking-wider">
              02 / SECTORS
            </span>
                        <h2 className="text-4xl lg:text-5xl font-light mt-4 mb-12 leading-tight">
                            Who we work with
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mt-16">
                        {[
                            {
                                sector: 'NHS Trusts',
                                focus: 'Clinical pathway transformation, remote monitoring systems, operational analytics'
                            },
                            {
                                sector: 'Private Healthcare',
                                focus: 'Patient workflow platforms, secure data management, compliance-ready architectures'
                            },
                            {
                                sector: 'Regulated Industries',
                                focus: 'Custom workflow systems requiring audit trails, data governance, and security controls'
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                viewport={{ once: true }}
                                style={{ border: `1px solid ${theme.border}` }}
                                className="p-8 rounded-lg"
                            >
                                <div style={{ color: theme.accent }} className="font-mono text-sm mb-4">
                                    {String(i + 1).padStart(2, '0')}
                                </div>
                                <h3 className="text-2xl font-medium mb-4">{item.sector}</h3>
                                <p style={{ color: theme.textSecondary }} className="leading-relaxed">{item.focus}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* APK Download Section */}
            <section className="py-32" style={{ borderTop: `1px solid ${theme.border}` }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                <span style={{ color: theme.accent }} className="font-mono text-sm tracking-wider uppercase">
                    Mobile Application
                </span>
                            <h2 className="text-4xl lg:text-5xl font-light mt-4 mb-6 leading-tight">
                                Download Our Healthcare App
                            </h2>
                            <p style={{ color: theme.textSecondary }} className="text-xl mb-12 leading-relaxed">
                                Access our secure workflow platform on Android devices.
                                Built for clinical teams requiring mobile data capture capabilities.
                            </p>

                            <button
                                onClick={handleDownloadClick}
                                style={{ backgroundColor: theme.buttonBg }}
                                className="inline-flex items-center gap-3 px-8 py-4 text-white rounded-lg font-medium transition-all duration-300 hover-lift hover:opacity-90"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download APK (Android)
                            </button>

                            <p style={{ color: theme.textTertiary }} className="text-sm mt-6">
                                Version 1.0.0 • Last updated: February 2026 • 15.2 MB
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* Solutions Page */}
            <section id="solutions" className="py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="max-w-3xl mb-20">
            <span style={{ color: theme.textTertiary }} className="font-mono text-sm uppercase tracking-wider">
              03 / SOLUTIONS
            </span>
                        <h2 className="text-4xl lg:text-5xl font-light mt-4 mb-6 leading-tight">
                            Our solution framework
                        </h2>
                        <p style={{ color: theme.textSecondary }} className="text-lg leading-relaxed">
                            Every deployment is tailored to the specific operational context. These are our core
                            capabilities, adapted to your workflow requirements.
                        </p>
                    </div>

                    <div className="space-y-16">
                        {[
                            {
                                title: 'Clinical Pathway Systems',
                                capabilities: [
                                    'Digital assessment forms with conditional logic',
                                    'Secure patient data management',
                                    'Clinical decision support interfaces',
                                    'Integration with existing EPR/PAS systems',
                                    'Audit trail and compliance logging'
                                ],
                                deploymentContext: 'Deployed in environments where clinical accuracy, data security, and regulatory compliance are non-negotiable'
                            },
                            {
                                title: 'Secure Workflow Platforms',
                                capabilities: [
                                    'Role-based access control',
                                    'End-to-end encryption',
                                    'GDPR-compliant data handling',
                                    'Multi-site deployment capability',
                                    'Offline-first architecture for remote locations'
                                ],
                                deploymentContext: 'Built for organisations handling sensitive data across distributed teams'
                            },
                            {
                                title: 'AI-Assisted Operational Insights',
                                capabilities: [
                                    'Workflow bottleneck identification',
                                    'Resource utilisation analysis',
                                    'Predictive capacity planning',
                                    'Automated reporting pipelines',
                                    'Pattern detection in operational data'
                                ],
                                deploymentContext: 'Non-diagnostic systems that surface actionable insights from workflow data'
                            },
                            {
                                title: 'Custom Regulated System Development',
                                capabilities: [
                                    'Requirements gathering in clinical environments',
                                    'Compliance-aware architecture design',
                                    'Iterative deployment with clinical validation',
                                    'Long-term maintenance and support',
                                    'Technical documentation and training'
                                ],
                                deploymentContext: 'For complex workflows that require purpose-built solutions'
                            }
                        ].map((solution, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                style={{ border: `1px solid ${theme.border}` }}
                                className="rounded-lg overflow-hidden"
                            >
                                <div className="p-8 lg:p-12">
                                    <div className="flex items-start justify-between mb-8">
                                        <div>
                                            <div style={{ color: theme.accent }} className="font-mono text-sm mb-3">
                                                SOLUTION {String(i + 1).padStart(2, '0')}
                                            </div>
                                            <h3 className="text-3xl font-medium">{solution.title}</h3>
                                        </div>
                                    </div>

                                    <div className="grid lg:grid-cols-2 gap-12">
                                        <div>
                                            <h4 style={{ color: theme.textTertiary }} className="text-sm font-medium uppercase tracking-wider mb-4">
                                                Core Capabilities
                                            </h4>
                                            <ul className="space-y-3">
                                                {solution.capabilities.map((capability, idx) => (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <div style={{ backgroundColor: theme.accent }} className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" />
                                                        <span style={{ color: theme.textSecondary }}>{capability}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 style={{ color: theme.textTertiary }} className="text-sm font-medium uppercase tracking-wider mb-4">
                                                Deployment Context
                                            </h4>
                                            <p style={{ color: theme.textSecondary }} className="leading-relaxed">
                                                {solution.deploymentContext}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case Study */}
            <section id="case-study" className="py-32" style={{
                backgroundColor: theme.bgSecondary,
                borderTop: `1px solid ${theme.border}`,
                borderBottom: `1px solid ${theme.border}`
            }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="max-w-3xl mb-20">
            <span style={{ color: theme.textTertiary }} className="font-mono text-sm uppercase tracking-wider">
              04 / CASE STUDY
            </span>
                        <h2 className="text-4xl lg:text-5xl font-light mt-4 mb-6 leading-tight">
                            NHS Trust Deployment
                        </h2>
                        <p style={{ color: theme.textSecondary }} className="text-lg leading-relaxed">
                            Remote patient monitoring workflow transformation for a district general hospital
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-4">
                            <div className="sticky top-32 space-y-8">
                                <div>
                                    <div style={{ color: theme.textTertiary }} className="font-mono text-sm mb-2">CHALLENGE</div>
                                    <p style={{ color: theme.textSecondary }} className="leading-relaxed">
                                        Paper-based remote monitoring system unable to scale. Clinical staff spending
                                        hours on manual data entry. No real-time visibility into patient status.
                                    </p>
                                </div>

                                <div>
                                    <div style={{ color: theme.textTertiary }} className="font-mono text-sm mb-2">SCOPE</div>
                                    <div className="flex flex-wrap gap-2">
                                        {['12 weeks', '150+ patients', '3 clinical teams'].map((tag) => (
                                            <span
                                                key={tag}
                                                style={{
                                                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                                                    border: `1px solid ${theme.border}`
                                                }}
                                                className="px-3 py-1 rounded-full text-sm"
                                            >
                        {tag}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-8 space-y-12">
                            {/* Old Workflow */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                style={{ border: `1px solid ${theme.border}` }}
                                className="rounded-lg p-8"
                            >
                                <h3 className="text-2xl font-medium mb-6 flex items-center gap-3">
                                    <span className="text-red-500">Previous Workflow</span>
                                </h3>

                                <div className="space-y-4">
                                    {[
                                        'Patients called ward phone line to report observations',
                                        'Clinical staff manually recorded data on paper forms',
                                        'Forms filed in patient folders, requiring physical retrieval',
                                        'Weekly review meetings relied on incomplete data',
                                        'No automated escalation for concerning readings',
                                        'Average 45 minutes per day spent on administrative tasks per clinician'
                                    ].map((step, i) => (
                                        <div key={i} className="flex items-start gap-4" style={{ color: theme.textSecondary }}>
                                            <div style={{ color: theme.textTertiary }} className="font-mono text-sm mt-1">
                                                {String(i + 1).padStart(2, '0')}
                                            </div>
                                            <p>{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* New Workflow */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                style={{
                                    border: `1px solid ${theme.border}`,
                                    backgroundColor: theme.bgSecondary
                                }}
                                className="rounded-lg p-8"
                            >
                                <h3 className="text-2xl font-medium mb-6 flex items-center gap-3">
                                    <span className="text-green-500">Deployed System</span>
                                </h3>

                                <div className="space-y-4">
                                    {[
                                        'Patients submit observations via secure mobile-optimised web interface',
                                        'Data validated and encrypted at point of entry',
                                        'Real-time dashboard updates for clinical team',
                                        'Automated alerts for readings outside safe parameters',
                                        'Integration with trust EPR system for seamless record keeping',
                                        'Audit trail for all data access and modifications'
                                    ].map((step, i) => (
                                        <div key={i} className="flex items-start gap-4" style={{ color: theme.textSecondary }}>
                                            <div style={{ color: theme.accent }} className="font-mono text-sm mt-1">
                                                {String(i + 1).padStart(2, '0')}
                                            </div>
                                            <p>{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Outcomes */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-2xl font-medium mb-8">Measured Outcomes</h3>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {[
                                        { metric: '73%', label: 'Reduction in administrative time' },
                                        { metric: '94%', label: 'Patient data submission rate' },
                                        { metric: '100%', label: 'Audit trail compliance' }
                                    ].map((outcome, i) => (
                                        <div key={i} style={{ border: `1px solid ${theme.border}` }} className="p-6 rounded-lg">
                                            <div style={{ color: theme.accent }} className="text-4xl font-light mb-2">
                                                {outcome.metric}
                                            </div>
                                            <div style={{ color: theme.textSecondary }} className="text-sm">{outcome.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Deployment Approach */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                viewport={{ once: true }}
                                style={{ borderLeft: `2px solid ${theme.accent}` }}
                                className="pl-8"
                            >
                                <h3 className="text-xl font-medium mb-4">Deployment Methodology</h3>
                                <p style={{ color: theme.textSecondary }} className="leading-relaxed mb-6">
                                    Phased deployment with clinical validation at each stage. Initial pilot with single
                                    team, followed by iterative refinement based on frontline user feedback. Full rollout
                                    completed with comprehensive training and technical documentation.
                                </p>
                                <p style={{ color: theme.textSecondary }} className="leading-relaxed">
                                    System designed for long-term sustainability with modular architecture allowing
                                    future enhancements without disrupting operational workflows.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="max-w-4xl">
            <span style={{ color: theme.textTertiary }} className="font-mono text-sm uppercase tracking-wider">
              05 / ABOUT
            </span>
                        <h2 className="text-4xl lg:text-5xl font-light mt-4 mb-12 leading-tight">
                            Technical leadership in regulated environments
                        </h2>

                        <div className="space-y-8 text-lg leading-relaxed" style={{ color: theme.textSecondary }}>
                            <p>
                                We bring technical expertise and domain knowledge from working directly in clinical
                                environments. Our approach is rooted in understanding the operational realities of
                                healthcare delivery, not abstract technology trends.
                            </p>

                            <p>
                                Every system we deploy is built with awareness of regulatory constraints, clinical
                                workflow patterns, and the human factors that determine whether technology succeeds
                                or fails in practice.
                            </p>

                            <p>
                                Our technical lead has deployed systems in NHS trusts and private healthcare settings,
                                working alongside clinicians to translate workflow requirements into secure, compliant
                                digital solutions. This is specialist work requiring both software engineering capability
                                and deep understanding of regulated operational environments.
                            </p>
                        </div>

                        <div className="mt-16 grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    label: 'Domain Focus',
                                    items: ['Healthcare systems', 'Clinical workflows', 'Regulated data environments']
                                },
                                {
                                    label: 'Technical Approach',
                                    items: ['Security-first architecture', 'Compliance-aware design', 'Long-term sustainability']
                                },
                                {
                                    label: 'Deployment Model',
                                    items: ['Phased rollout', 'Clinical validation', 'Operational integration']
                                }
                            ].map((area, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    style={{ border: `1px solid ${theme.border}` }}
                                    className="p-6 rounded-lg"
                                >
                                    <div style={{ color: theme.textTertiary }} className="font-mono text-sm mb-4 uppercase tracking-wider">
                                        {area.label}
                                    </div>
                                    <ul className="space-y-2">
                                        {area.items.map((item, idx) => (
                                            <li key={idx} style={{ color: theme.textSecondary }} className="flex items-start gap-2">
                                                <span style={{ color: theme.accent }} className="mt-1.5">—</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-32" style={{
                backgroundColor: theme.bgSecondary,
                borderTop: `1px solid ${theme.border}`
            }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto text-center">
            <span style={{ color: theme.textTertiary }} className="font-mono text-sm uppercase tracking-wider">
              06 / CONTACT
            </span>
                        <h2 className="text-4xl lg:text-5xl font-light mt-4 mb-8 leading-tight">
                            Discuss a workflow digitisation project
                        </h2>
                        <p style={{ color: theme.textSecondary }} className="text-xl mb-12 leading-relaxed">
                            If you're exploring digital transformation in a regulated environment, let's discuss
                            your operational requirements and deployment constraints.
                        </p>

                        <div
                            style={{
                                border: `1px solid ${theme.border}`,
                                backgroundColor: theme.bg
                            }}
                            className="rounded-lg p-12 max-w-2xl mx-auto"
                        >
                            <div className="space-y-6">
                                <div className="text-left">
                                    <label style={{ color: theme.textSecondary }} className="block text-sm font-medium mb-2">
                                        Organisation
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="NHS Trust, Private Provider, etc."
                                        style={{
                                            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                                            border: `1px solid ${theme.border}`,
                                            color: theme.text
                                        }}
                                        className="w-full px-4 py-3 rounded-lg focus:outline-none transition-colors"
                                        onFocus={(e) => e.target.style.borderColor = theme.accent}
                                        onBlur={(e) => e.target.style.borderColor = theme.border}
                                    />
                                </div>

                                <div className="text-left">
                                    <label style={{ color: theme.textSecondary }} className="block text-sm font-medium mb-2">
                                        Primary Contact
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Name and role"
                                        style={{
                                            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                                            border: `1px solid ${theme.border}`,
                                            color: theme.text
                                        }}
                                        className="w-full px-4 py-3 rounded-lg focus:outline-none transition-colors"
                                        onFocus={(e) => e.target.style.borderColor = theme.accent}
                                        onBlur={(e) => e.target.style.borderColor = theme.border}
                                    />
                                </div>

                                <div className="text-left">
                                    <label style={{ color: theme.textSecondary }} className="block text-sm font-medium mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="contact@organisation.nhs.uk"
                                        style={{
                                            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                                            border: `1px solid ${theme.border}`,
                                            color: theme.text
                                        }}
                                        className="w-full px-4 py-3 rounded-lg focus:outline-none transition-colors"
                                        onFocus={(e) => e.target.style.borderColor = theme.accent}
                                        onBlur={(e) => e.target.style.borderColor = theme.border}
                                    />
                                </div>

                                <div className="text-left">
                                    <label style={{ color: theme.textSecondary }} className="block text-sm font-medium mb-2">
                                        Workflow Challenge
                                    </label>
                                    <textarea
                                        rows={4}
                                        placeholder="Brief description of the workflow you're looking to digitise"
                                        style={{
                                            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                                            border: `1px solid ${theme.border}`,
                                            color: theme.text
                                        }}
                                        className="w-full px-4 py-3 rounded-lg focus:outline-none transition-colors resize-none"
                                        onFocus={(e) => e.target.style.borderColor = theme.accent}
                                        onBlur={(e) => e.target.style.borderColor = theme.border}
                                    />
                                </div>

                                <button
                                    style={{ backgroundColor: theme.buttonBg }}
                                    className="w-full px-8 py-4 text-white rounded-lg font-medium transition-all duration-300 hover-lift hover:opacity-90"
                                >
                                    Submit Enquiry
                                </button>

                                <p style={{ color: theme.textTertiary }} className="text-sm mt-6">
                                    We typically respond to project enquiries within 48 hours. Initial consultations
                                    focus on understanding your operational context and technical requirements.
                                </p>
                            </div>
                        </div>

                        <div className="mt-16 pt-16" style={{ borderTop: `1px solid ${theme.border}` }}>
                            <div className="grid md:grid-cols-3 gap-8 text-left">
                                <div>
                                    <div style={{ color: theme.textTertiary }} className="font-mono text-sm mb-2">LOCATION</div>
                                    <p style={{ color: theme.textSecondary }}>United Kingdom</p>
                                </div>
                                <div>
                                    <div style={{ color: theme.textTertiary }} className="font-mono text-sm mb-2">RESPONSE TIME</div>
                                    <p style={{ color: theme.textSecondary }}>48 hours for enquiries</p>
                                </div>
                                <div>
                                    <div style={{ color: theme.textTertiary }} className="font-mono text-sm mb-2">PROJECT SCOPE</div>
                                    <p style={{ color: theme.textSecondary }}>NHS and regulated sectors</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ borderTop: `1px solid ${theme.border}` }} className="py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div style={{ color: theme.textTertiary }} className="text-sm">
                            © 2026 Workflow Systems. Secure digital systems for regulated environments.
                        </div>
                        <div className="flex gap-8 text-sm" style={{ color: theme.textTertiary }}>
                            <a href="#" className="transition-colors hover:opacity-70">Privacy Policy</a>
                            <a href="#" className="transition-colors hover:opacity-70">Data Security</a>
                            <a href="#" className="transition-colors hover:opacity-70">Compliance</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Password Modal */}
            {showPasswordModal && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999,
                        backdropFilter: 'blur(4px)'
                    }}
                    onClick={closeModal}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: theme.bg,
                            border: `1px solid ${theme.border}`,
                            borderRadius: '0.75rem',
                            padding: '2rem',
                            maxWidth: '28rem',
                            width: '90%',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: 600,
                                marginBottom: '0.5rem',
                                color: theme.text
                            }}>
                                Download Protected
                            </h3>
                            <p style={{ color: theme.textSecondary, fontSize: '0.875rem' }}>
                                Enter the password to download the application
                            </p>
                        </div>

                        <form onSubmit={handlePasswordSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label
                                    style={{
                                        display: 'block',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        marginBottom: '0.5rem',
                                        color: theme.textSecondary
                                    }}
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setPasswordError('');
                                    }}
                                    placeholder="Enter password"
                                    autoFocus
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                                        border: `1px solid ${passwordError ? '#ef4444' : theme.border}`,
                                        borderRadius: '0.5rem',
                                        color: theme.text,
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.2s'
                                    }}
                                    onFocus={(e) => !passwordError && (e.target.style.borderColor = theme.accent)}
                                    onBlur={(e) => !passwordError && (e.target.style.borderColor = theme.border)}
                                />
                                {passwordError && (
                                    <p style={{
                                        color: '#ef4444',
                                        fontSize: '0.875rem',
                                        marginTop: '0.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem'
                                    }}>
                                        <svg style={{ width: '1rem', height: '1rem' }} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {passwordError}
                                    </p>
                                )}
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem 1.5rem',
                                        border: `1px solid ${theme.border}`,
                                        borderRadius: '0.5rem',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        color: theme.text,
                                        backgroundColor: 'transparent',
                                        cursor: 'pointer',
                                        transition: 'opacity 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem 1.5rem',
                                        backgroundColor: theme.buttonBg,
                                        color: '#ffffff',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        transition: 'opacity 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                                >
                                    Download
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default WorkflowSystemsWebsite;