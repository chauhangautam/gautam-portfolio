import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

interface Job { when: string; title: string; module: string; points: string[]; }
interface Group { icon: string; title: string; tags: string[]; }
interface Edu { level: string; school: string; years: string; }

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  // '@' is kept in TypeScript because Angular templates reserve it.
  email = 'xvr.gautam' + '@' + 'gmail.com';
  phone = '+91 8393828084';
  linkedin = 'https://linkedin.com/in/gautam-chauhan-8b0b48217';

  roles = ['.NET Software Engineer', 'ASP.NET Core & Web API Developer', 'SQL Server Specialist'];
  typed = '';
  private timer: any;
  private r = 0; private c = 0; private deleting = false;

  marquee = ['C#', 'ASP.NET Core', 'Web API', 'SQL Server', 'Entity Framework', 'LINQ', 'ADO.NET', 'Bootstrap', 'MVC', 'Stored Procedures'];

  stats = [
    { value: '2', label: 'Years experience' },
    { value: '3', label: 'Govt. modules built' },
    { value: '8.5', label: 'MCA CGPA' },
    { value: 'REST', label: 'Secure Web APIs' }
  ];

  jobs: Job[] = [
    {
      when: 'Jun 2025 – Present',
      title: 'Software Engineer · Codensys Technologies',
      module: 'Module: Security Paper Management',
      points: [
        'Designed and developed a Security Paper Management module handling the request, approval, and delivery lifecycle of security paper used to print Ravannas (mineral transit permits).',
        'Built web forms for lessees, plus SQL queries, joins and stored procedures that track deliveries and keep stock and issuance accurate.',
        'Mapped the request → approval → delivery → receipt workflow into screens together with government stakeholders.',
        'Provide production support, bug fixes and performance improvements.'
      ]
    },
    {
      when: 'Nov 2024 – May 2025',
      title: 'Software Engineer · FirstForce Technologies',
      module: 'Module: Checkgate Vehicle/Ravanna Inspection',
      points: [
        'Developed the Checkgate module in ASP.NET and SQL Server and set up all checkgates on one platform.',
        'Created a secure login for every checkpost.',
        "Built reports on mine owners' buying, selling and mineral stock for clear visibility of mineral movement."
      ]
    }
  ];

  project = [
    { icon: '🚚', title: 'Inspection endpoints', text: 'Record vehicle entries, capture tare and gross weight, verify Ravanna details.' },
    { icon: '🔐', title: 'Secure access', text: 'Login and authentication so only authenticated users can call the API.' },
    { icon: '🧾', title: 'Receipts', text: 'Generates an inspection receipt for each vehicle once checking is done.' }
  ];
  projectTags = ['ASP.NET Web API', 'Entity Framework', 'LINQ', 'SQL Server'];

  skills: Group[] = [
    { icon: '⚙️', title: 'Back end', tags: ['ASP.NET Web Forms', 'ASP.NET Core MVC', 'Web API', 'C#', 'LINQ'] },
    { icon: '🗄️', title: 'Data', tags: ['SQL Server', 'Stored procedures', 'Joins', 'ADO.NET', 'EF Code First'] },
    { icon: '🎨', title: 'Front end', tags: ['HTML', 'CSS', 'Bootstrap'] },
    { icon: '🧰', title: 'Practices & tools', tags: ['MVC', '3-tier architecture', 'Authentication', 'Visual Studio', 'SSMS'] }
  ];

  education: Edu[] = [
    { level: 'MCA', school: 'Uttaranchal University, Dehradun', years: '2021–2023 · CGPA 8.5' },
    { level: 'BCA', school: 'CCS University, Meerut', years: '2018–2021 · 60%' },
    { level: 'XII', school: 'KVM Inter College, Saharanpur', years: '2017–2018 · 70%' },
    { level: 'X', school: 'KVM Inter College, Saharanpur', years: '2014–2015 · 80%' }
  ];

  ngOnInit(): void {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { this.typed = this.roles[0]; return; }
    this.tick();
  }
  private bar!: HTMLElement;
  private up!: HTMLElement;
  private io?: IntersectionObserver;
  private onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    this.bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
    this.up.classList.toggle('show', scrollY > 400);
    let cur = '';
    ['work', 'project', 'skills', 'education', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 140) cur = id;
    });
    document.querySelectorAll('.links a').forEach(a =>
      a.classList.toggle('on', a.getAttribute('href') === '#' + cur));
  };

  ngAfterViewInit(): void {
    // Scroll progress bar + back-to-top button
    this.bar = document.createElement('div'); this.bar.id = 'bar';
    const up = document.createElement('button');
    up.id = 'up'; up.type = 'button'; up.textContent = '↑';
    up.setAttribute('aria-label', 'Back to top');
    up.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
    this.up = up;
    document.body.append(this.bar, up);
    addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();

    // Reveal cards as they scroll into view
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) {
        const t = e.target as HTMLElement;
        t.classList.add('in');
        if (t.classList.contains('stat')) this.count(t.querySelector('b'));
        this.io!.unobserve(t);
        setTimeout(() => t.classList.remove('rv', 'in'), 800);
      }
    }), { threshold: 0.12 });
    document.querySelectorAll('.card,.stat,.cta').forEach(el => { el.classList.add('rv'); this.io!.observe(el); });
  }

  private count(b: HTMLElement | null): void {
    if (!b) return;
    const m = (b.textContent ?? '').match(/^([\d.]+)(.*)$/);
    if (!m) return;
    const to = parseFloat(m[1]), dec = (m[1].split('.')[1] ?? '').length, suf = m[2], t0 = performance.now();
    const step = (n: number) => {
      const p = Math.min((n - t0) / 1200, 1);
      b.textContent = (to * (1 - Math.pow(1 - p, 3))).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    step(t0);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
    removeEventListener('scroll', this.onScroll);
    this.io?.disconnect(); this.bar?.remove(); this.up?.remove();
  }

  private tick(): void {
    const word = this.roles[this.r];
    this.c += this.deleting ? -1 : 1;
    this.typed = word.slice(0, this.c);
    let delay = this.deleting ? 35 : 70;
    if (!this.deleting && this.c === word.length) { this.deleting = true; delay = 1400; }
    else if (this.deleting && this.c === 0) { this.deleting = false; this.r = (this.r + 1) % this.roles.length; delay = 300; }
    this.timer = setTimeout(() => this.tick(), delay);
  }

  toggleTheme(): void {
    const root = document.documentElement;
    const dark = root.dataset['theme'] === 'dark' ||
      (!root.dataset['theme'] && matchMedia('(prefers-color-scheme: dark)').matches);
    root.dataset['theme'] = dark ? 'light' : 'dark';
  }
}
