// Portfolio Interactive Scripts - Pruthviraj Sonawane
// Clean, performant, human-crafted interactions

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Dynamic Typing Effect for Subtitle
    // ----------------------------------------------------
    const typingElement = document.getElementById('typingText');
    const words = [
        'Java Developer',
        'Backend Logic Enthusiast',
        'Data Structures & Algorithms',
        'Problem Solver'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const eraseSpeed = 40;
    const delayBetweenWords = 1800;

    function typeEffect() {
        if (!typingElement) return;

        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? eraseSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentWord.length) {
            speed = delayBetweenWords;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 400;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();

    // ----------------------------------------------------
    // 2. Mobile Drawer Navigation
    // ----------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                menuIcon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.replace('fa-xmark', 'fa-bars');
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }

    // ----------------------------------------------------
    // 3. Contact Form Submission
    // ----------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            const mailtoUrl = `mailto:rrsonawane44@gmail.com?subject=${encodeURIComponent(
                `Portfolio Inquiry: ${subject}`
            )}&body=${encodeURIComponent(
                `Hi Pruthviraj,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent from Portfolio Website`
            )}`;

            showToast("Drafting email to rrsonawane44@gmail.com...");
            window.location.href = mailtoUrl;
            contactForm.reset();
        });
    }

    // ----------------------------------------------------
    // 4. Navbar Shadow on Scroll
    // ----------------------------------------------------
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('shadow-xl', 'shadow-black/50', 'bg-darkBg/95');
        } else {
            navbar.classList.remove('shadow-xl', 'shadow-black/50', 'bg-darkBg/95');
        }
    });
});

// ----------------------------------------------------
// Global Helper Functions (Toast & Modal)
// ----------------------------------------------------

function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    if (toast && toastMsg) {
        toastMsg.textContent = msg;
        toast.classList.remove('translate-y-28', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');

        setTimeout(() => {
            toast.classList.remove('translate-y-0', 'opacity-100');
            toast.classList.add('translate-y-28', 'opacity-0');
        }, 3200);
    }
}

function copyEmail() {
    const email = "rrsonawane44@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        showToast("Copied to clipboard: " + email);
    }).catch(() => {
        showToast("Email: " + email);
    });
}

// Project Details Data
const projectData = {
    student: {
        title: "Student Academic Management System",
        desc: "A modular Java desktop application built to handle student records, course allocations, attendance tracking, and semester GPA calculation with robust validation.",
        features: [
            "Encapsulated Student, Course, and Grade entity models",
            "CRUD operations (Create, Read, Update, Delete) for academic data",
            "Persistent file storage and structured database integration",
            "Input sanitation to prevent duplicate roll numbers"
        ],
        code: `// Student Entity Model
public class Student {
    private int rollNo;
    private String name;
    private String course;
    private double cgpa;

    public Student(int rollNo, String name, String course, double cgpa) {
        this.rollNo = rollNo;
        this.name = name;
        this.course = course;
        this.cgpa = cgpa;
    }

    public void displaySummary() {
        System.out.printf("Roll: %d | Name: %s | Course: %s | CGPA: %.2f%n",
            rollNo, name, course, cgpa);
    }
}`
    },
    banking: {
        title: "ATM & Banking Simulation Engine",
        desc: "A console-based banking engine designed to simulate secure ATM operations, transactions, balance verification, and detailed audit logging.",
        features: [
            "Robust exception handling (InsufficientFundsException, InvalidPinException)",
            "Account state management utilizing Java Collections",
            "Thread-safe synchronization for balance updates",
            "Full transaction history statement generation"
        ],
        code: `// Transaction Engine snippet
public class BankAccount {
    private String accountNumber;
    private double balance;

    public synchronized void withdraw(double amount) throws Exception {
        if (amount > balance) {
            throw new Exception("Withdrawal Error: Insufficient balance!");
        }
        balance -= amount;
        System.out.printf("Success: $%.2f withdrawn. Current balance: $%.2f%n", amount, balance);
    }
}`
    },
    portfolio: {
        title: "Personal Developer Portfolio Website",
        desc: "A fast, responsive personal portfolio built with semantic HTML5, modern Tailwind CSS utilities, and custom CSS wave animations.",
        features: [
            "Floating wave letter animation on developer name",
            "Interactive Java code preview window",
            "Responsive across all screen sizes (mobile, tablet, desktop)",
            "Direct email integration and ATS-friendly resume export"
        ],
        code: `/* Floating Wave Animation */
@keyframes waveFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
}
.wave-char {
    display: inline-block;
    animation: waveFloat 3.2s ease-in-out infinite;
    animation-delay: calc(var(--char-index) * 0.11s);
}`
    }
};

function openProjectModal(key) {
    const data = projectData[key];
    if (!data) return;

    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDesc').textContent = data.desc;

    const featList = document.getElementById('modalFeatures');
    featList.innerHTML = '';
    data.features.forEach(f => {
        const li = document.createElement('li');
        li.textContent = f;
        featList.appendChild(li);
    });

    document.getElementById('modalCode').textContent = data.code;

    const modal = document.getElementById('projectModal');
    modal.classList.remove('hidden');
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.add('hidden');
}

// Close modal when clicking backdrop
window.addEventListener('click', (e) => {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) {
        closeProjectModal();
    }
});
