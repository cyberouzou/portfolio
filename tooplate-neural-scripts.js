      const canvas = document.getElementById('neural-bg');
        const ctx = canvas.getContext('2d');
        let nodes = [];
        let mouse = { x: 0, y: 0 };
        let trail = [];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Node {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 3 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#00ffff';
                ctx.fill();
            }
        }

        function init() {
            nodes = [];
            for (let i = 0; i < 100; i++) {
                nodes.push(new Node(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height
                ));
            }
        }

        function connectNodes() {
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distance / 150})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function drawTrail() {
            trail.forEach(point => {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 255, 255, ${point.opacity})`;
                ctx.shadowColor = 'rgba(0, 255, 255, 0.8)';
                ctx.shadowBlur = 20;
                ctx.fill();
                ctx.shadowBlur = 0; // reset shadowBlur after drawing
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            nodes.forEach(node => {
                node.update();
                node.draw();
            });

            connectNodes();
            drawTrail();

            // Update trail
            trail.forEach(point => point.opacity -= 0.008);
            trail = trail.filter(point => point.opacity > 0);

            requestAnimationFrame(animate);
        }

        
        init();
        animate();

        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });

       
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            trail.push({x: e.clientX, y: e.clientY, opacity: 1});
            if (trail.length > 80) trail.shift();
        });

        
        const mobileToggle = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('nav-menu');

        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

    
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            
            const sections = document.querySelectorAll('.fade-in');
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8) {
                    section.classList.add('visible');
                }
            });
        });

        
        const _contactForm = document.querySelector('.contact-form');
        if (_contactForm) {
            _contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Message sent! (This is a demo)');
            });
        }

        // Modal functionality for certifications
        const modal = document.getElementById('certification-modal');
        const modalImg = document.getElementById('modal-image');
        const modalClose = document.querySelector('.modal-close');

        // Add click event to certification images
        document.querySelectorAll('.certification-image').forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = 'block';
                modalImg.src = this.src;
                modalImg.alt = this.alt;
            });
        });

        // Close modal when clicking the close button
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        // Close modal when clicking outside the image
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });

                /* --- Translation and interaction enhancements --- */
                (function(){
                    const translations = {
                        nav_home: {fr: 'ACCUEIL', en: 'HOME'},
                        nav_about: {fr: 'À PROPOS', en: 'ABOUT'},
                        nav_projects: {fr: 'PROJETS', en: 'PROJECTS'},
                        nav_skills: {fr: 'COMPÉTENCES', en: 'SKILLS'},
                        nav_contact: {fr: 'CONTACT', en: 'CONTACT'},
                        nav_certifications: {fr: 'CERTIFICATIONS', en: 'CERTIFICATIONS'},
                        nav_veille: {fr: 'VEILLE', en: 'NEWS'},
                        hero_subtitle: {fr: 'Étudiant en Informatique', en: 'Computer Science Student'},
                        about_section_title: {fr: 'À PROPOS', en: 'ABOUT'},
                        about_title: {fr: 'Qui suis je ?', en: 'Who am I?'},
                        about_p1: {fr: 'Je m’appelle Aksil Alem, j’ai 19 ans et je suis passionné par l’informatique, en particulier par la cybersécurité et les réseaux. Après avoir obtenu un baccalauréat professionnel CIEL mention Bien, je poursuis actuellement mes études en BTS SIO . Ce parcours me permet de développer mes compétences techniques et de me préparer à relever de nouveaux défis dans le domaine de l’informatique. Curieux, motivé et rigoureux, je cherche à mettre en pratique mes connaissances au travers de projets concrets et enrichissants.', en: "My name is Aksil Alem, I'm 19 and passionate about computing, especially cybersecurity and networking. After obtaining a vocational baccalaureate CIEL with honors, I'm currently studying in BTS SIO. This path allows me to develop technical skills and prepare for new challenges in IT. Curious, motivated and rigorous, I look to apply my knowledge through concrete, rewarding projects."},
                        about_p2: {fr: 'Grâce aux différents stages professionnels que j’ai réalisés depuis la seconde, j’ai pu acquérir de l’expérience concrète dans plusieurs domaines de l’informatique tels que le réseau, le support technique et le développement.', en: 'Thanks to various internships since high school, I gained hands-on experience in areas like networking, technical support and development.'},
                        cv_link: {fr: 'Consulter mon CV', en: 'View my CV'},
                        stat_projects_label: {fr: 'Projets', en: 'Projects'},
                        stat_years_label: {fr: "Années d'expérience", en: 'Years experience'},
                        stat_domains_label: {fr: 'Domaines de compétences', en: 'Skill areas'},
                        projects_section_title: {fr: 'PROJETS', en: 'PROJECTS'},
                        project1_title: {fr: 'StrongPWD', en: 'StrongPWD'},
                        project1_desc: {fr: 'Moteur de génération de mots de passe.', en: 'Password generator engine.'},
                        project2_title: {fr: 'V4GEN', en: 'V4GEN'},
                        project2_desc: {fr: 'Outil de production d’IPv4 aléatoires.', en: 'IPv4 random generator tool.'},
                        project3_title: {fr: 'Ultimax Templates', en: 'Ultimax Templates'},
                        project3_desc: {fr: 'Outil de templates de sites HTML à projets professionnels.', en: 'HTML site templates tool for professional projects.'},
                        project4_title: {fr: 'Ultimax Cards', en: 'Ultimax Cards'},
                        project4_desc: {fr: 'Outil automatisé de génération de cartes bancaires factices conformes à la vérification Luhn.', en: 'Automated fake card generator (Luhn valid) for testing purposes.'},
                        project5_title: {fr: 'Ultimax Search', en: 'Ultimax Search'},
                        project5_desc: {fr: "Moteur de recherche avec Lookup d'adresses IP et mails breaches", en: 'Search engine with IP lookup and breach checks.'},
                        project6_title: {fr: 'Bloodframe', en: 'Bloodframe'},
                        project6_desc: {fr: "Jeu vidéo de type 2D à thématique d'horreur psychologique/shooter top-down", en: '2D psychological horror / top-down shooter game.'},
                        skills_section_title: {fr: 'COMPÉTENCES', en: 'SKILLS'},
                        skill_prog: {fr: 'Programmation (HTML, CSS, PHP, Python, Batch, C++, Node et JS React)', en: 'Programming (HTML, CSS, PHP, Python, Batch, C++, Node, React JS)'},
                        skill_virtual: {fr: 'Virtualisation (Oracle VirtualBox, VMWare)', en: 'Virtualization (Oracle VirtualBox, VMWare)'},
                        skill_os: {fr: "Systèmes d'exploitation (Windows et distribution Linux)", en: 'Operating systems (Windows and Linux distros)'},
                        skill_networks: {fr: 'Réseaux (Routage, Switching)', en: 'Networking (Routing, Switching)'},
                        skill_cyber: {fr: 'Cybersécurité (Interventions sur les cybermenaces)', en: 'Cybersecurity (handling cyber threats)'},
                        skill_install: {fr: 'Installation et configuration (équipements physiques et virtuels)', en: 'Installation and configuration (physical & virtual)'},
                        contact_section_title: {fr: 'CONTACT', en: 'CONTACT'},
                        certifications_section_title: {fr: 'CERTIFICATIONS', en: 'CERTIFICATIONS'},
                        cert_cnil: {fr: 'CNIL', en: 'CNIL'},
                        consult_certifications: {fr: 'Consulter mes certifications', en: 'View my certifications'},
                        veille_section_title: {fr: 'VEILLE', en: 'NEWS'},
                        consult_veille: {fr: 'Consulter ma veille', en: 'View my feed'},
                        footer_nav_title: {fr: 'Navigation', en: 'Navigation'},
                        footer_cert_title: {fr: 'Certifications', en: 'Certifications'},
                        footer_veille_title: {fr: 'Veille', en: 'News'},
                        footer_social_title: {fr: 'réseaux', en: 'socials'}
                    };

                    const langBtn = document.getElementById('lang-toggle');
                    let currentLang = localStorage.getItem('site-lang') || 'fr';

                    const ukSvg = `
                        <svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                            <clipPath id="s2"><rect width="60" height="30" rx="2"/></clipPath>
                            <g clip-path="url(#s2)">
                                <rect width="60" height="30" fill="#012169"/>
                                <path d="M0 0L60 30M60 0L0 30" stroke="#fff" stroke-width="6"/>
                                <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" stroke-width="4"/>
                                <path d="M30 0L30 30M0 15L60 15" stroke="#fff" stroke-width="10"/>
                                <path d="M30 0L30 30M0 15L60 15" stroke="#C8102E" stroke-width="6"/>
                            </g>
                        </svg>`;

                    const frSvg = `
                        <svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                            <rect width="60" height="30" rx="2" fill="#eee"/>
                            <rect x="0" width="20" height="30" fill="#0055A4"/>
                            <rect x="40" width="20" height="30" fill="#EF4135"/>
                        </svg>`;

                    function setLanguage(lang){
                        document.querySelectorAll('[data-i18n]').forEach(el => {
                            const key = el.dataset.i18n;
                            if (!key) return;
                            if (translations[key] && translations[key][lang]) {
                                el.textContent = translations[key][lang];
                            }
                        });
                        currentLang = lang;
                        localStorage.setItem('site-lang', lang);
                        if (langBtn) {
                            // Button shows the flag of the language it will switch to
                            langBtn.innerHTML = (lang === 'fr') ? ukSvg : frSvg;
                            langBtn.setAttribute('aria-label', (lang === 'fr') ? 'Switch to English' : 'Basculer en français');
                        }
                        document.documentElement.lang = (lang === 'en') ? 'en' : 'fr';
                    }

                    if (langBtn) {
                        langBtn.addEventListener('click', () => {
                            setLanguage(currentLang === 'fr' ? 'en' : 'fr');
                        });
                    }

                    // Initialize language
                    setLanguage(currentLang);

                    // Animated counters when visible
                    const counters = document.querySelectorAll('.stat-number[data-target]');
                    const counterObserver = new IntersectionObserver(entries => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                const el = entry.target;
                                const target = parseInt(el.dataset.target, 10) || 0;
                                let start = 0;
                                const duration = 1200;
                                const stepTime = Math.max(10, Math.floor(duration / target || 20));
                                const step = () => {
                                    start += 1;
                                    el.textContent = start;
                                    if (start < target) setTimeout(step, stepTime);
                                };
                                if (!el.dataset.animated) {
                                    el.dataset.animated = '1';
                                    step();
                                }
                            }
                        });
                    }, {threshold: 0.6});
                    counters.forEach(c => counterObserver.observe(c));

                    // Project card tilt effect
                    document.querySelectorAll('.project-card').forEach(card => {
                        card.addEventListener('mousemove', (e) => {
                            const rect = card.getBoundingClientRect();
                            const cx = rect.left + rect.width / 2;
                            const cy = rect.top + rect.height / 2;
                            const dx = e.clientX - cx;
                            const dy = e.clientY - cy;
                            const rx = (-dy / rect.height) * 8; // rotateX
                            const ry = (dx / rect.width) * 12; // rotateY
                            card.style.setProperty('--rx', rx + 'deg');
                            card.style.setProperty('--ry', ry + 'deg');
                            card.classList.add('tilt');
                        });
                        card.addEventListener('mouseleave', () => {
                            card.style.setProperty('--rx', '0deg');
                            card.style.setProperty('--ry', '0deg');
                            card.classList.remove('tilt');
                        });
                    });

                    // Small parallax on profile image relative to mouse
                    const profile = document.querySelector('.profile-img');
                    if (profile) {
                        window.addEventListener('mousemove', (e) => {
                            const w = window.innerWidth;
                            const h = window.innerHeight;
                            const rx = (e.clientX - w/2) / (w/2) * 6;
                            const ry = (e.clientY - h/2) / (h/2) * 6;
                            profile.style.transform = `translate(${rx}px, ${ry}px)`;
                        });
                        window.addEventListener('mouseout', () => { profile.style.transform = ''; });
                    }

                    // Keyboard shortcut: L toggles language
                    document.addEventListener('keydown', (e) => {
                        if (e.key.toLowerCase() === 'l') {
                            setLanguage(currentLang === 'fr' ? 'en' : 'fr');
                        }
                    });
                })();
