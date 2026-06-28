---
name: "Dev Portfolio"
img: "./portfolio.png"
imgAlt: "Dev Portfolio"
description: "My personal portfolio (this website). Built with Astro + Tailwind."
demo: false
demo_url: ""
github: "https://github.com/cvendi/portfolio"
pubDate: "2026-06-25"
updatedDate: "2026-06-25"
draft: false
---
<p>
    This is my personal portfolio project, the website you're currently on now.
    It's another static site built with <a href="https://astro.build/">Astro</a> and <a href="https://tailwindcss.com/">Tailwind CSS</a>.
</p>
<h2>Content Collections</h2>
<p>
    A <code>projects</code> content collection stores markdown files and images for each of my projects.
    Each project is represented by a markdown file with a frontmatter schema. Project attributes are defined in a Zod schema found in <code>src/content.config.ts</code>.
</p>
<h2>Displaying Data</h2>
<p>
    Each project in the content collection is displayed in scrolling cards in an accordion component on the main page.
    Each project has a details button that leads to a dedicated project page with a writeup about the project (like this page).
    If the project has a live demo, it shows a "Live Demo" button that links to the demo.
</p>
<h2>Contact Form</h2>
<p>
    The contact form on the main page uses <a href="https://resend.com/">Resend</a>. When you put in your email address, I get an email that I can reply to.
</p>
<h2>Turnstile</h2>
<p>
    The site uses <a href="https://developers.cloudflare.com/turnstile/">Cloudflare Turnstile</a> to protect against abuse of the contact form.
</p>
<br /><hr />
<h3>Key Features</h3>
<ul>
    <li>Rendering collections of data in components</li>
    <li>Transactional email with Resend</li>
    <li>Cloudflare Turnstile form protection</li>
</ul>
