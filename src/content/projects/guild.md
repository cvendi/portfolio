---
name: "Warcraft Guild"
img: "./guild.png"
imgAlt: "Warcraft Guild"
description: "A guild website for an online gaming community. Built with Astro + Tailwind and fetches character data daily from the Raider.IO API through a GitHub Actions workflow. Work in progress."
demo: true
github: "https://github.com/cvendi/broken-banner"
demo_url: "https://guild-demo.venditto.dev"
pubDate: "2026-06-26"
updatedDate: "2026-06-26"
draft: false
---
<p>
    This project is a simple website for my World of Warcraft guild, <strong
        >Broken Banner</strong
    >. It features character data from the Raider.IO API and is
    built with <a href="https://astro.build/">Astro</a> and <a href="https://tailwindcss.com/">Tailwind CSS</a>. It's still a work in progress, but the basic structure and data fetching functionality are in place.
</p>
<h2>Fetching Data</h2>
<p>
    This site doesn't fetch data live when a visitor loads the page
    in their browser. Instead, it fetches data from the Raider.IO
    API through a script running in a GitHub Actions cron job. <code
        >scripts/fetch.mjs</code
    > in the <a href="https://github.com/cvendi/broken-banner/blob/main/scripts/fetch.mjs"
        >GitHub repository</a
    > is responsible for fetching and storing the data. The Raider.IO
    API is only called once per day, one call for each character in the guild,
    rather than on every page load.
</p><p>
    The Actions workflow includes a Discord webhook that sends a notification when the data is fetched and stored successfully (or if it fails).
</p>
<h2>Displaying Data</h2>
<p>
    The data is fetched and stored in a static JSON file, which is
    then served to visitors when they load the page. The data is
    sorted by highest score, and filtered down to six characters to
    be displayed within PlayerCard components that are rendered on
    the main page.
</p>
<p>
    The data is also displayed in the Roster component on the <code>/roster</code> page. 
    The table uses vanilla JavaScript
    click handlers to sort the data in ascending/descending order based
    on the user's selection.
</p>
<blockquote>This is useful for any site that needs to display data from an external source, while still remaining static. It allows data to be pulled
    into the site without making an API call on every page visit, making the site faster and respecting API rate limits and quotas. It also allows the site to be deployed anywhere, even with no backend.</blockquote>
<h2>Content Collections</h2>
<p>
    A News content collection stores markdown files and images for news posts containing info about the guild, 
    or external links to resources about the game. Each news post has attributes defined within a Zod schema,
    such as a title, date, and author. These attributes are then set in the frontmatter of each respective markdown file.
</p>
<blockquote>This allows site owners to easily add and manage content without needing to write code.</blockquote>
<h2>Security Context</h2>
<p>
    There's no database to inject into, no live API credentials shipped to the browser. Credentials for the API and webhook are stored as repo secrets on GitHub, and all of the data is fetched externally via GitHub Actions, not from a live server handling user requests.
</p>
<blockquote>For site owners, this reduces the attack surface of their website.</blockquote>
<br /><hr />
<h3>Key Features</h3>
<ul>
    <li>
        Data fetching from an API, automated through GitHub Actions
    </li>
    <li>Rendering fetched data in components</li>
    <li>Content collections for easily adding content to the site</li>
</ul>
