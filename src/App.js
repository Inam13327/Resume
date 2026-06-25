import React, { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import profilePic from "./assets/inam-profile.png";

// Palestine flag component
const PalestineFlag = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [velocity, setVelocity] = useState({ x: 2, y: 2 });
  const [paused, setPaused] = useState(false);
  const flagRef = useRef(null);

  useEffect(() => {
    // Start with random position and velocity
    setPosition({
      x: Math.random() * (window.innerWidth - 200),
      y: Math.random() * (window.innerHeight - 134)
    });
    setVelocity({
      x: (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 2),
      y: (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 2)
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const moveFlag = () => {
      setPosition(prev => {
        const flagWidth = flagRef.current?.offsetWidth || 200;
        const flagHeight = flagRef.current?.offsetHeight || 134;

        let newX = prev.x + velocity.x;
        let newY = prev.y + velocity.y;
        let newVelX = velocity.x;
        let newVelY = velocity.y;

        if (newX <= 0 || newX >= window.innerWidth - flagWidth) {
          newVelX = -newVelX;
        }

        if (newY <= 0 || newY >= window.innerHeight - flagHeight) {
          newVelY = -newVelY;
        }

        if (newVelX !== velocity.x || newVelY !== velocity.y) {
          setVelocity({ x: newVelX, y: newVelY });
        }

        return {
          x: Math.max(0, Math.min(newX, window.innerWidth - flagWidth)),
          y: Math.max(0, Math.min(newY, window.innerHeight - flagHeight))
        };
      });
    };

    const animationId = setInterval(moveFlag, 30);
    return () => clearInterval(animationId);
  }, [velocity, paused]);

  return (
    <div 
      ref={flagRef}
      onClick={() => setPaused(p => !p)}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: '200px',
        height: '134px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
        pointerEvents: 'auto',
        cursor: 'pointer',
        borderRadius: '4px',
        overflow: 'hidden'
      }}
    >
      <div style={{ flex: 1, backgroundColor: '#000000' }} />
      <div style={{ flex: 1, backgroundColor: '#ffffff' }} />
      <div style={{ flex: 1, backgroundColor: '#009736' }} />
      <div 
        style={{ 
          position: 'absolute', 
          left: 0, 
          top: 0, 
          width: 0, 
          height: 0, 
          borderTop: '67px solid transparent',
          borderBottom: '67px solid transparent',
          borderLeft: '67px solid #CE1126',
        }} 
      />
      <div
        style={{
          position: 'absolute',
          width: '100%',
          textAlign: 'center',
          color: 'black',
          fontWeight: 'bold',
          textShadow: '0 0 3pxrgb(230, 11, 11), 0 0 5pxrgb(239, 12, 12), 0 0 7px #000000',
          fontSize: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 11
        }}
      >
        Free Palestine
      </div>
    </div>
  );
};


// Tech logo URLs (SVGs, reliable CDN)
const logos = [
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    alt: "React.js",
    title: "React.js",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    alt: "Python",
    title: "Python",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    alt: "Django",
    title: "Django",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    alt: "JavaScript",
    title: "JavaScript",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    alt: "Node.js",
    title: "Node.js",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    alt: "MySQL",
    title: "MySQL",
  },
];

const LOGO_SIZE = 100;
const LOGO_FALL_SPEED = [0.6, 1.5]; // min, max px/frame

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, #10172a 0%, #1e293b 40%, #2563eb 100%);
    min-height: 100vh;
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    margin: 0;
    padding: 0;
    color: #e0e6ed;
    overflow-x: hidden;
    transition: background 0.8s;
  }
`;

const FloatingLogo = styled.img`
  position: absolute;
  width: ${LOGO_SIZE}px;
  height: ${LOGO_SIZE}px;
  will-change: transform, opacity, filter;
  opacity: ${({ highlight }) => (highlight ? 0.55 : 0.15)};
  z-index: 1;
  pointer-events: none;
  user-select: none;
  filter: ${({ highlight }) =>
    highlight
      ? "drop-shadow(0 4px 48px #60a5faaa) saturate(2) brightness(1.2)"
      : "drop-shadow(0 4px 24px #60a5fa44)"};
  transition: opacity 0.3s, filter 0.3s;
  border-radius: 16px;
  background: transparent;
`;

const FloatingLogoContainer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
`;

const Card = styled(motion.div)`
  position: relative;
  background: rgba(18, 28, 47, 0.90);
  border-radius: 2rem;
  box-shadow: 0 8px 32px 0 #2563eb66, 0 4px 18px #151f32;
  padding: 2.5rem 2rem;
  margin: 2.5rem auto;
  max-width: 1100px;
  transition: box-shadow 0.3s, background 0.7s;
  will-change: transform;
  z-index: 2;
  &:hover {
    box-shadow: 0 24px 60px 0 #2563ebbb, 0 10px 32px #10172a;
    background: rgba(30, 41, 59, 0.97);
  }
`;

const ProfileImage = styled(motion.img)`
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #60a5fa;
  box-shadow: 0 8px 40px #2563eb55;
  margin-bottom: 1rem;
  background: #0f172a;
  z-index: 2;
`;

const SectionTitle = styled(motion.h2)`
  color: #60a5fa;
  margin-top: 2.5rem;
  margin-bottom: 1.1rem;
  letter-spacing: 0.02em;
  font-size: 2.2rem;
  font-weight: 700;
`;

const Section = styled(motion.section)`
  margin-bottom: 2.2rem;
  padding: 1.7rem 1.3rem;
  background: linear-gradient(120deg, rgba(24,34,54,0.84) 70%, rgba(37,99,235,0.10));
  border-radius: 1.2rem;
  box-shadow: 0 2px 14px rgba(37,99,235,0.13);
  backdrop-filter: blur(3px);
`;

const List = styled.ul`
  margin: 0.7em 0 0.7em 1.0em;
  padding: 0;
  list-style: disc inside;
  font-size: 1.5rem;
  line-height: 2;
  color: #e0e6ed;
`;

const cardVariants = {
  initial: { opacity: 0, scale: 0.95, y: 30 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7 } },
};

const sectionVariants = {
  initial: { opacity: 0, y: 40 },
  animate: custom => ({
    opacity: 1, y: 0, transition: { delay: custom * 0.15, duration: 0.7, type: "spring", stiffness: 60 }
  }),
};

// --- Floating Logos Logic (falling with highlight on mouse) ---
function useFallingLogos(logos) {
  // Each logo: {x, y, speed, src, highlight}
  const [logoStates, setLogoStates] = useState([]);
  const containerRef = useRef(null);
  const mouse = useRef({ x: -1000, y: -1000 }); // offscreen start

  // Initialize logos at random x, random y above screen, random speed
  useEffect(() => {
    function randomLogoState(src, alt, title) {
      return {
        x: Math.random() * (window.innerWidth - LOGO_SIZE),
        y: -Math.random() * 250 - LOGO_SIZE, // Start above the screen
        speed: LOGO_FALL_SPEED[0] + Math.random() * (LOGO_FALL_SPEED[1] - LOGO_FALL_SPEED[0]),
        src,
        alt,
        title,
        highlight: false,
      };
    }
    setLogoStates(
      logos.map(l => randomLogoState(l.src, l.alt, l.title))
    );
    // eslint-disable-next-line
  }, [logos.length]);

  // Animate logos falling
  useEffect(() => {
    let animationId;
    function animate() {
      setLogoStates(prev =>
        prev.map(logo => {
          let newY = logo.y + logo.speed;
          let newX = logo.x;
          // If falls out, respawn at top at new random x
          if (newY > window.innerHeight) {
            newY = -LOGO_SIZE;
            newX = Math.random() * (window.innerWidth - LOGO_SIZE);
          }
          // Highlight if mouse is over logo
          const dx = mouse.current.x - (newX + LOGO_SIZE / 2);
          const dy = mouse.current.y - (newY + LOGO_SIZE / 2);
          const dist = Math.sqrt(dx * dx + dy * dy);
          const highlight = dist < LOGO_SIZE * 0.55;
          return { ...logo, x: newX, y: newY, highlight };
        })
      );
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Track mouse
  useEffect(() => {
    function onMouseMove(e) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    }
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return [logoStates, containerRef];
}

export default function App() {
  const [logoStates, floatingLogoContainerRef] = useFallingLogos(logos);

  return (
    <>
      <GlobalStyle />
      <PalestineFlag />
      <FloatingLogoContainer ref={floatingLogoContainerRef}>
        {logoStates.map((logo, idx) => (
          <FloatingLogo
            key={logo.title + idx}
            src={logo.src}
            alt={logo.alt}
            style={{
              left: logo.x,
              top: logo.y,
            }}
            highlight={logo.highlight}
            draggable={false}
            tabIndex={-1}
          />
        ))}
      </FloatingLogoContainer>
      <Card
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover={{ rotateY: 3 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <ProfileImage
            src={profilePic}
            alt="Inam Ullah"
            initial={{ scale: 0.8, rotateZ: -8 }}
            animate={{ scale: 1, rotateZ: 0, transition: { type: "spring", stiffness: 120 } }}
            whileHover={{ scale: 1.06, rotateZ: 2, boxShadow: "0 8px 52px #60a5fa99" }}
          />
          <h1 style={{
            margin: 0,
            fontWeight: 800,
            fontSize: "3.5rem",
            letterSpacing: "0.01em",
            color: "#fff",
            textShadow: "0 2px 8px #2563eb66"
          }}>
            Inam Ullah
          </h1>
          <p style={{ marginTop: "0.45em", color: "#60a5fa", fontWeight: 500, fontSize: "1.6rem" }}>
            <a href="mailto:inam13327@gmail.com" style={{ color: "#60a5fa", textDecoration: "underline" }}>
              inam13327@gmail.com
            </a>{" "}
            | +92-3131561687 | Pakistan
          </p>
        </motion.div>

        <Section custom={0} variants={sectionVariants} initial="initial" animate="animate">
          <SectionTitle>Professional Summary</SectionTitle>
          <div style={{ fontSize: "1.5rem", lineHeight: "2" }}>
            Highly skilled and results-driven Full Stack Software Developer with 3+ years of experience in JavaScript, TypeScript, React.js, Django REST, Node.js, MySQL, and web & mobile app development. Specialized in scalable systems and independent projects across education, healthcare, and services, with expertise in MSSQL management and UI/UX best practices.
          </div>
        </Section>

        <Section custom={1} variants={sectionVariants} initial="initial" animate="animate">
          <SectionTitle>Top Achievements</SectionTitle>
          <List>
            <li>Built a school management system for students and staff across multiple institutions.</li>
            <li>Improved student test (ECAT & MDCAT) preparation through a test guide platform.</li>
            <li>Increased salon bookings by 70% with a custom online booking system.</li>
          </List>
        </Section>

        <Section custom={2} variants={sectionVariants} initial="initial" animate="animate">
          <SectionTitle>Core Competencies</SectionTitle>
          <List>
            <li>Full-stack app development (React.js, Django REST, Node.js, Java)</li>
            <li>UI/UX design with HTML5, CSS3, JavaScript, Bootstrap, Tailwind</li>
            <li>Cross-platform mobile apps (React Native)</li>
            <li>Relational databases (MySQL, SQLite)</li>
            <li>Development tools: Git, GitHub, Swagger, JWT</li>
            <li>Project leadership and team collaboration</li>
          </List>
        </Section>

        <Section custom={3} variants={sectionVariants} initial="initial" animate="animate">
          <SectionTitle>Work Experience</SectionTitle>
          <b style={{ color: "#fff", fontSize: "1.7rem" }}>Full Stack Developer (Remote) | 01/2022 – Present</b>
          <List>
            <li>Delivered end-to-end web solutions, managing full project lifecycles and client communication.</li>
            <li>Specialized in scalable web apps using React.js, Django REST, MySQL.</li>
            <li>Led 6+ full-stack projects, achieving 100% on-time delivery.</li>
            <li>Reduced manual admin processes by 60% through automation.</li>
            <li>Built secure, mobile-friendly booking platforms and dashboards, boosting engagement by 40%.</li>
          </List>
        </Section>

        <Section custom={4} variants={sectionVariants} initial="initial" animate="animate">
          <SectionTitle>Education</SectionTitle>
          <List>
            <li>
              <b style={{ color: "#fff", fontSize: "1.7rem" }}>Software Engineering</b> - COMSATS University, Abbottabad <span style={{ color: "#60a5fa" }}>(07/2021 - 07/2025)</span>
            </li>
            <li>
              <b style={{ color: "#fff", fontSize: "1.7rem" }}>Office Automation</b> - Asian Academy, Abbottabad <span style={{ color: "#60a5fa" }}>(02/2019 - 01/2020)</span>
            </li>
          </List>
        </Section>

        <Section custom={5} variants={sectionVariants} initial="initial" animate="animate">
          <SectionTitle>Internships</SectionTitle>
          <b style={{ color: "#fff", fontSize: "1.7rem" }}>Asian Academy (03/2020 - 12/2021)</b>
          <List>
            <li>Data Analysis and Reporting</li>
            <li>Customer Support</li>
            <li>Documentation and Record Keeping</li>
            <li>Assisted in Network Troubleshooting</li>
          </List>
          <div style={{ marginTop: "1.5rem" }}>
            <b style={{ color: "#fff", fontSize: "1.7rem" }}>URRAAN (11/2024 - 01/2025)</b>
            <List>
              <li>Frontend Web Development</li>
            </List>
          </div>
        </Section>

        <Section custom={6} variants={sectionVariants} initial="initial" animate="animate">
          <SectionTitle>Personal Projects</SectionTitle>
          <List>
            <li>School Management System (React.js + Django, Web Application)</li>
            <li>University Test Guide Platform (React.js + Django, Web Application)</li>
            <li>Beauty Salon Website (React.js + Django, Web Application)</li>
            <li>Credit Management System (TypeScript + TailWind.css)</li>
            <li>AssaiMart ecommerce website: <a href="https://assaimartofficial.vercel.app/home" style={{ color: "#60a5fa" }}>https://assaimartofficial.vercel.app/home</a></li>
          </List>
        </Section>

        <Section custom={7} variants={sectionVariants} initial="initial" animate="animate">
          <SectionTitle>Hobbies & Interests</SectionTitle>
          <List>
            <li>Designing modern UI and layouts for web-based applications</li>
            <li>Exploring emerging technologies and design trends</li>
            <li>Analyzing open-source projects to apply best practices</li>
          </List>
        </Section>

        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 1.5, duration: 0.8 } }}
          style={{
            textAlign: "center",
            margin: "2.3em 0 0 0",
            color: "#60a5fa",
            fontSize: "1.7rem",
            fontWeight: 500,
            letterSpacing: "0.01em"
          }}
        >
          <span>
            Contact: <a href="mailto:inam13327@gmail.com" style={{ color: "#fff" }}>inam13327@gmail.com</a> | +92-3131561687 | Pakistan
          </span>
        </motion.footer>
      </Card>
    </>
  );
}
