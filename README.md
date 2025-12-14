## 📁 Project Structure

```
Personal_Website_Formal/
├── src/
│   ├── pages/           # Astro pages (routes)
│   │   ├── index.astro  # Home page
│   │   ├── about.astro  # About page
│   │   ├── projects.astro # Projects page
│   │   └── resume.astro # Resume page
│   ├── layouts/         # Layout components
│   │   └── Layout.astro # Main layout with navigation
│   ├── components/      # Reusable components
│   ├── content/         # Markdown content files
│   │   ├── about.md     # About page content
│   │   ├── projects.md  # Projects content
│   │   └── resume.md    # Resume content
│   └── styles/          # Global styles
├── public/              # Static assets
│   └── images/          # Image files
├── package.json         # Dependencies and scripts
├── astro.config.mjs     # Astro configuration
└── tsconfig.json        # TypeScript configuration
```

## 🛠️ Technologies Used

- **Astro**: Static site generator
- **TypeScript**: Type-safe JavaScript
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **HTML5**: Semantic markup
- **Vite**: Fast build tool
- **Inter Font**: Modern typography

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Personal_Website_Formal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:4321`

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run astro` - Run Astro commands

## 📝 Content Management

### Easy Editing with Markdown

The website uses markdown files for easy content management:

- **`src/content/about.md`** - Edit About page content
- **`src/content/projects.md`** - Edit Projects page content  
- **`src/content/resume.md`** - Edit Resume page content

### Customization

1. **Personal Information**: Update contact details in the layout and content files
2. **Projects**: Add your own projects in `src/content/projects.md`
3. **Experience**: Update work experience in `src/content/resume.md`
4. **Skills**: Modify skills and technologies in the content files
5. **Styling**: Customize colors and styling in the CSS variables

## 🎨 Customization Guide

### Colors
Update the CSS custom properties in `src/layouts/Layout.astro`:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #1e40af;
  --accent-color: #3b82f6;
  --text-color: #1f2937;
  --light-text: #6b7280;
  --background: #ffffff;
  --light-background: #f9fafb;
  --border-color: #e5e7eb;
}
```

### Navigation
Update navigation links in `src/layouts/Layout.astro`:

```astro
<div class="nav-menu">
  <a href="/" class="nav-link">Home</a>
  <a href="/about" class="nav-link">About</a>
  <a href="/projects" class="nav-link">Projects</a>
  <a href="/resume" class="nav-link">Resume</a>
</div>
```

### Social Links
Update social media links in the footer:

```astro
<div class="social-links">
  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>
  <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">LinkedIn</a>
  <a href="mailto:your.email@example.com">Email</a>
</div>
```

## 📄 PDF Resume

To enable PDF download functionality:

1. Add your resume PDF file to the `public/` directory
2. Name it `resume.pdf`
3. The download button will automatically work

## 🌐 Deployment

### Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Vercel
1. Connect your repository to Vercel
2. Framework preset: Astro
3. Deploy!

### GitHub Pages
1. Add to `astro.config.mjs`:
   ```javascript
   export default defineConfig({
     site: 'https://yourusername.github.io',
     base: '/repository-name',
   });
   ```
2. Build and push to GitHub
3. Enable GitHub Pages in repository settings

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Development
